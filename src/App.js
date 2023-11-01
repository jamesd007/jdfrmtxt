import React from 'react';
import './App.css';
import Login from './ui/Login';
import { CompanyProvider } from './contexts/CompanyContext'
import { ActiveDBProvider } from './contexts/CompanyContext';

function App() {

  return (
    <div className="App">
      <ActiveDBProvider
        value={""}
      >
        {/* <div
          style={{
            display: "flex",
            flexDirection: "row"
          }}> */}
        <h1
          className='brand'>
          JD's Accounting
        </h1>
        {/* </div> */}
        < p className='main_title'>
          ACCOUNTS</p>
        <Login />
      </ActiveDBProvider>
    </div>
  );
}

export default App;
