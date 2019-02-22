const Contact = require("../db/models").Contact;

module.exports = class ContactController {
  constructor(){
    this.contacts = [];
    this.addContactQuestions = [
      {
        type: "input",
        name: "name",
        message: "Contact's name - ",
        validate(val) {
          return val !== "";
        }
      },
      {
        type: "input",
        name: "phone",
        message: "Contact's phone number - ",
        validate(val) {
          return val !== "";
        }
      },
      {
        type: "input",
        name: "email",
        message: "Contact's email address - ",
        validate(val) {
          let re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
          return val !== "" && re.test(val) ? true:false;
        }
      }
    ];
    this.searchQuestions = [
      {
        type: "input",
        name: "name",
        message: "Name of contact to search - ",
        validate(val){
          return val !== "";
        }
      }
    ];
    this.showContactQuestions = [
      {
        type: "list",
        name: "selected",
        message: "Please choose from an option below",
        choices: [
          "Delete contact",
          "Main menu"
        ]
      }
    ];
    this.deleteConfirmQuestion = [
      {
        type: "confirm",
        name: "confirmation",
        message: "are you sure you want to delete this contact?"
      }
    ]
  }

  addContact(name, phone, email){
    return Contact.create({name, phone, email});
  }

  getContacts(){
    return Contact.findAll();
  }

  iterativeSearch(contacts, target) {
    for ( let contact of contacts ) {
      if (contact.name.toLowerCase() === target.toLowerCase()) {
        return contact
      }
    }
    return null;
  }

  binarySearch(contacts, target){
    let min = 0, max = contacts.length - 1, mid;

    while( min <= max ) {
      mid = Math.floor((min + max) / 2);
      let currentContact = contacts[mid];

      if (currentContact.name > target) {
        max = mid -1;
      } else if (currentContact < target) {
        min = mid + 1;
      } else {
        return contacts[mid];
      }
    }
    return null;
  }

  search(name) {
    return Contact.findOne({
      where: {name}
    });
  }

  delete(id) {
    return Contact.destroy({
      where: {id}
    });
  }
}