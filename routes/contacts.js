var express = require('express');
var router = express.Router();
// First Name, Last Name, Email Address
let data = [
  {firstName: 'Johnson', lastName: 'Sessions', emailAdd: 'johnson.sessions@gmail.com', 
  id: '733fbcc6-6e69-4eb4-94f3-b71283bbbe37'},
  {firstName: 'Leah', lastName: 'Dvozak', emailAdd: 'leah.dvozak@gmail.com', 
  id: '4b88c966-a392-410d-becb-8f34ca07ba6a'}
];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('contacts', { title: 'Express Contacts',  contacts: data } );
});

module.exports = router;
