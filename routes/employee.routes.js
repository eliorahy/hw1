let express = require('express');
let router = express.Router();
 
const employees = require('../controllers/employee.controller.js');

router.post('/api/employee', employees.createEmployee);
router.get('/api/employee/:id', employees.getEmployee);
router.get('/api/employees', employees.employees);
router.put('/api/employee', employees.updateEmployee);
router.delete('/api/employee/:id', employees.deleteEmployee);

module.exports = router;