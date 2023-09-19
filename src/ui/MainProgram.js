import React, { useState, useEffect } from 'react'
import { BsFillBarChartLineFill } from 'react-icons/bs'
import { GrPrint, GrTransaction } from 'react-icons/gr'
import { FaBalanceScale, FaUsersCog, FaUser } from 'react-icons/fa'
import { FiFileText } from 'react-icons/fi'
import { MdOutlineLibraryBooks, MdPeopleAlt } from 'react-icons/md'
import '../styles/mainprogram.css'
import AccMaint from './AccMaint'
import CustomerMaint from './CustomerMaint'
import SupplierMaint from './SupplierMaint'
import Transactions from './Transactions'
import Reports from './Reports'
import Budget from './Budget'
import FileTransfer from './FileTransfer'
import Setup from './Setup'
import db from '../store/dexie'
import { useCompany, useCurrentUser } from '../contexts/CompanyContext'

const MainProgram = (props) => {
    const [openAcc, setOpenAcc] = useState(false)
    const [openTransactions, setOpenTransactions] = useState(false)
    const [openReports, setOpenReports] = useState(false)
    const [openSetup, setOpenSetup] = useState(false)
    const [openCustomer, setOpenCustomer] = useState(false)
    const [openSupplier, setOpenSupplier] = useState(false)
    const [openBudget, setOpenBudget] = useState(false)
    const [openFileTransfer, setOpenFileTransfer] = useState(false)
    const [companyName, setCompanyName] = useState('')
    const [userName, setUserName] = useState('')
    const currentCompany = useCompany()
    // const currentCompanyChange = useCompanyUpdate()
    const currentUser = useCurrentUser()

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

    async function getUserNameById(userId) {
        try {
            const userName = await db.users.where({ id: userId }).first();

            if (userName) {
                return userName.username;
            } else {
                return 'user not found'; // Handle the case when the user is not found
            }
        } catch (error) {
            console.error('Error getting user name:', error);
            return 'Error getting user name';
        }
    }

    // useEffect(() => {
    //     getCompanyNameById(props.lastCo)
    //         .then(companyName => {
    //             setCompanyName(companyName)
    //             console.log('Company Name:', companyName);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }, [props.lastCo, props])
    useEffect(() => {
        getCompanyNameById(currentCompany)
            .then(companyName => {
                setCompanyName(companyName)
                console.log('Company Name:', companyName);
            })
            .catch(error => {
                console.error(error);
            });
    }, [currentCompany])

    useEffect(() => {
        getUserNameById(currentUser)
            .then(UserName => {
                setUserName(UserName)
                console.log('User Name:', UserName);
            })
            .catch(error => {
                console.error(error);
            });
    }, [currentUser])

    const handleAccMaint = () => {
        if (openTransactions) setOpenTransactions(false)
        if (openReports) setOpenReports(false)
        if (openSetup) setOpenSetup(false)
        if (openCustomer) setOpenCustomer(false)
        if (openSupplier) setOpenSupplier(false)
        if (openFileTransfer) setOpenFileTransfer(false)
        if (openBudget) setOpenBudget(false)
        setOpenAcc(true)
    }
    const handleCustomerMaint = () => {
        if (openAcc) setOpenAcc(false)
        if (openTransactions) setOpenTransactions(false)
        if (openReports) setOpenReports(false)
        if (openSetup) setOpenSetup(false)
        if (openSupplier) setOpenSupplier(false)
        if (openFileTransfer) setOpenFileTransfer(false)
        if (openBudget) setOpenBudget(false)
        setOpenCustomer(true)
    }
    const handleSupplierMaint = () => {
        if (openAcc) setOpenAcc(false)
        if (openTransactions) setOpenTransactions(false)
        if (openReports) setOpenReports(false)
        if (openSetup) setOpenSetup(false)
        if (openCustomer) setOpenCustomer(false)
        if (openFileTransfer) setOpenFileTransfer(false)
        if (openBudget) setOpenBudget(false)
        setOpenSupplier(true)
    }
    const handleTransactions = () => {
        if (openAcc) setOpenAcc(false)
        if (openReports) setOpenReports(false)
        if (openSetup) setOpenSetup(false)
        if (openCustomer) setOpenCustomer(false)
        if (openSupplier) setOpenSupplier(false)
        if (openFileTransfer) setOpenFileTransfer(false)
        if (openBudget) setOpenBudget(false)
        setOpenTransactions(true)
    }
    const handleReports = () => {
        if (openAcc) setOpenAcc(false)
        if (openTransactions) setOpenTransactions(false)
        if (openSetup) setOpenSetup(false)
        if (openCustomer) setOpenCustomer(false)
        if (openSupplier) setOpenSupplier(false)
        if (openFileTransfer) setOpenFileTransfer(false)
        if (openBudget) setOpenBudget(false)
        setOpenReports(true)
    }
    const handleBudget = () => {
        if (openAcc) setOpenAcc(false)
        if (openTransactions) setOpenTransactions(false)
        if (openSetup) setOpenSetup(false)
        if (openCustomer) setOpenCustomer(false)
        if (openSupplier) setOpenSupplier(false)
        if (openReports) setOpenReports(false)
        if (openFileTransfer) setOpenFileTransfer(false)
        setOpenBudget(true)
    }
    const handleFileTransfer = () => {
        if (openAcc) setOpenAcc(false)
        if (openTransactions) setOpenTransactions(false)
        if (openSetup) setOpenSetup(false)
        if (openCustomer) setOpenCustomer(false)
        if (openSupplier) setOpenSupplier(false)
        if (openReports) setOpenReports(false)
        if (openBudget) setOpenBudget(false)
        setOpenFileTransfer(true)
    }
    const handleSetup = () => {
        if (openAcc) setOpenAcc(false)
        if (openTransactions) setOpenTransactions(false)
        if (openReports) setOpenReports(false)
        if (openCustomer) setOpenCustomer(false)
        if (openSupplier) setOpenSupplier(false)
        if (openFileTransfer) setOpenFileTransfer(false)
        if (openBudget) setOpenBudget(false)
        setOpenSetup(true)
    }

    const handleNewCo = (val) => {
        getCompanyNameById(val)
            .then(companyName => {
                setCompanyName(companyName)
                console.log('Company Name:', companyName);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div>
            <div
            // className='work_container'
            >
                {openAcc &&
                    <AccMaint
                        close={() => setOpenAcc(false)}
                    />
                }
                {openCustomer &&
                    <CustomerMaint
                        close={() => setOpenCustomer(false)}
                    />
                }
                {openSupplier &&
                    <SupplierMaint
                        close={() => setOpenSupplier(false)}
                    />
                }
                {openTransactions &&
                    <Transactions
                        close={() => setOpenTransactions(false)} />
                }
                {openReports &&
                    <Reports
                        close={() => setOpenReports(false)} />
                }
                {openBudget &&
                    <Budget
                        close={() => setOpenBudget(false)} />
                }
                {openFileTransfer &&
                    <FileTransfer
                        close={() => setOpenFileTransfer(false)} />
                }
                {openSetup &&
                    <Setup
                        newCo={(val) => handleNewCo(val)}
                        user_id={props.user_id}
                        close={() => setOpenSetup(false)} />
                }

            </div>
            {props.origin !== "setup" &&
                <div className="container">
                    <div className="button_grid">
                        < button className='main_buttons'
                            onClick={handleAccMaint}>
                            <MdOutlineLibraryBooks
                                size={28} />
                            Accounts
                        </button>
                        < button className='main_buttons'
                            onClick={handleCustomerMaint}>
                            <MdPeopleAlt
                                size={28} />
                            Customers
                        </button>
                        < button className='main_buttons'
                            onClick={handleSupplierMaint}>
                            <MdPeopleAlt
                                size={28} />
                            Suppliers
                        </button>
                        <button className='main_buttons'
                            onClick={handleTransactions}>
                            <GrTransaction
                                size={28} />
                            Transactions
                        </button>
                        <button className='main_buttons'
                            onClick={handleReports}>
                            <GrPrint
                                size={28} />
                            Reports
                        </button>
                        <button className='main_buttons'
                            onClick={handleBudget}>
                            <FaBalanceScale
                                size={28} />
                            Budget
                        </button >
                        <button className='main_buttons'
                            onClick={handleFileTransfer}>
                            <FiFileText
                                size={28} />
                            File Transfer
                        </button>
                        <button className='main_buttons'
                            onClick={handleSetup}>
                            <FaUsersCog
                                size={28} />
                            System
                        </button>
                    </div>
                </div>}
            <div
                style={{
                    position: "absolute",
                    bottom: "1%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                <span
                    style={{ marginLeft: "0.5rem" }}> <FaUser
                        size={14} />
                </span>
                <span
                    style={{ marginLeft: "0.1rem", marginRight: "0.2rem" }}>
                    current user:</span>
                <span>
                    {userName}
                </span>
                <span
                    style={{ marginLeft: "0.5rem" }}><BsFillBarChartLineFill
                        size={14} />
                </span>
                <span
                    style={{ marginLeft: "0.1rem", marginRight: "0.2rem" }}>current company:</span>
                <span>
                    {companyName}
                </span>
                {/* <span>{currentCompany}</span> */}
            </div>
        </div>
    )
}

export default MainProgram