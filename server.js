const express = require('express');
const app = express();

var bodyParser = require('body-parser');
 
global.__basedir = __dirname;
 
const db = require('./config/db.config.js');

const Employee = db.Employee;

let router = require('./routes/employee.routes.js');

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.static('resources'));
app.use('/', router);

// Create a Server
const server = app.listen(3000, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port); 
})

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  Employee.sync().then(() => {
    const employees = [
      { firstname: 'Jack', lastname: 'Smith', 
                age: 23},
      { firstname: 'Adam', lastname: 'Johnson', 
                age: 31},
      { firstname: 'Dana', lastname: 'Bay', 
                age: 46},
    ]
    
    for(let i=0; i<employees.length; i++){
      Employee.create(employees[i]);
    }
  })
}); 