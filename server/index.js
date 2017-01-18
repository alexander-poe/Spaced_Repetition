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
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
       return done(null, profile);
    // });
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
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  function(req, res) {
    console.log(req);
    // Successful authentication, redirect home.
    res.redirect('/');
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

app.get('/game', function(req, res) {
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
        console.log(id)
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

app.post('/game', function(req, res) {
    Word.find(function(err, userData) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        let current = userData;
        return userData;
    })
    .then(function(userData) {
        let words = userData.map((word) => {
            return {word_id: word._id, freq: 1}
        });
        User.create({
            score: 0,
            questions: words
        }, function(err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(201).json(user);
        });
    });
});

app.put('/game', function(req, res) {
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
