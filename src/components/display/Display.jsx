import React from "react";
import { Redirect } from 'react-router-dom';
import './display.scss';
import EmployeeService from '../../services/employee-service';
import deleteIcon from '../../assets/icons/delete-black-18dp.svg';
import editIcon from '../../assets/icons/create-black-18dp.svg';
import profile from '../../assets/profile-images/Ellipse3.png';


const Display = (props) => {

    const employeeService = new EmployeeService();

    const remove = (id) => {
        employeeService.deleteEmployee(id).then(data => {
            console.log("Deleted data: ", data);
        }).catch(error => {
            console.log("Error after ", error);
        });
        window.location.replace("/");
        // <Redirect to="/" />
    }

    const update = (id) => {
        let employeeData;
        employeeService.getEmployee(id).then(data => {
            employeeData = data.data;
            localStorage.setItem("employeeData", JSON.stringify(employeeData));
        }).catch(error => {
            console.log("Error after ", error);
        });
        window.location.replace("/update");
        // <Redirect to="/add" />
        employeeService.updateEmployee(employeeData, id).then(data => {
            console.log("Deleted data: ", data);
        }).catch(error => {
            console.log("Error after ", error);
        })
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
                            {console.log(element)}
                            <td>
                                <img className="profile" id='image1' src={require('../../assets/profile-images/Ellipse1.png')} alt="profile" />
                                {/* <img className="profile" alt="Profile" src={require('../../assets/profile-images/Ellipse -2.png')} /> */}
                            </td>
                            <td>{element.name}</td>
                            <td>{element.gender}</td>
                            <td>{element.departmentValues && element.departmentValues.map(dept => (
                                <div className="dept-label">{dept}</div>
                            ))}</td>
                            <td>{element.salary}</td>
                            <td>{element.startDate}</td>
                            <td>
                                <img onClick={() => remove(element.id)} alt="delete" src={deleteIcon} />
                                <img onClick={() => update(element.id)} alt="edit" src={editIcon} />
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Display;