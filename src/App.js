import React from 'react';
import './App.css';
import Payrollform from './components/payroll-form/payroll-form';
import { BrowserRouter, Router, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Router>
          <Route exact path="/payroll-form">
            <Payrollform />
          </Route>
        </Router>
      </BrowserRouter>
    </div>
  );
}

export default App;