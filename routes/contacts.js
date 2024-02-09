var express = require('express');
var router = express.Router();
const {body, validationResult } = require('express-validator');
const contactsRepo = require('../src/contactsFileRepository');



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
router.post('/add', 
body('firstName').trim().notEmpty().withMessage('First Name cannot be blank!') , 
body('lastName').trim().notEmpty().withMessage('Last Name cannot be blank!') , 
body('emailAdd').trim().notEmpty().withMessage('Email Address cannot be blank!').isEmail()
.withMessage('Email field must be inserted in proper email format!') , 
function(req, res, next) {
  // console.log(req.body);
  const result = validationResult(req);
  if(!result.isEmpty()){
    res.render('contacts_add', {title: 'Add a Contact', msg: result.array() });
  }else{
    contactsRepo.create({firstName: req.body.firstName.trim(), lastName: req.body.lastName.trim(), 
      emailAdd: req.body.emailAdd.trim()});
    res.redirect('/contacts');
  }
  
});

/* GET a contact */
router.get('/:uuid', function(req, res, next) {
  const contact = contactsRepo.findById(req.params.uuid);
  if(contact){
    res.render('contact', { title: 'Your Contact', contact: contact } );
  }else{
    res.redirect('/contacts');
  }
});

/* GET contacts delete . */
router.get('/:uuid/delete', function(req, res, next) {
  const contact = contactsRepo.findById(req.params.uuid);
  res.render('contacts_delete', { title: 'Delete a Contact', contact: contact } );
});

/* POST contacts delete . */
router.post('/:uuid/delete', function(req, res, next) {
  contactsRepo.deleteById(req.params.uuid);
  res.redirect('/contacts')
});

/* GET contacts edit  */
router.get('/:uuid/edit', function(req, res, next) {
  const contact = contactsRepo.findById(req.params.uuid);
  res.render('contacts_edit', {title: 'Edit Contact', contact: contact} )
});

/* POST contacts edit . */
router.post('/:uuid/edit', function(req, res, next) {
  // console.log(req.body);
  if(req.body.firstName.trim() === ''){
    const contact = contactsRepo.findById(req.params.uuid);
    res.render('contacts_add', {title: 'Edit Contact', msg: 'fistName cannot be blank!', contact: contact });
  }else{
    const updateContact = {id: req.params.uuid, firstName: req.body.firstName.trim(), lastName: req.body.lastName.trim(), 
      emailAdd: req.body.emailAdd.trim()};
    contactsRepo.update(updateContact);
    res.redirect('/contacts');
  }
  
});

module.exports = router;
