var express = require('express');
var router = express.Router();
var fs = require('fs');
// Require `PhoneNumberFormat`.
var PNF = require('google-libphonenumber').PhoneNumberFormat;
// Get an instance of `PhoneNumberUtil`.
var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Lib phonenumber request*/
router.get('/api/phonenumbers/parse/text/:string', function(req, res, next){

  try{
      var numbers = req.params.string.toString().split(' ');
      var phonelist = parsePhoneNumbers(numbers);
      //var phoneNumber = phoneUtil.parse(req.params.string, 'US');
      res.json(phonelist);
  }
  catch (a){
      var error = "could not resolve " + req.params.string + " into phone number\n"
      + a;
      console.error(a);
      res.status(400).json([]);
      
  }

});


router.post('/api/phonenumbers/parse/file', upload.single('file'), function(req, res) {
    if(req.file) {
        try {
            fs.readFile(req.file.path, 'utf8', function(err,data) {
                if (err) {
                    console.log('error thrown');
                    throw err;
                }
                else {
                    console.log('Passed');
                    console.log(data);
                    var fileText = data.toString().split('\n');
                    var phoneList = parsePhoneNumbers(fileText);
                    res.json(phoneList);
                }
            });
        }
        catch (a) {
           var error = "could not open " + req.file.originalname + "\n"
                + a;
           res.end(error);
        }
    }
    else{
        console.error('error');
        res.end();
    }
});

function parsePhoneNumbers(phoneNumbers)
{
    var phoneList = [];
    let number = "";

      
      for(let i = 0; i < phoneNumbers.length; i++){
        number = phoneNumbers[i];
          try{
            var phoneNumber = phoneUtil.parse(phoneNumbers[i], 'US');
            phoneList.push(phoneUtil.format(phoneNumber, PNF.INTERNATIONAL));
          }
          catch(a){
              console.error('Error: Could not resolve "'+ number + '" as phone number.\n');
              console.error("--- Printing stack trace ---");
              console.error(a);
          }
      }


    return Array.from(new Set(phoneList));
}

router.get('/file', function(req, res, next) {
    res.render('file');
});
module.exports = router;
