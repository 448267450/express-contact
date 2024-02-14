var express = require('express');
var router = express.Router();
const contactsController = require('../controllers/contactsController')
const {body } = require('express-validator');
const contactsRepo = require('../src/contactsFileRepository');



/* GET contacts listing. */
router.get('/', contactsController.contacts_list)

/* GET contacts add . */
router.get('/add', contactsController.contacts_create_get);

/* POST contacts add . */
router.post('/add', 
body('firstName').trim().notEmpty().withMessage('First Name cannot be blank!') , 
body('lastName').trim().notEmpty().withMessage('Last Name cannot be blank!') , 
body('emailAdd').trim().isEmail()
.withMessage('Email field must be inserted in proper email format!') , 
body('contactNotes').trim(),

// prevent injecting html/css/js in the form
body('firstName').custom((value) => {
    if (/(<([^>]+)>)/i.test(value)) {
        throw new Error('Content should not contain HTML tags!');
    } else if (/style=["'][^"'>]*['"]/i.test(value)) {
        throw new Error('Content should not contain CSS styles!');
    } else if (/script\s*?=\s*?[\"\'](.*?)[\'\"]/i.test(value)) {
        throw new Error('Content should not contain JavaScript code!');
    }
    
    return true;
}).withMessage('Invalid firstName format, HTML/CSS/JavaScript format is not acceptable!'),


body('lastName').custom((value) => {
    if (/(<([^>]+)>)/i.test(value)) {
        throw new Error('Content should not contain HTML tags!');
    } else if (/style=["'][^"'>]*['"]/i.test(value)) {
        throw new Error('Content should not contain CSS styles!');
    } else if (/script\s*?=\s*?[\"\'](.*?)[\'\"]/i.test(value)) {
        throw new Error('Content should not contain JavaScript code!');
    }
    
    return true;
}).withMessage('Invalid lastName format, HTML/CSS/JavaScript format is not acceptable!'),

body('emailAdd').custom((value) => {
    if (/(<([^>]+)>)/i.test(value)) {
        throw new Error('Content should not contain HTML tags!');
    } else if (/style=["'][^"'>]*['"]/i.test(value)) {
        throw new Error('Content should not contain CSS styles!');
    } else if (/script\s*?=\s*?[\"\'](.*?)[\'\"]/i.test(value)) {
        throw new Error('Content should not contain JavaScript code!');
    }
    
    return true;
}).withMessage('Invalid emailAdd format, HTML/CSS/JavaScript format is not acceptable!'),

body('contactNotes').custom((value) => {
    if (/(<([^>]+)>)/i.test(value)) {
        throw new Error('Content should not contain HTML tags!');
    } else if (/style=["'][^"'>]*['"]/i.test(value)) {
        throw new Error('Content should not contain CSS styles!');
    } else if (/script\s*?=\s*?[\"\'](.*?)[\'\"]/i.test(value)) {
        throw new Error('Content should not contain JavaScript code!');
    }
    
    return true;
}).withMessage('Invalid contactNotes format, HTML/CSS/JavaScript format is not acceptable!'),


contactsController.contacts_create_post);

/* GET a contact */
router.get('/:uuid', contactsController.contacts_detail);

/* GET contacts delete . */
router.get('/:uuid/delete', contactsController.contacts_delete_get);

/* POST contacts delete . */
router.post('/:uuid/delete', contactsController.contacts_delete_post);

/* GET contacts edit  */
router.get('/:uuid/edit', contactsController.contacts_edit_get);

/* POST contacts edit . */
router.post('/:uuid/edit', contactsController.contact_edit_post);

module.exports = router;
