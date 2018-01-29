var express = require('express');
var router = express.Router();
var fs = require('fs');
// Require `PhoneNumberFormat`.
var PNF = require('google-libphonenumber').PhoneNumberFormat;
// Get an instance of `PhoneNumberUtil`.
var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Lib phonenumber request*/
router.get('/test/:string', function(req, res, next){

  try{
      var phoneNumber = phoneUtil.parse(req.params.string, 'US');
      res.json(phoneUtil.format(phoneNumber, PNF.INTERNATIONAL))
      //res.end(phoneUtil.format(phoneNumber, PNF.INTERNATIONAL));
  }
  catch (a){
      var error = "could not resolve " + req.params.string + " into phone number\n"
      + a;
      res.end(error);

    }

});
router.get('/file', function(req, res, next) {
    res.render('file');
});
router.post('/file', function(req, res, next) {
    var file = req.body.file;
    var number;
    fs.readFile(file, function (err, data) {
        if (err) throw err;
        number = data;
    });
    try{
        var phoneNumber = phoneUtil.parse(number, 'US');
        res.json(phoneUtil.format(phoneNumber, PNF.INTERNATIONAL))
        //res.end(phoneUtil.format(phoneNumber, PNF.INTERNATIONAL));
    }
    catch (a){
        var error = "could not resolve " + req.params.string + " into phone number\n"
            + a;
        res.end(error);

    }

});
module.exports = router;
