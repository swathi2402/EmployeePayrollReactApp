import React from "react";
import { Link } from 'react-router-dom';
import './display.scss';
import EmployeeService from '../../services/employee-service';
import deleteIcon from '../../assets/icons/delete-black-18dp.svg';
import editIcon from '../../assets/icons/create-black-18dp.svg';


const Display = (props) => {

    const employeeService = new EmployeeService();

    const remove = (id) => {
        employeeService.deleteEmployee(id).then(data => {
            console.log("Deleted data: ", data);
        }).catch(error => {
            console.log("Error after ", error);
        });
        window.location.replace("/home");
        // <Redirect to="/" />
    }

    return (
        <table id="display" className="table">
            <tbody>
                <tr key={-1}>
                    <th></th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th>Start Date</th>
                    <th>Actions</th>
                </tr>
                {
                    props.employeeArray && props.employeeArray.map((element, index) => (

                        <tr key={index}>
                            <td>
                                <img className="profile" id='image1' src={require('../../assets/profile-images/Ellipse1.png')} alt="profile" />
                            </td>
                            <td>{element.name}</td>
                            <td>{element.gender}</td>
                            <td>{element.department && element.department.map(dept => (
                                <div className="dept-label">{dept}</div>
                            ))}</td>
                            <td>{element.salary}</td>
                            <td>{element.startDate}</td>
                            <td>
                                <img onClick={() => remove(element.id)} alt="delete" src={deleteIcon} />
                                <Link to={`/add/${element.id}`} > <img src={editIcon} alt="edit" /> </Link>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Display;