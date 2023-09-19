import React, { useEffect, useState, useContext } from 'react'
import Modals from '../utils/Modals'
import CompanyForm from '../forms/CompanyForm'
import db from '../store/dexie'
import MainProgram from './MainProgram'
import { useCompany, useCompanyUpdate, useCurrentUser, useCurrentUserUpdate } from '../contexts/CompanyContext'
import { TiThMenu } from 'react-icons/ti'
import NutsofSetup from '../utils/NutsOfSetup'
import CSVImport from './CSVImport'

const Company = (props) => {
    console.log("tedtestZ opened company")
    const [dispCoForm, setDispCoForm] = useState(false)
    const [updateCoDB, setUpdateCoDB] = useState(false)
    const [loadButtons, setLoadButtons] = useState(false)
    const [lastCompany, setLastCompany] = useState()
    const companyId = useCompany()
    const changeCompanyId = useCompanyUpdate()
    const currentUser = useCurrentUser()
    const changeUser = useCurrentUserUpdate()
    const [accsPresent, setAccsPresent] = useState(true)
    const [loggedIn, setLoggedIn] = useState(true)
    const [companyName, setCompanyName] = useState('')
    const [stdAccs, setStdAccs] = useState(false)
    const [csvImport, setCsvImport] = useState(false)

    const handleLogInOut = () => {
        changeCompanyId("")
        changeUser("")
        setLoadButtons(false)
        setLoggedIn(false)
        console.log("tedtestZ handleLoginLogout logging in out")
        props.loggingOut()
    }

    async function getCompanyNameById(companyId) {
        try {
            const companyName = await db.companies.where({ id: companyId }).first();
            if (companyName) {
                return companyName.companyName;
            } else {
                return 'Company not found'; // Handle the case when the company is not found
            }
        } catch (error) {
            console.error('Error getting company name:', error);
            return 'Error getting company name';
        }
    }

    useEffect(() => {
        getCompanyNameById(companyId)
            .then(companyName => {
                setCompanyName(companyName)
                console.log('tedtestZ Company Name:', companyName);
            })
            .catch(error => {
                console.error(error);
            });
    }, [companyId])

    useEffect(() => {
        if (loggedIn) {
            const getLastCo = async () => {
                try {
                    const lastCo = await db.companies.get(companyId);
                    if (lastCo) {
                        setLoadButtons(true)
                        db.accounts.count().then(count => {
                            if (count === 0) {
                                setAccsPresent(false)
                            } else {
                                setAccsPresent(true)
                                console.log(`tedtestQ The "accounts" table contains ${count} records.`);
                            }
                        }).catch(error => {
                            console.error('Error checking the "accounts" table:', error);
                        });
                    } else {
                        console.log('ERROR loading last company');
                    }
                } catch (error) {
                    console.error('ERROR Error fetching company:', error);
                }
            }
            if (companyId) {
                getLastCo()
            }
            else if (props.companies) {
                //TODO finsh this
            }
            else {
                setDispCoForm(true)
            }
        }
    }, [companyId])

    const handleCloseModal = () => {
        setDispCoForm(false)
    }

    const handleCloseLoadModal = () => {
        setAccsPresent(true)
    }

    const handleCreateCompany = () => {
        setUpdateCoDB(true)
    }

    const handleSuccess = (val) => {//user has logged in successfully
        if (val.lastCo) {
            // setLastCompany(val.lastCo)
            // setLastCompany()
            changeCompanyId(val.lastCo)
        }
        if (val.status === "success") {
            setDispCoForm(false)
            setLoadButtons(true)
        }
    }

    const handleStdAccs = () => {
        setStdAccs(true)
    }

    const handleCSV = () => {
        setCsvImport(true)
    }

    return (
        <div>
            <span
                style={{
                    position: "absolute",
                    right: "10px",
                    top: "5px",
                    color: "gray"
                }}
                onClick={handleLogInOut}
            >
                <TiThMenu
                    size={32} />
            </span>
            {dispCoForm &&
                <Modals
                    title={"Create Company"}
                    onClose={() => handleCloseModal()}
                    noBckgrnd={true}
                    // buttonStyle={showLogin ? { display: "none" } : {}}
                    style={{
                        backgroundColor: "rgba(250, 235, 215,1)",
                        boxShadow: "2px 2px 8px 2px rgba(140,150,155,0.2)",
                        border: "solid 2px rgba(140,150,155,1)"
                    }}
                    footer={
                        <div>
                            <button
                                className='button_login'
                                onClick={handleCreateCompany}>
                                Create
                            </button>
                        </div>
                    }>
                    <CompanyForm
                        user={currentUser}
                        // user={props.user_id}
                        updateDatabase={updateCoDB}
                        success={(val) => handleSuccess(val)} />
                </Modals>}
            {!accsPresent &&
                <Modals
                    title={"Load/import accounts"}
                    onClose={() => handleCloseLoadModal()}
                    noBckgrnd={true}
                    // buttonStyle={showLogin ? { display: "none" } : {}}
                    style={{
                        backgroundColor: "rgba(250, 235, 215,0.8)",
                        boxShadow: "2px 2px 8px 2px rgba(140,150,155,0.2)",
                        border: "solid 2px rgba(140,150,155,1)"
                    }}
                    footer={
                        <div
                        style={{marginLeft:"1rem"}}>
                            <button
                                className='button_login'
                                onClick={handleStdAccs}>
                                Std accs
                            </button>
                            <button
                                className='button_login'
                                onClick={handleCSV}>
                                Import CSV
                            </button>
                            <button
                                className='button_login'
                                onClick={() => setAccsPresent(true)}>
                                Cancel
                            </button>
                        </div>
                    }>
                    <div
                        style={{
                            marginTop: "0px",
                            textAlign: "left"
                        }}>
                        <p
                            style={{
                                marginTop: "0px"
                            }}>This step is optional
                        </p>
                        <p
                            style={{
                                margin: "0px 0px 0px 0px",
                                fontSize: "1.1em"
                            }}
                        >The company, {companyName}, does not have any accounts. You may:</p>
                        <span
                            style={{ textAlign: "left", marginLeft: "1rem" }}>
                            {'\u2022'} Load a standard set of accounts
                        </span>
                        <br />
                        <span
                            style={{ textAlign: "left", marginLeft: "1rem" }}>
                            {'\u2022'} Import a set of accounts in csv format
                        </span>
                    </div>
                </Modals>}
            {loadButtons &&
                <MainProgram
                    origin={props.origin}
                    user_id={currentUser}
                    // user_id={props.user_id}
                    lastCo={lastCompany}
                // props.lastCo
                // ? props.lastCo
                // : lastCompany} 
                />}
            {stdAccs && <NutsofSetup
                close={() => setStdAccs(false)} />
            }
            {csvImport && <CSVImport
                close={() => setCsvImport(false)} />
            }
        </div>
    )
}

export default Company

//check if props.last_company exists in database- if so load it
//if not last_company then check props.companies
//if props.companies ask user to select a company from drop down list
//list to contain 'create company' as option
//if user selects company, load it
//if user selects 'create company' create company
//if nop props.companies then create company

// create company - load CompanyForm.js