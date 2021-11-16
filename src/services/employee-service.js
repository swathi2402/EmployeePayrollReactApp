import axios from 'axios'

const baseUrl = 'http://localhost:8080/';

export default class EmployeeService {

    addEmployee(data) {
        return axios.post(`${baseUrl}payrollservice/create`, data);
    }

    getEmployee(id) {
        return axios.get(`${baseUrl}payrollservice/get/${id}`);
    }

    getAllEmployees() {
        return axios.get(`${baseUrl}payrollservice/`);
    }

    deleteEmployee(id) {
        return axios.delete(`${baseUrl}payrollservice/delete/${id}`);
    }

    updateEmployee(data, id) {
        return axios.put(`${baseUrl}payrollservice/update/${id}`, data);
    }
}
