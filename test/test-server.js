/* All rights reserved https://github.com/apetov
MIT License

Copyright (c) 2018 jean

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
*/

/* Sourced From https://github.com/apetov/phoneparser-js/blob/master/test.js*/

var chai = require('chai');
var expect = require('chai').expect;
var fs = require('fs');

chai.use(require('chai-http'));

var app = require('../app.js');

describe('API endpoint /', function(){

    // GET - root
    it('root should return status 200', function(){
    return chai.request(app)
        .get('/')
        .then(function(res){
        expect(res).to.have.status(200);
    });
  });
});

describe('API endpoint /api/phonenumbers/parse/text', function(){

// GET - number
    it('should return [\'+1 416-491-5050\']', function(){
    return chai.request(app)
        .get('/api/phonenumbers/parse/text/Seneca%20Phone%20Number%3A%20416-491-5050')
        .then(function(res){
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array').that.include('+1 416-491-5050');
    });
});

// GET - nothing --

it('should return http 400 with an empty array given \'nothing\' as input', 
  () => {
    return chai.request(app)
    .get('/api/phonenumbers/parse/text/nothing')
    .then (function() { new Error('This test should not have passed!')})
    .catch(function(res){
      expect(res).to.have.status(400);
      expect(res.response.res.body).to.be.an('array').that.is.empty;
    });
  });
});


describe('API endpoint /api/phonenumbers/parse/file', function(){

    // POST - File in Base64 encoding
    it('should parse numbers encoded in base64 text file', function(){
      return chai.request(app)
        .post('/api/phonenumbers/parse/file')
        .set('Content-Type', 'text/plain')
        .attach('file', fs.readFileSync('../Throwable-RESTful-API/base64_file.txt'), 'base64_file.txt')
        .then(function(result){
          expect(result).to.have.status(200);
          expect(result.body).to.be.an('array')
          .that.include('+1 416-123-1234', '+1 647-222-3333',
           '+1 416-491-5050');
        });
    });

    // POST - file 
    it('should return [\'+1 519-579-7250\', \'+1 613-555-0127\',\'+1 613-555-0120\', \'+1 613-555-0192\', \'+1 613-555-0117\',\'+1 613-555-0105\', \'+1 613-555-0107\', \'+1 613-555-0120\',\'+1 613-555-0192\', \'+1 613-555-0117\']', function(){
    return chai.request(app)
        .post('/api/phonenumbers/parse/file')
        .set('Content-Type', 'text/plain')
        .attach('file', fs.readFileSync('../Throwable-RESTful-API/file.txt'), 'text.txt')
        .then(function(res){
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array')
        .that.include('+1 519-579-7250', '+1 613-555-0127',
         '+1 613-555-0120', '+1 613-555-0192', '+1 613-555-0117',
         '+1 613-555-0105', '+1 613-555-0107', '+1 613-555-0120',
         '+1 613-555-0192', '+1 613-555-0117');
    });
  });
});