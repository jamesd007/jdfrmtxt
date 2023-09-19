import React, { useEffect, useContext, useState } from 'react'
import '../styles/mainprogram.css'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { MdBusiness, MdAccountBalanceWallet, MdOutlineChangeCircle } from 'react-icons/md'
import Modals from "../utils/Modals"
// import AccountingSystem from './AccountingSystem'
import { getAllAccounts } from '../store/dexie';
import NutsofSetup from '../utils/NutsOfSetup'
// import AccountingSystem from './AccountingSystem';
import CompanyForm from '../forms/CompanyForm'
import Company from './Company'
import SelectCompany from './SelectCompany'

const Setup = (props) => {
    const [stdAccs, setStdAccs] = useState(false)
    const [allAccs, setAllAccs] = useState([])
    const [createCompany, setCreateCompany] = useState(false)
    const [selectCompany, setSelectCompany] = useState(false)
    const [dispCoForm, setDispCoForm] = useState(false)
    const [updateCoDB, setUpdateCoDB] = useState(false)

    useEffect(() => {
        getAllAccounts()
            .then(accounts => {
                setAllAccs(accounts)
            })
            .catch(error => {
                console.error('Error retrieving accounts:', error);
            });
    }, [])

    const handleStandardAccs = () => {
        setStdAccs(true)
    }

    const handleChangeCompany = () => {
        setSelectCompany(true)
    }

    const handleSelectCompany = () => {
    }

    const handleLoadCompanyForm = () => {
        setCreateCompany(true)
    }

    const handleCreateCompany = () => {
        setUpdateCoDB(true)
    }

    const handleCloseModal = () => {
        setCreateCompany(false)
        setSelectCompany(false)
        setDispCoForm(false)
    }

    const handleSuccess = (val) => {//user has logged in successfully
        // if (val.lastCo) { setLastCompany(val.lastCo) }
        if (val.status === "success") {
            setDispCoForm(false)
            setCreateCompany(false)
            props.newCo(val.lastCo)
            props.close()
        }
    }

    const handleClose = () => {
        props.close()
    }

    return (
        <div
            className='work_container'
            style={{
                // height: "100%",
                // width: "100%",
                backgroundColor: "lightsteelblue"
            }}>
            {stdAccs && <NutsofSetup
                close={() => setStdAccs(false)} />
            }
            {//this way or straight to the form, should use modal
                createCompany &&
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
                        user={props.user_id}
                        updateDatabase={updateCoDB}
                        success={(val) => handleSuccess(val)} />
                </Modals>}
            {selectCompany &&
                <Modals
                    title={"Select Company"}
                    onClose={() => handleCloseModal()}
                    noBckgrnd={true}
                    // buttonStyle={showLogin ? { display: "none" } : {}}
                    style={{
                        backgroundColor: "rgba(250, 235, 215,1)",
                        boxShadow: "2px 2px 8px 2px rgba(140,150,155,0.2)",
                        border: "solid 2px rgba(140,150,155,1)"
                    }}
                // footer={
                //     <div>
                //         <button
                //             className='button_login'
                //             onClick={handleSelectCompany}>
                //             Select
                //         </button>
                //     </div>
                // }
                >
                    <SelectCompany
                        close={() => setSelectCompany(false)}
                        success={(val) => handleSuccess(val)}
                    />
                </Modals>}
            <div>
                <div>
                    <h2 style={{
                        textAlign: "left",
                        margin: "0px 1rem 0px 1rem"
                    }}>
                        System setup</h2>
                </div>
                <div
                    style={{ margin: "1rem 0rem 0rem 1rem" }}>
                    <button
                        className='system_side_buttons'
                    >
                        <div
                            className='system_side_buttons_content'>
                            {/* <FaPrint
                            className='system_side_buttons_content_icon'
                            size={24} /> */}
                            <p
                                className='system_side_buttons_content_text'>
                                Legal Entity
                            </p>
                        </div>
                    </button>
                    <button
                        className='system_side_buttons'
                    // disabled={underConstruction}
                    // onClick={handleDebtorsReports}
                    >
                        <div
                            className='system_side_buttons_content'>
                            {/* <FaPrint
                            className='system_side_buttons_content_icon'
                            size={24} /> */}
                            <p className='system_side_buttons_content_text'>
                                Company information
                            </p>
                        </div>
                    </button>
                    <button
                        className='system_side_buttons'
                    // disabled={underConstruction}
                    // onClick={handleDebtorsReports}
                    >
                        <div
                            className='system_side_buttons_content' >
                            {/* <FaPrint
                            className='system_side_buttons_content_icon'
                            size={24} /> */}
                            <p className='system_side_buttons_content_text'>
                                Tax information
                            </p>
                        </div>
                    </button>
                    <button
                        className='system_side_buttons'
                    // disabled={underConstruction}
                    // onClick={handleDebtorsReports}
                    >
                        <div
                            className='system_side_buttons_content'>
                            {/* <FaPrint
                            className='system_side_buttons_content_icon'
                            size={24} /> */}
                            <p className='system_side_buttons_content_text'>
                                Bank accounts
                            </p>
                        </div>
                    </button>
                    <button
                        className='system_side_buttons'
                        disabled={allAccs?.length > 0}
                        onClick={handleStandardAccs}
                    >
                        <div
                            className='side_buttons_content'>
                            <MdAccountBalanceWallet
                                className='side_buttons_content_icon'
                                size={24} />
                            <p className='system_side_buttons_content_text'>
                                Standard set of accounts
                            </p>
                        </div>
                    </button>
                    <button
                        className='system_side_buttons'
                        onClick={handleChangeCompany}>
                        <div className='side_buttons_content'>
                            <MdOutlineChangeCircle
                                size={20} />
                            <p className='system_side_buttons_content_text'>
                                Select New company</p>
                        </div>
                    </button>
                    <button
                        className='system_side_buttons'
                        onClick={handleLoadCompanyForm}>
                        <div className='side_buttons_content'>
                            <MdBusiness
                                size={20} />
                            <p className='system_side_buttons_content_text'>
                                Create New company</p>
                        </div>
                    </button>
                    <button
                        className='system_side_buttons'
                        onClick={handleClose}>
                        <div className='side_buttons_content'>
                            <RiArrowGoBackFill
                                size={20} />
                            <p className='system_side_buttons_content_text'>Close</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Setup