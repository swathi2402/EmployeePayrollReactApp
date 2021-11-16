import React, { useState, useEffect } from "react";
import { Link, useParams, withRouter } from 'react-router-dom';
import profile1 from '../../assets/profile-images/Ellipse3.png';
import profile2 from '../../assets/profile-images/Ellipse1.png';
import profile3 from '../../assets/profile-images/Ellipse8.png';
import profile4 from '../../assets/profile-images/Ellipse7.png';
import './payroll-form.scss';
import logo from '../../assets/images/logo.png';
import EmployeeService from '../../services/employee-service'

const Payrollform = (props) => {

    let initialValue = {
        name: '',
        profileArray: [
            { url: '../../assets/profile-images/Ellipse3.png' },
            { url: '../../assets/profile-images/Ellipse1.png' },
            { url: '../../assets/profile-images/Ellipse8.png' },
            { url: '../../assets/profile-images/Ellipse7.png' }
        ],
        allDepartments: [
            'HR', 'Sales', 'Finance', 'Engineer', 'Others'
        ],
        department: [],
        gender: '',
        salary: '',
        day: '1',
        month: 'Jan',
        year: '2021',
        startDate: '',
        note: '',
        employeeId: '',
        profilePic: '',
        isUpdate: false,
        error: {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profilePic: '',
            startDate: '',
            note: ''
        }
    }
    const employeeService = new EmployeeService();

    let [formValue, setForm] = useState(initialValue);

    const [displayMeassage, setDisplayMessage] = useState("");

    const params = useParams();

    useEffect(() => {
        if (params.id) {
            getDataById(params.id);
        }
    }, []);

    const getDataById = (id) => {
        employeeService.getEmployee(id).then((data) => {
            console.log("Data is ", data.data.data);
            let object = data.data.data;
            setData(object);
        }).catch((error) => {
            console.log("Error is ", error);
        });
    };


    const setData = (object) => {
        let array = object.startDate.split("-");
        setForm({
            ...formValue, ...object, department: object.department, isUpdate: true, day: array[2], month: array[1], year: array[0],
        });
    };

    let _ = require('lodash');
    formValue.employeeId = _.uniqueId();

    const changeValue = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value })
        console.log(event.target.value)
    }

    const onCheckChange = (name) => {
        let index = formValue.department.indexOf(name);
        let checkArray = [...formValue.department]
        if (index > -1)
            checkArray.splice(index, 1)
        else
            checkArray.push(name);
        setForm({ ...formValue, department: checkArray });
    }

    const getChecked = (name) => {
        return formValue.department && formValue.department.includes(name);
    }

    const validData = async () => {
        let isError = false;
        let error = {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profilePic: '',
            startDate: '',
            note: ''
        }
        if (formValue.name.length < 1) {
            error.name = 'Name is required field!'
            isError = true;
        }
        if (formValue.gender.length < 1) {
            error.gender = 'Gender is required field!'
            isError = true;
        }
        if (formValue.salary.length < 1) {
            error.salary = 'Salary is required field!'
            isError = true;
        }
        if (formValue.profilePic.length < 1) {
            error.profilePic = 'Profile is required field!'
            isError = true;
        }
        if (formValue.department.length < 1) {
            error.department = 'Department is required field!'
            isError = true;
        }
        if (formValue.note.length < 1) {
            error.note = 'Notes is required field!'
            isError = true;
        }

        var day = formValue.day.valueOf();
        var month = formValue.month.valueOf();
        var year = formValue.year.valueOf();
        var date = new Date(day + " " + month + " " + year);
        var nowDate = new Date();

        if (date > nowDate) {
            error.startDate = "Date is a future Date!"
            isError = true;
        }

        await setForm({ ...formValue, error: error })
        return isError;
    }

    const save = async (event) => {
        event.preventDefault();
        const date = new Date(`${formValue.year} ${formValue.month} ${formValue.day}`);
        formValue.startDate = date.toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
        });

        if (await validData()) {
            console.log('error', formValue);
            return;
        }

        let object = {
            name: formValue.name,
            department: formValue.department,
            gender: formValue.gender,
            salary: formValue.salary,
            startDate: formValue.startDate,
            note: formValue.note,
            employeeId: formValue.employeeId,
            profilePic: formValue.profilePic,
        }

        if (formValue.isUpdate) {
            console.log("formValue.startDate", formValue);
            employeeService.updateEmployee(object, params.id).then((data) => {
                setDisplayMessage("Employee Updated Successfully");
                console.log("Data after update", data);
                reset();
                setTimeout(() => {
                    setDisplayMessage("");
                    props.history.push("");
                }, 3000);
            }).catch((error) => {
                setDisplayMessage("Error while Updating Employee");
                console.log("Error while updating", error);
                setTimeout(() => {
                    setDisplayMessage("");
                }, 3000);
            });
        } else {
            employeeService.addEmployee(object).then((data) => {
                setDisplayMessage("Employee Added Successfully");
                console.log("Data added");
                reset();
                setTimeout(() => {
                    setDisplayMessage("");
                    props.history.push("");
                }, 3000);
            }).catch((error) => {
                setDisplayMessage("Error while Adding Employee");
                console.log("Error while adding employee", error);
                setTimeout(() => {
                    setDisplayMessage("");
                }, 3000);
            });
        }
    }

    const reset = () => {
        setForm({ ...initialValue, employeeId: formValue.employeeId, isUpdate: formValue.isUpdate });
        console.log(formValue);
    }

    return (
        <div className="payroll-main">
            <header className='header row center'>
                <div className="logo">
                    <img src={logo} alt="" />
                    <div>
                        <span className="emp-text">EMPLOYEE</span> <br />
                        <span className="emp-text emp-payroll">PAYROLL</span>
                    </div>
                </div>
            </header>
            <div className="form-content">
                <form className="form" action="#" onSubmit={save} >
                    <div className="form-head"> Employee Payroll Form </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="name">Name</label>
                        <input className="input" type="text" id="name" name="name" value={formValue.name} onChange={changeValue} placeholder="Your name.." />
                        <div className="error">{formValue.error.name}</div>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="profilePic">Profile Image</label>
                        <div className="profile-radio-content">
                            <label>
                                <input type="radio" checked={formValue.profilePic === "../../assets/profile-images/Ellipse3.png"} name="profilePic" value="../../assets/profile-images/Ellipse3.png" onChange={changeValue} />
                                <img className="profile" id='image1' src={profile1} alt="profile" />
                            </label>
                            <label>
                                <input type="radio" checked={formValue.profilePic === "../../assets/profile-images/Ellipse1.png"} name="profilePic" value="../../assets/profile-images/Ellipse1.png" onChange={changeValue} />
                                <img className="profile" id='image1' src={profile2} alt="profile" />
                            </label>
                            <label>
                                <input type="radio" checked={formValue.profilePic === "../../assets/profile-images/Ellipse8.png"} name="profilePic" value="../../assets/profile-images/Ellipse8.png" onChange={changeValue} />
                                <img className="profile" id='image1' src={profile3} alt="profile" />
                            </label>
                            <label>
                                <input type="radio" checked={formValue.profilePic === "../../assets/profile-images/Ellipse7.png"} name="profilePic" value="../../assets/profile-images/Ellipse7.png" onChange={changeValue} />
                                <img className="profile" id='image1' src={profile4} alt="profile" />
                            </label>
                        </div>
                        <div className="error">{formValue.error.profilePic}</div>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="gender">Gender</label>
                        <div>
                            <input type="radio" id="male" checked={formValue.gender === 'Male'} onChange={changeValue} name="gender" value="Male" />
                            <label className="text" htmlFor="male">Male</label>
                            <input type="radio" id="female" checked={formValue.gender === 'Female'} onChange={changeValue} name="gender" value="Female" />
                            <label className="text" htmlFor="female">Female</label>
                        </div>
                        <div className="error">{formValue.error.gender}</div>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="department">Department</label>
                        <div>
                            {formValue.allDepartments.map(item => (
                                <span key={item}>
                                    <input className="checkbox" type="checkbox" onChange={() => onCheckChange(item)} name={item} checked={getChecked(item)} value={item} />
                                    <label className="text" htmlFor={item}>{item}</label>
                                </span>
                            ))}
                        </div>
                        <div className="error">{formValue.error.department}</div>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="salary">Salary:</label>
                        <input className="input" type="text" id="salary" name="salary" value={formValue.salary} onChange={changeValue} />
                        <div className="error">{formValue.error.salary}</div>
                    </div><br />
                    <div className="row-content">
                        <label className="label text" htmlFor="startDate">Start Date</label>
                        <div>
                            <select value={formValue.day} onChange={changeValue} id="day" name="day">
                                <option value="01">1</option>
                                <option value="02">2</option>
                                <option value="03">3</option>
                                <option value="04">4</option>
                                <option value="05">5</option>
                                <option value="06">6</option>
                                <option value="07">7</option>
                                <option value="08">8</option>
                                <option value="09">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                            <select value={formValue.month} onChange={changeValue} id="month" name="month">
                                <option value="01">January</option>
                                <option value="02">Febuary</option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                            <select onChange={changeValue} id="year" name="year">
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                                <option value="2016">2016</option>
                            </select>
                        </div>
                        <div className="error">{formValue.error.startDate}</div>
                    </div>
                    <br /><br />
                    <div className="row-content">
                        <label className="label text" htmlFor="note">Notes</label>
                        <textarea onChange={changeValue} id="note" value={formValue.note} className="input" name="note" placeholder=""
                            style={{ height: '100px' }}></textarea>
                        <div className="error">{formValue.error.note}</div>
                    </div>
                    <div className="buttonParent">
                        <Link to="/" className="resetButton button cancelButton">Cancel</Link>
                        <div className="submit-reset">
                            <button type="submit" className="button submitButton" id="submitButton">{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                            <button type="reset" onClick={reset} className="resetButton button">Reset</button>
                        </div>
                    </div>
                    <div className="displaymessage">
                        {displayMeassage}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default withRouter(Payrollform);