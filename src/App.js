import React from 'react';
import './App.css';
import Payrollform from './components/payroll-form/Payrollform.jsx';
import Home from './components/home/Home';
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/"><Home/></Route>
          <Route exact path="/add"><Payrollform/></Route>
          <Route exact path="/update"><Payrollform/></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;