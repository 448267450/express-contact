var express = require('express');
var router = express.Router();
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
