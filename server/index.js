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


//GOOGLE STRATEGY
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://instafrench.herokuapp.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    getArrayOfQuestions(profile.id)
    .then(questions => {
        return User.findOneAndUpdate({googleId: profile.id}, 
            {$set: {
                name: profile.displayName,
                accessToken: accessToken,
                score: 0,
                googleId: profile.id,
                questions: questions
            }
        },
        {upsert: true, 'new': true})
    })
    .then((user) => {
        done(null, user);
    })
    .catch((err) => {
        done(err);
    });
}));

    function getArrayOfQuestions(id) {
        return User.findOne({googleId: id})
        .then((user) => {
            if (!user) {
                return createArrayOfQuestions();
            } else {
                return user.questions;
            }
        })
    }

    function createArrayOfQuestions() {
        return Word.find()
        .then(words => {
            return words.map((word) => {
                return {word_id: word._id, freq: 1}
            });
        });
    }


passport.use(
    new BearerStrategy(
        function(accessToken, done) {
            User.findOne({ accessToken: accessToken }, 
                function (err, user) {
                  if (err) { 
                    console.log("error");
                    return done(err); 
                    }
                  else if (!user) { 
                    console.log("user not found");
                    return done(null, false); 
                    } else {
                    return done(null, user, { scope: 'read' });
                    }
    });
  }
));

const algorithm = (questions, answer) => {

    if (answer === true) {
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

//GOOGLE USER LOGIN, SET TOKEN
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  function(req, res) {
    res.cookie('accessToken', req.user.accessToken, {expires: 0});
    res.redirect('/#/game');
  });

app.get('/game', passport.authenticate('bearer', { session: false }),
    function(req, res) {
    let user = {};
    User.find({googleId: req.user.googleId})
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
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
});

app.put('/game', passport.authenticate('bearer', { session: false }), 
    function(req, res) {
        let score;
        let questions;
    User.findOne({googleId: req.user.googleId})
    .then((currentUser) => {
        score = currentUser.score;
        if (req.body.answer === "true") {
            score += 1;
        }
        questions = algorithm(currentUser.questions, req.body.answer);
        return User.findOneAndUpdate({googleId: currentUser.googleId}, {$set:{score:score, questions:questions}})
    })
    .then(() => {
        return Word.find({_id: questions[0].word_id})
    })
    .then((words) => {
        res.status(200).json({score: score, question: words[0]})
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
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