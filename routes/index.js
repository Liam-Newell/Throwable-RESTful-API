var express = require('express');
var router = express.Router();
// Require `PhoneNumberFormat`.
var PNF = require('google-libphonenumber').PhoneNumberFormat;
// Get an instance of `PhoneNumberUtil`.
var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Lib phonenumber request*/
router.get('/:string', function(req, res, next){

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

module.exports = router;
