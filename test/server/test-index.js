var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;


import { app, runServer, closeServer, createArrayOfQuestions } from '../../server';
import User from '../../server/models/user';
import Word from '../../server/models/word';

var should = chai.should();
chai.use(chaiHttp);

describe('GAME', function() {
	
	before(function(done) {
		runServer(function() {
			return createArrayOfQuestions()
			.then(questions => {
				return User.create({
					accessToken: "123",
					googleId: "111",
					name: "John Doe",
					score: 0,
					questions: questions
				});
			})
			.then(() => done())
			.catch(err => {
				console.log(err);
				done(err);
			})
		})
	});

	after(function() {
		User.remove({}, (err) => {
			console.log(err);
		});
		return closeServer();
	});

	it('should reject unauthorized users', (done) => {
		chai.request(app)
		.get('/game')
		.end((err, res) => {
			res.unauthorized.should.equal(true);
			done();
		})
	})
	it('should accept authorized users', (done) => {
		chai.request(app)
		.get('/game')
		.set('authorization', 'Bearer 123')
		.end((err, res) => {
			res.unauthorized.should.equal(false);
			done();
		})
	})
	it('GET should return a new word and score', (done) => {
		chai.request(app)
		.get('/game')
		.set('authorization', 'Bearer 123')
		.end((err, res) => {
			should.equal(err, null);
			res.unauthorized.should.equal(false);
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('object');
			res.body.should.have.property('question');
			res.body.question.should.be.a('object');
			res.body.question.should.have.property('_id');
			res.body.question.should.have.property('french');
			res.body.question.french.should.equal('un');
			res.body.question.should.have.property('english');
			res.body.question.english.should.equal('one');
			res.body.should.have.property('score');
			res.body.score.should.be.an.integer;
			res.body.score.should.equal(0);
			done();
		})
	})
	it('PUT should return a new word and score', (done) => {
		chai.request(app)
		.put('/game')
		.set('authorization', 'Bearer 123')
		.send({'answer': 'true'})
		.end((err, res) => {
			should.equal(err, null);
			res.unauthorized.should.equal(false);
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('object');
			res.body.should.have.property('question');
			res.body.question.should.be.a('object');
			res.body.question.should.have.property('_id');
			res.body.question.should.have.property('french');
			res.body.question.french.should.equal('deux');
			res.body.question.should.have.property('english');
			res.body.question.english.should.equal('two');
			res.body.should.have.property('score');
			res.body.score.should.be.an.integer;
			res.body.score.should.equal(1);
			done();
		})
	})
});
