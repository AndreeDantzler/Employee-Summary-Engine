const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


//creating variables per type of employees, empty array for output as well

const employees = [];
let outputHtml;

const managerInquiries = [
  {
    type: "input",
    message: "What is your name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your ID?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your email?",
    name: "email",
  },
  {
    type: "input",
    message: "What is your office number?",
    name: "officeNumber",
  },
];

const employeeInquiries = [
  {
    type: "list",
    message: "What is role of employee you would like to add?",
    name: "employeeRole",
    choices: ["Engineer", "Intern"],
  },
];

const engineerInquiries = [
  {
    type: "input",
    message: "What is the name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is the ID?",
    name: "id",
  },
  {
    type: "input",
    message: "What is the email?",
    name: "email",
  },
  {
    type: "input",
    message: "What is the GitHub username?",
    name: "github",
  },
  {
    type: "list",
    message: "Would you like to add an employee?",
    name: "addingEmployee",
    choices: ["Yes", "No"],
  },
];

const internInquiries = [
  {
    type: "input",
    message: "What is the name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is the ID?",
    name: "id",
  },
  {
    type: "input",
    message: "What is the email?",
    name: "email",
  },
  {
    type: "input",
    message: "What is the school name?",
    name: "school",
  },
  {
    type: "list",
    message: "Would you like to add an employee?",
    name: "addingEmployee",
    choices: ["Yes", "No"],
  },
];

//separating functions per type to make it clearer

function init() {
  managerQuestions();
}

function managerQuestions() {
  inquirer.prompt(managerInquiries).then(function (answers) {
    //pushing answers using class
    employees.push(
      new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
    );
    console.log(employees);
    employeeQuestions();
  });
}

function employeeQuestions() {
  inquirer.prompt(employeeInquiries).then(function (answers) {
    if (answers.employeeRole === "Engineer") {
      engineerQuestions();
    } else {
      internQuestions();
    }
  });
}

function engineerQuestions() {
  inquirer.prompt(engineerInquiries).then(function (answers) {
    employees.push(
      new Engineer(answers.name, answers.id, answers.email, answers.github)
    );
    console.log(employees);
    if (answers.addingEmployee === "Yes") {
      employeeQuestions();
    } else {
      //if no more employees, we can render the page
      outputHtml = render(employees);
      writeHtml(outputHtml);
    }
  });
}

function internQuestions() {
  inquirer.prompt(internInquiries).then(function (answers) {
    employees.push(
      new Intern(answers.name, answers.id, answers.email, answers.school)
    );
    console.log(employees);
    if (answers.addingEmployee === "Yes") {
      employeeQuestions();
    } else {
      //generate page
      outputHtml = render(employees);
      writeHtml(outputHtml);
    }
  });
}

function writeHtml(data) {
  fs.mkdir(OUTPUT_DIR, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.error("New directory successfully created.");
    }
  });
  fs.writeFile(outputPath, data, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
}

init();

