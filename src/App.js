import React from 'react';
import './App.css';
import Payrollform from './components/payroll-form/Payrollform.jsx';
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Payrollform />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;