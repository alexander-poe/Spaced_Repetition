require('dotenv').config()
import 'babel-polyfill';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import User from './models/user';
mongoose.Promise = global.Promise;


const algorithm = (questions, answer) => {

    if (answer) {
        questions[0].ind *= 2;
        questions[1].ind -= 1;
    } else {
        questions[0].ind = 1;
        questions[1].ind -= 1;
    }

    return questions.sort((a, b) => a.ind - b.ind);

}


const DATABASE_URL = process.env.DATABASE_URL;

const HOST = process.env.HOST;
const PORT = process.env.PORT || 3000;

console.log(`Server running in ${process.env.NODE_ENV} mode`);

const app = express();

app.use(express.static(process.env.CLIENT_PATH));

app.use(bodyParser.json());

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
    User.create({
        score: req.body.score,
        questions: req.body.questions
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
        if (req.body.answer) {
            score += 1;
        }
        let questions = algorithm(current.questions, req.body.answer);

        User.findOneAndUpdate({__v: 0}, {$set:{score:score, questions:questions}},function(err, user){
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(201).json(questions[0]);
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
