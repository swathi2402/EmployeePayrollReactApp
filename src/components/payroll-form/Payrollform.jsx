import React, { useState } from "react";
import { Link } from 'react-router-dom';
import profile1 from '../../assets/profile-images/Ellipse -3.png';
import profile2 from '../../assets/profile-images/Ellipse 1.png';
import profile3 from '../../assets/profile-images/Ellipse -8.png';
import profile4 from '../../assets/profile-images/Ellipse -7.png';
import './payroll-form.scss';
import logo from '../../assets/images/logo.png';
import EmployeeService from '../../services/employee-service'
const Payrollform = (props) => {
    let initialValue = {
        name: '',
        profileArray: [
            { url: '../../assets/profile-images/Ellipse -3.png' },
            { url: '../../assets/profile-images/Ellipse 1.png' },
            { url: '../../assets/profile-images/Ellipse -8.png' },
            { url: '../../assets/profile-images/Ellipse -7.png' }
        ],
        allDepartments: [
            'HR', 'Sales', 'Finance', 'Engineer', 'Others'
        ],
        departmentValues: [],
        gender: '',
        salary: '',
        day: '1',
        month: 'Jan',
        year: '2021',
        startDate: '',
        notes: '',
        id: '',
        profileUrl: '',
        isUpdate: false,
        error: {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profileUrl: '',
            startDate: '',
            notes: ''
        }
    }
    const employeeService = new EmployeeService();

    const [formValue, setForm] = useState(initialValue);
    const [displayMeassage, setDisplayMessage] = useState("");

    const changeValue = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value });
    }

    const onCheckChange = (name) => {
        let index = formValue.departmentValues.indexOf(name);
        let checkArray = [...formValue.departmentValues]
        if (index > -1)
            checkArray.splice(index, 1)
        else
            checkArray.push(name);
        setForm({ ...formValue, departmentValues: checkArray });
    }

    const getChecked = (name) => {
        return formValue.departmentValues && formValue.departmentValues.includes(name);
    }

    const validData = async () => {
        let isError = false;
        let error = {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profileUrl: '',
            startDate: '',
            notes: ''
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
        if (formValue.profileUrl.length < 1) {
            error.profileUrl = 'Profile is required field!'
            isError = true;
        }
        if (formValue.departmentValues.length < 1) {
            error.department = 'Department is required field!'
            isError = true;
        }
        if (formValue.notes.length < 1) {
            error.notes = 'Notes is required field!'
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
        console.log("save");

        if (await validData()) {
            console.log('error', formValue);
            return;
        }

        let object = {
            name: formValue.name,
            departmentValues: formValue.departmentValues,
            gender: formValue.gender,
            salary: formValue.salary,
            startDate: `${formValue.day} ${formValue.month} ${formValue.year}`,
            notes: formValue.notes,
            id: '',
            profileUrl: formValue.profileUrl,
        }

        employeeService.addEmployee(object).then(data => {
            console.log("Data added");
            setDisplayMessage("Successfully Added User");
            setTimeout(() => {
                setDisplayMessage("");
            }, 5000);
        }).catch(error => {
            console.log("Error while adding");
            setDisplayMessage("Error while Adding User");
            setTimeout(() => {
                setDisplayMessage("");
            }, 5000);
        })
    }

    const reset = () => {
        setForm({ ...initialValue, id: formValue.id, isUpdate: formValue.isUpdate });
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
                        <label className="label text" htmlFor="profileUrl">Profile Image</label>
                        <div className="profile-radio-content">
                            <label>
                                <input type="radio" checked={formValue.profileUrl === "../../assets/profile-images/Ellipse -3.png"} name="profileUrl" value="../../assets/profile-images/Ellipse -3.png" onChange={changeValue} />
                                <img className="profile" id='image1' src={profile1} alt="profile" />
                            </label>
                            <label>
                                <input type="radio" checked={formValue.profileUrl === "../../assets/profile-images/Ellipse 1.png"} name="profileUrl" value="../../assets/profile-images/Ellipse 1.png" onChange={changeValue} />
                                <img className="profile" id='image1' src={profile2} alt="profile" />
                            </label>
                            <label>
                                <input type="radio" checked={formValue.profileUrl === "../../assets/profile-images/Ellipse -8.png"} name="profileUrl" value="../../assets/profile-images/Ellipse -8.png" onChange={changeValue} />
                                <img className="profile" id='image1' src={profile3} alt="profile" />
                            </label>
                            <label>
                                <input type="radio" checked={formValue.profileUrl === "../../assets/profile-images/Ellipse -7.png"} name="profileUrl" value="../../assets/profile-images/Ellipse -7.png" onChange={changeValue} />
                                <img className="profile" id='image1' src={profile4} alt="profile" />
                            </label>
                        </div>
                        <div className="error">{formValue.error.profileUrl}</div>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="gender">Gender</label>
                        <div>
                            <input type="radio" id="male" onChange={changeValue} name="gender" value="Male" />
                            <label className="text" htmlFor="male">Male</label>
                            <input type="radio" id="female" onChange={changeValue} name="gender" value="Female" />
                            <label className="text" htmlFor="female">Female</label>
                        </div>
                        <div className="error">{formValue.error.gender}</div>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="department">Department</label>
                        <div>
                            {formValue.allDepartments.map(item => (
                                <span key={item}>
                                    <input className="checkbox" type="checkbox" onChange={() => onCheckChange(item)} name={item} defaultChecked={() => getChecked(item)} value={item} />
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
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
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
                                <option value="Jan">January</option>
                                <option value="Feb">February</option>
                                <option value="Mar">March</option>
                                <option value="Apr">April</option>
                                <option value="May">May</option>
                                <option value="Jun">June</option>
                                <option value="Jul">July</option>
                                <option value="Aug">August</option>
                                <option value="Sep">September</option>
                                <option value="Oct">October</option>
                                <option value="Nov">November</option>
                                <option value="Dec">December</option>
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
                        <label className="label text" htmlFor="notes">Notes</label>
                        <textarea onChange={changeValue} id="notes" value={formValue.notes} className="input" name="notes" placeholder=""
                            style={{ height: '100px' }}></textarea>
                        <div className="error">{formValue.error.notes}</div>
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

export default Payrollform;