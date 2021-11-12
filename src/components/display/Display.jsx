import React from "react";
import './display.scss';
import deleteIcon from '../../assets/icons/delete-black-18dp.svg';
import editIcon from '../../assets/icons/create-black-18dp.svg';
import profile from '../../assets/profile-images/Ellipse -3.png';

const Display = (props) => {
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
                    props.employeeArray && props.employeeArray.map((elememt, index) => (
                        <tr key={index}>
                            <td><img className="profile" alt="" src={profile} /></td>
                            <td>{elememt.name}</td>
                            <td>{elememt.gender}</td>
                            <td>{elememt.department && elememt.department.map(dept => (
                                <div className="dept-label">{dept}</div>
                            ))}</td>
                            <td>{elememt.salary}</td>
                            <td>{elememt.startDate}</td>
                            <td>
                                <img alt="delete" src={deleteIcon} />
                                <img alt="edit" src={editIcon} />
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Display;