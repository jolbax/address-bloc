const inquirer = require("inquirer");

module.exports = class MenuController {
  constructor() {
    this.mainMenuQuestions = [
      {
        type: "list",
        name: "mainMenuChoice",
        message: "Please choose from an option below: ",
        choices: [
          "Add new contact",
          "Get date",
          "Exit"
        ]
      }
    ];
    this.contacts = [];
  }
  main() {
    console.log(`Welcome to AddressBloc!`);
    inquirer
      .prompt(this.mainMenuQuestions)
      .then(response => {
        switch (response.mainMenuChoice) {
          case "Add new contact":
            this.addContact();
            break;
          case "Get date":
            this.clear();
            this.getDate("de-CH", "long");
            this.main();
            break;
          case "Exit":
            this.exit();
            break;
          default:
            console.log("Invalid input");
            break;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  clear() {
    console.log("\x1Bc");
  }

  addContact() {
    this.clear();
    console.log("addContact called");
    this.main();
  }

  exit() {
    console.log("Thanks for using AddressBloc!");
    process.exit();
  }

  getDate(locale = "de-CH", format = "short") {
    let options,
      date,
      rawDate = Date.now();
    if (format === "long") {
      options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      };
    } else {
      options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false
      };
    }
    date = Intl.DateTimeFormat(locale, options).format(rawDate);
    console.log(date);
  }
};
