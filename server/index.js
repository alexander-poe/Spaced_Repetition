require('dotenv').config()
import 'babel-polyfill';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import User from './models/user';
import Word from './models/word';

mongoose.Promise = global.Promise;


var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
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

app.get('/', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/game');
  });

app.get('/game', function(req, res) {
    User.find(function(err, userData) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        let current = userData[0];
        res.json({score: current.score, question: current.questions[0]});
    });
});

app.post('/game', function(req, res) {
    Word.find(function(err, userData) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        let current = userData;
        console.log(userData);
    });
    User.create({
        score: 0,
        questions: [{english: "one", french: "un", freq: 1}, 
        {english: "two", french: "deux", freq: 1}, 
        {english: "three", french: "trois", freq: 1}, 
        {english: "four", french: "quatre", freq: 1}, 
        {english: "five", french: "cinq", freq: 1}, 
        {english: "six", french: "six", freq: 1}, 
        {english: "seven", french: "sept", freq: 1}, 
        {english: "eight", french: "huit", freq: 1}, 
        {english: "nine", french: "neuf", freq: 1}, 
        {english: "ten", french: "dix", freq: 1}]
    }, function(err, user) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(user);
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
        console.log(questions);
        User.findOneAndUpdate({_id: current._id}, {$set:{score:score, questions:questions}},function(err, user){
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(201).json({score: score, question: questions[0]});
        });
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
