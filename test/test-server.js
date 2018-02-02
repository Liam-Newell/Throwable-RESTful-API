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

var app = require('../routes/index.js');

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

// GET - nothing -- TODO
/*
it('should return an empty array', () => {
    return chai.request(app)
    .get('/api/phonenumbers/parse/text/nothing')
    .then((res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('array').that.is.empty;
    });
  });
*/

});


describe('API endpoint /api/phonenumbers/parse/file', function(){

    // POST - file
    it('should return [\'+1 859-999-1843\', \'+1 316-984-6123\', \'+1 321-342-6332\']', function(){
    return chai.request(app)
        .post('/api/phonenumbers/parse/file')
        .set('Content-Type', 'text/plain')
        .attach('file', fs.readFileSync('../Throwable-RESTful-API/file.txt'), 'text.txt')
        .then(function(res){
        expect(res).to.have.status(200);
    expect(res.body).to.be.an('array').that.include('+1 859-999-1843', '+1 316-984-6123', '+1 321-342-6332');
});
})
});