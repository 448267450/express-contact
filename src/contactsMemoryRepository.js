const crypto = require('node:crypto');
const db = new Map();

db.set('733fbcc6-6e69-4eb4-94f3-b71283bbbe37',{firstName: 'Johnson', lastName: 'Sessions', emailAdd: 'johnson.sessions@gmail.com', 
id: '733fbcc6-6e69-4eb4-94f3-b71283bbbe37'});
db.set('4b88c966-a392-410d-becb-8f34ca07ba6a',{firstName: 'Leah', lastName: 'Dvozak', emailAdd: 'leah.dvozak@gmail.com', 
id: '4b88c966-a392-410d-becb-8f34ca07ba6a'});

const repo = {
    findAll:  () => Array.from(db.values()),
    findById: (uuid) => db.get(uuid),
    create: (contact) => {
         const newContact = {
            id : crypto.randomUUID(),
            firstName: contact.firstName,
            lastName: contact.lastName,
            emailAdd: contact.emailAdd

         };
         db.set(newContact.id, newContact);
    },
    deleteById: (uuid) => db.delete(uuid),
};

module.exports = repo;