import React, { useState, useEffect } from 'react';
import '../styles/login.css'
import Modals from '../utils/Modals'
import LoginForm from '../forms/LoginForm';
import RegistrationForm from '../forms/RegistrationForm';
import Company from './Company'
import { useCurrentUser } from '../contexts/CompanyContext'

function Login(props) {
    const [showModal, setShowModal] = useState(true)
    const [showLogin, setShowLogin] = useState(true)
    const [showReg, setShowReg] = useState(false)
    const [proceedLogin, setProceedLogin] = useState(false)
    const [updateRegDB, setUpdateRegDB] = useState(false)
    const [openCompany, setOpenCompany] = useState(false)
    const [companyObject, setCompanyObject] = useState()
    const currentUser = useCurrentUser()

    const handleLogout = () => {
        console.log("tedtestZ handleLogout logging out or not in login")
        // Call the logout function to clear the user's session
        setShowLogin(true)
        setShowModal(true)
        setOpenCompany(false)
        setProceedLogin(false)
        console.log("Logout");
    };

    useEffect(() => {
        console.log("tedtestZ useEffect for openCompany=", openCompany)
        // if (openCompany) props.logged()
    }, [openCompany])

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                handleLogin(); // Call your button's onClick function
            }
        };
        // Add event listener when the component mounts
        document.getElementById('container').addEventListener('keyup', handleKeyPress);
        // Clean up the event listener when the component unmounts
        return () => {
            document.getElementById('container')?.removeEventListener('keyup', handleKeyPress);
        };
    }, []);

    const handleLogin = () => {
        console.log("tedtestZ handleLogin changing proceedlogin,showLogin=", showLogin)
        setProceedLogin(true)
    }

    useEffect(() => {
        console.log("tedtestZ USEEFFECT proceedlogin=", proceedLogin)
    }, [proceedLogin])

    const handleResponse = (val) => {
        console.log("tedtestZ handleResponse val=", val)
        if (val === "invalid") {
            setProceedLogin(false)
            setOpenCompany(false)
        }
    }

    const handleOpenCompany = (val) => {
        console.log("tedtestZ  handleopencompany val=", val)

        //this means the user has logged in successfully
        if (val.user_id) {
            console.log("tedtestZ handleOpenCompany user has logged in")
            setCompanyObject(val)
            setShowModal(false)
            setOpenCompany(true)
        }
        // else {
        //     setProceedLogin(false)
        // }
    }

    const handleRegister = () => {
        if (showLogin) {
            setShowReg(true)
            setShowLogin(false)
        }
        else {
            setUpdateRegDB(true)
            setShowLogin(false)
        }
    }

    const handleSuccess = (val) => {//user has registered successfully
        if (val === "success") {
            setShowReg(false)
            setShowLogin(true)
            //tedtest chk for last_company, if found open it,
            //if not found chk for companies, if found ask user to select a company
            //if not found tell user to set up a company - or just go into company setup
        }
    }

    const handleCloseModal = () => {
        if (showReg) {
            setShowReg(false)
            setShowLogin(true)
        }
    }

    return (
        <div id='container'>
            {showModal &&
                <Modals
                    title={showLogin ? "Login" : "Registration"}
                    onClose={() => handleCloseModal()}
                    noBckgrnd={true}
                    buttonStyle={showLogin ? { display: "none" } : {}}
                    style={{
                        backgroundColor: "rgba(250, 235, 215,0.8)",
                        boxShadow: "2px 2px 8px 2px rgba(140,150,155,0.2)",
                        border: "solid 2px rgba(140,150,155,1)"
                    }}
                    footer={
                        <div
                        >
                            {showLogin && <button
                                className='button_login'
                                onClick={handleLogin}>
                                Login
                            </button>}
                            {(showLogin || showReg) && <button
                                className='button_login'
                                onClick={handleRegister}>
                                Register
                            </button>}
                        </div>
                    }>
                    {showLogin && <LoginForm
                        proceedLogin={proceedLogin}
                        response={(val) => handleResponse(val)}
                        openCompany={(val) => handleOpenCompany(val)} />}
                    {showReg && <RegistrationForm
                        updateDatabase={updateRegDB}
                        success={(val) => handleSuccess(val)} />}
                </Modals>}
            {openCompany &&
                <Company
                    origin="login"
                    loggingOut={handleLogout}
                    // lastCo={companyObject.last_company}
                    companies={companyObject.companies}
                    user_id={currentUser}
                    companyObject={companyObject}
                />}
        </div>
    );
}

export default Login;
