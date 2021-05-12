module.exports = (sequelize, Sequelize) => {
	const Employee = sequelize.define('employees', {	
	  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
	  firstname: {
			type: Sequelize.STRING
	  },
	  lastname: {
		  type: Sequelize.STRING
  	},
	  age: {
			type: Sequelize.INTEGER
    }
	});
	
	return Employee;
}