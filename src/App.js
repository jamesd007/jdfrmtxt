import React from 'react';
import './App.css';
import Login from './ui/Login';
import { CompanyProvider } from './contexts/CompanyContext'

function App() {

  return (
    <div className="App">
      <CompanyProvider
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
      </CompanyProvider>
    </div>
  );
}

export default App;
