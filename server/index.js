import 'babel-polyfill';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import User from './models/user';
import Word from './models/word';

mongoose.Promise = global.Promise;

dotenv.config();
var BearerStrategy = require('passport-http-bearer').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOneAndUpdate({googleId: profile.id}, 
        {$set: {
            name: profile.displayName,
            accessToken: accessToken,
            score: 0,
            googleId: profile.id,
            questions: getArrayOfQuestions(profile.id)
        }
    },
    {upsert: true, 'new': true})
    .then((user) => {
        done(null, user);
    }).catch(() => {
        console.log("catch error");
    });

    function getArrayOfQuestions(id) {
        let questions = [];
        User.findOne({googleId: id}, (err, user) => {
            if(err) {
                console.log("err: ", err);
                return questions;
            } else if (!user) {
                return questions = createArrayOfQuestions();
            } else {
                return questions = user.questions;
            }
        });
        return questions;
    }

    function createArrayOfQuestions() {
        let questions = [];
        Word.find()
        .then(words => {
            return words.map((word) => {
                return {word_id: word._id, freq: 1}
            })
        })
    }
}));


passport.use(new BearerStrategy(
  function(accessToken, done) {
    console.log("bearer");
    console.log("token", accessToken);
    User.findOne({ accessToken: accessToken }, function (err, user) {
        console.log(user);
      if (err) { 
        console.log("error");
        return done(err); 
        }
      else if (!user) { 
        console.log("user not found");
        return done(null, false); 
        } else {
            console.log("got it");
        return done(null, user, { scope: 'read' });
        }
    });
  }
));

const algorithm = (questions, answer) => {

    if (answer === "true") {
        questions[0].freq *= 2;
    } else {
        questions[0].freq = 1;
    }

    let ind = questions[0].freq
    let start = questions.slice(1, ind + 1);
    let end = questions.slice(ind + 1);
    let newQuestions = [...start, questions[0], ...end];

    return newQuestions;
}


const DATABASE_URL = process.env.DATABASE_URL;

const HOST = process.env.HOST;
const PORT = process.env.PORT || 3000;

console.log(`Server running in ${process.env.NODE_ENV} mode`);

const app = express();

app.use(express.static(process.env.CLIENT_PATH));

app.use(bodyParser.json());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  function(req, res) {
    res.cookie('accessToken', req.user.accessToken, {expires: 0});
    res.redirect('/#/game');
  });

app.get('/dev', function(req, res) {
    Word.find(function(err, data) {
        return data;
    })
    .then((words) => {
        User.find(function(err, data) {
            res.json({words: words, users: data});
        });
    });
});

app.get('/game', passport.authenticate('bearer', { session: false }),
    function(req, res) {
        console.log("bearer ran");
    let user = {};
    User.find(function(err, userData) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        return userData;
    })
    .then(userData => {
        user.score = userData[0].score;
        let id = userData[0].questions[0].word_id;
        Word.find({_id: id}, function(err, word) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            user.question = word[0];
            res.status(200).json(user)         
        })
    })
});

app.put('/game', passport.authenticate('bearer', { session: false }), 
    function(req, res) {
    User.find(function(err, userData) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        return userData;
    })
    .then(function(userData) {
        let current = userData[0];
        let score = current.score;
        if (req.body.answer === "true") {
            score += 1;
        }
        let questions = algorithm(current.questions, req.body.answer);
        User.findOneAndUpdate({_id: current._id}, {$set:{score:score, questions:questions}},function(err, user){
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            Word.find({_id: questions[0].word_id}, function(err, word) {
                res.status(200).json({score: score, question: word[0]});
            })
        });
    });
})

app.use('*', function(req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});


const runServer = (callback) => {
    mongoose.connect(DATABASE_URL, (err) => {
        if (err && callback) {
            return callback(err);
        }

        app.listen(PORT, () => {
            console.log('Listening on localhost:' + PORT);
            if (callback) {
                callback();
            }
        });
    });
};


if (require.main === module) {
    runServer((err) => {
        if (err) {
            console.error(err);
        }
    });
};
