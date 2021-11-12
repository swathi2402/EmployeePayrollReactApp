import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import addIcon from '../../assets/icons/add-24px.svg';
import './home.scss';
class Home extends React.Component {

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
                            Employee Details<div className="emp-count">10</div>
                        </div>
                        <Link to="Payrollform" className="add-button flex-row-center"><img src={addIcon} alt="" />Add User</Link>
                    </div>
                    <div className="table-main">
                        {/* <Display employeeArray={ } /> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;