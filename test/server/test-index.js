// global.databaseUri = 'mongodb://localhost/instafrench';
// var chai = require('chai');
// var chaiHttp = require('chai-http');
// var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// var UrlPattern = require('url-pattern');
// var app = require('../../client/js/index').app;

// var User = require('../../server/models/user');
// var Word = require('../../server/models/word');

// var makeSpy = require('./spy');

// var should = chai.should();

// chai.use(chaiHttp);

// describe('Message endpoints', function() {
//   var server;
//   beforeEach(function(done) {
//     this.listPattern = new UrlPattern('/game');
//     // Clear the database
//     mongoose.connection.db.dropDatabase(function(err, res) {
//       // Add three example users
//       this.alice = {
//         token: 'alice',
//         _id: 'aaaaaaaaaaaaaaaaaaaaaaaa'
//       };

//       this.bob = {
//         username: 'bob',
//         _id: 'bbbbbbbbbbbbbbbbbbbbbbbb'
//       };

//       this.chuck = {
//         username: 'chuck',
//         _id: 'cccccccccccccccccccccccc'
//       };

//       // Create users
//       var promiseA = new User(this.alice).save();
//       var promiseB = new User(this.bob).save();
//       var promiseC = new User(this.chuck).save();
//       Promise.all([promiseA, promiseB, promiseC]).then(function() {
//         done();
//       });
//     }.bind(this));
//   });