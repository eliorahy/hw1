const { Employee } = require("../config/db.config");

exports.createEmployee = (req, res) => {
    let employee = {};

    try{
        // Building Employee object from upoading request's body
        employee.firstname = req.body.firstname;
        employee.lastname = req.body.lastname;
        employee.age = req.body.age;
    
        // Save to MySQL database
        Employee.create(employee, 
                          {attributes: ['id', 'firstname', 'lastname', 'age']})
                    .then(result => {    
                      res.status(200).json(result);
                    });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.getEmployee = (req, res) => {
    Employee.findByPk(req.params.id, 
                        {attributes: ['id', 'firstname', 'lastname', 'age']})
        .then(employee => {
          res.status(200).json(employee);
        }).catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        })
}

exports.employees = (req, res) => {
    
    try{
        Employee.findAll({attributes: ['id', 'firstname', 'lastname', 'age']})
        .then(employees => {
            res.status(200).json(employees);
        })
    }catch(error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
}

exports.deleteEmployee = async (req, res) => {
    try{
        let employeeId = req.params.id;
        let employee = await Employee.findByPk(employeeId);

        if(!employee){
            res.status(404).json({
                message: "Does Not exist a Employee with id = " + employeeId,
                error: "404",
            });
        } else {
            await employee.destroy();
            res.status(200);
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a employee with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.updateEmployee = async (req, res) => {
    try{
        let employee = await Employee.findByPk(req.body.id);
    
        if(!employee){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a employee with id = " + employeeId,
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                age: req.body.age
            }
            let result = await Employee.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes: ['id', 'firstname', 'lastname', 'age']
                              }
                            );

            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a employee with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json(result);
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a employee with id = " + req.params.id,
            error: error.message
        });
    }
}