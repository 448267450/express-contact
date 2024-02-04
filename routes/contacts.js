var express = require('express');
var router = express.Router();
const contactsRepo = require('../src/contactsMemoryRepository');



/* GET contacts listing. */
router.get('/', function(req, res, next) {
  const data = contactsRepo.findAll();
  res.render('contacts', { title: 'Express Contacts',  contacts: data } );
});

/* GET contacts add . */
router.get('/add', function(req, res, next) {
  res.render('contacts_add', { title: 'Add a Contact' } );
});

/* POST contacts add . */
router.post('/add', function(req, res, next) {
  // console.log(req.body);
  if(req.body.firstName.trim() === ''){
    res.render('contacts_add', {title: 'Add a Contact', msg: 'fistName cannot be blank!'});
  }else{
    contactsRepo.create({firstName: req.body.firstName.trim(), lastName: req.body.lastName.trim(), 
      emailAdd: req.body.emailAdd.trim()});
    res.redirect('/contacts');
  }
  
});

module.exports = router;
