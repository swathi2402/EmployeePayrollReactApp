import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import addIcon from '../../assets/icons/add-24px.svg';
import './home.scss';
import EmployeeService from '../../services/employee-service';
import Display from '../display/Display';

class Home extends React.Component {

    constructor() {
        super()
        this.state = {
            employeeArray: [],
            size: 0,

        }
        this.getAllEmployees();
    }

    employeeService = new EmployeeService();

    getAllEmployees = () => {
        this.employeeService.getAllEmployees().then(data => {
            console.log("Data after get ", data.data);
            this.setState({ employeeArray: data.data });
            this.setState({ size: data.data.length });
        }).catch(error => {
            console.log("Error after ", error);
        })
    }

    render() {
        return (
            <div>
                <header className='header row center'>
                    <div className="logo">
                        <img src={logo} alt="" />
                        <div>
                            <span className="emp-text">EMPLOYEE</span> <br />
                            <span className="emp-text emp-payroll">PAYROLL</span>
                        </div>
                    </div>
                </header>
                <div className="main-content">
                    <div className="header-content">
                        <div className="emp-detail-text">
                            Employee Details<div className="emp-count">{this.state.size}</div>
                        </div>
                        <Link to="/add" className="add-button flex-row-center"><img src={addIcon} alt="" />Add User</Link>
                    </div>
                    <div className="table-main">
                        <Display employeeArray={this.state.employeeArray} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;