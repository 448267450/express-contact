const crypto = require('node:crypto');
const fs = require('node:fs')
const path = require('node:path')
const Contact = require('../src/Contact')
const db = new Map();

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();

// db.set('733fbcc6-6e69-4eb4-94f3-b71283bbbe37',{firstName: 'Johnson', lastName: 'Sessions', emailAdd: 'johnson.sessions@gmail.com', 
// id: '733fbcc6-6e69-4eb4-94f3-b71283bbbe37'});
// db.set('4b88c966-a392-410d-becb-8f34ca07ba6a',{firstName: 'Leah', lastName: 'Dvozak', emailAdd: 'leah.dvozak@gmail.com', 
// id: '4b88c966-a392-410d-becb-8f34ca07ba6a'});

const loadData = () => {
    const jsonData = fs.readFileSync(path.join(__dirname, '../data/contacts.json'));
    const contactsArray = JSON.parse(jsonData);
    contactsArray.forEach(element => {
        const aContact = new Contact(element[1].id, element[1].text);
        db.set(element[0], element[1], element[2], element[3], element[4], element[5]);
    });
    console.log(db);
};
const saveData = () => {
    const stringifyData = JSON.stringify(Array.from(db));
    fs.writeFileSync(path.join(__dirname, '../data/contacts.json'), stringifyData);
};


const repo = {
    findAll: () => Array.from(db.values()),
    findById: (uuid) => db.get(uuid),
    create: (contact) => {
        contact.id = crypto.randomUUID();


        contact.lastModefiedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;


        db.set(contact.id,  contact);
        saveData();
    },
    deleteById: (uuid) => {
        db.delete(uuid);
        saveData();
    },
    update: (contact) => {
        contact.lastModefiedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        db.set(contact.id, contact);
        saveData();
    },
};

loadData();

module.exports = repo;