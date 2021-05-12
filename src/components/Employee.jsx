import React, { Component } from 'react';
import { Button,  ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'reactjs-popup/dist/index.css';

class Employee extends Component {

  constructor(props) {
    super(props);
    this.state = {employees: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('/api/employees')
      .then(response => response.json())
      .then(data => this.setState({employees: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/employee/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedEmployees = [...this.state.employees].filter(i => i.id !== id);
      this.setState({employees: updatedEmployees});
    });
  }

  render() {
    const {employees, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const employeeList = employees.map(employee => {
      return <tr key={employee.id}>
        <td style={{whiteSpace: 'nowrap'}}>{employee.firstname}</td>
        <td>{employee.lastname}</td>
        <td>{employee.age}</td>
        <td><a href={employee.copyright}>{employee.copyright}</a></td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/employees/" + employee.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(employee.id)}>
             Remove <img src="https://api.iconify.design/bi:x.svg"/>
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <Container fluid>
          <br></br>
          <div className="float-right">
            <Button color="success" tag={Link} to="/employees/new">Add Employee</Button>
          </div>
          <h3>Employee List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Firstname</th>
                <th width="20%">Lastname</th>
                <th width="10%">Age</th>
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>
            {employeeList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default Employee;