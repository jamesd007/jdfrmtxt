import React, { useState, useEffect } from 'react'
// import {BsHousesFill} from 'react-icons/bs'
import { FaFileInvoice, FaReceipt, FaHandHoldingWater } from 'react-icons/fa'
import { MdPayment } from 'react-icons/md'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { getAllAccounts } from '../store/dexie';
import Levies from "./Levies"
import Journals from "./Journals"
import BankCharges from './BankCharges';

const Transactions = (props) => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
    const [isSubMenuCredOpen, setIsSubMenuCredOpen] = useState(false)
    const [showAccs, setShowAccs] = useState(false)
    const [levyAccs, setLevyAccs] = useState([])
    const [showJournals, setShowJournals] = useState(false)
    const [showBankCharges, setShowBankCharges] = useState(false)
    const [showUtilities, setShowUtilities] = useState(false)
    const [showInsurances, setShowInsurances] = useState(false)
    const [showWages, setShowWages] = useState(false)

    async function getLevyAccs() {
        const existingAccounts = await getAllAccounts();
        return existingAccounts.filter(account => account.category === "levies");
    }

    useEffect(() => {
        getLevyAccs()
            .then(item => {
                setLevyAccs(item)
            })
            .catch(error => {
                console.error('Error checking account number:', error);
            });
        return () => {

        }
    }, [showAccs])
    //DEBTORS
    const handleLevies = () => {
        if (showBankCharges) setShowBankCharges(false)
        if (showUtilities) setShowUtilities(false)
        if (showInsurances) setShowInsurances(false)
        if (showWages) setShowWages(false)
        if (showJournals) setShowJournals(false)
        setShowAccs(true)
        setIsSubMenuOpen(false)
    }
    //CREDITORS
    const handleBankCharges = () => {
        if (showAccs) setShowAccs(false)
        if (showUtilities) setShowUtilities(false)
        if (showInsurances) setShowInsurances(false)
        if (showWages) setShowWages(false)
        if (showJournals) setShowJournals(false)
        setShowBankCharges(true)
        setIsSubMenuCredOpen(false)
    }
    const handleUtilities = () => {
        if (showAccs) setShowAccs(false)
        if (showBankCharges) setShowBankCharges(false)
        if (showInsurances) setShowInsurances(false)
        if (showWages) setShowWages(false)
        if (showJournals) setShowJournals(false)
        setShowUtilities(true)
        setIsSubMenuOpen(false)
    }
    const handleInsurances = () => {
        if (showAccs) setShowAccs(false)
        if (showBankCharges) setShowBankCharges(false)
        if (showUtilities) setShowUtilities(false)
        if (showWages) setShowWages(false)
        if (showJournals) setShowJournals(false)
        setShowInsurances(true)
        setIsSubMenuOpen(false)
    }
    const handleWages = () => {
        if (showAccs) setShowAccs(false)
        if (showBankCharges) setShowBankCharges(false)
        if (showUtilities) setShowUtilities(false)
        if (showInsurances) setShowInsurances(false)
        if (showJournals) setShowJournals(false)
        setShowWages(true)
        setIsSubMenuOpen(false)
    }
    const handleJournals = () => {
        if (showAccs) setShowAccs(false)
        if (showBankCharges) setShowBankCharges(false)
        if (showUtilities) setShowUtilities(false)
        if (showInsurances) setShowInsurances(false)
        if (showWages) setShowWages(false)
        setShowJournals(true)
        setIsSubMenuOpen(false)
    }

    const handleDebtors = () => {
        if (isSubMenuCredOpen) setIsSubMenuCredOpen(false)
        setIsSubMenuOpen(!isSubMenuOpen);
    };
    const handleCreditors = () => {
        if (isSubMenuOpen) setIsSubMenuOpen(false)
        setIsSubMenuCredOpen(!isSubMenuCredOpen);
    }

    const handlePayments = () => {
        console.log("handlePayments")
    }

    const handleReceipts = () => {
        console.log("handleReceipts")
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
            {/* style={{
                height: "100%",
                width: "100%",
                backgroundColor: "lightsteelblue"
            }}> */}

            {/* <div> */}
            <h2 style={{
                textAlign: "left",
                margin: "0px 1rem 0px 1rem"
            }}>
                Transactions</h2>
            {showAccs &&
                <Levies
                    levyAccs={levyAccs}
                    close={() => setShowAccs(false)}>
                </Levies>}
            {showBankCharges &&
                <BankCharges
                    close={() => setShowBankCharges(false)}>
                </BankCharges>}
            {showJournals &&
                <Journals
                    // levyAccs={levyAccs}
                    close={() => setShowJournals(false)}>
                </Journals>}
            {/* <CheckboxTable */}
            {/* checkAccs={(chkdArr) => setCheckedAccs(chkdArr)} */}
            {/* checkboxData={levyAccs} />} */}
            <div className='container'>
                <div className='button_grid'>
                    {/* style={{ gridTemplateColumns: "repeat(5, 120px)" }} */}

                    <button
                        className='main_buttons'
                        onClick={handleDebtors}
                        disabled={showAccs}
                    >
                        <FaFileInvoice
                            size={24} />
                        <div className="dbl_line_btn">
                            <span>DEBTORS</span>
                            <span
                                style={{ fontSize: "0.7rem" }}>
                                issue invoicess</span>
                        </div>
                    </button>
                    {isSubMenuOpen && (
                        <div className="submenu">
                            <button
                                className='submenu_btns'
                                onClick={handleLevies}>
                                LEVIES
                            </button>
                            <button
                                className='submenu_btns'
                                onClick={handleJournals}>
                                OTHER/JOURNALS
                            </button>
                            {/* Content of your submenu */}
                        </div>
                    )}
                    {isSubMenuCredOpen &&
                        <div className='submenu'>
                            <button
                                className='submenu_btns'
                                onClick={handleBankCharges}>
                                BANK CHARGES
                            </button>
                            <button
                                className='submenu_btns'
                                onClick={handleUtilities}>
                                UTILITIES
                            </button>
                            <button
                                className='submenu_btns'
                                onClick={handleInsurances}>
                                INSURANCE
                            </button>
                            <button
                                className='submenu_btns'
                                onClick={handleWages}>
                                WAGES
                            </button>
                        </div>
                    }
                    <button
                        className='main_buttons'
                        onClick={handleCreditors}>
                        <FaFileInvoice
                            size={24} />
                        <div className="dbl_line_btn">
                            <span>CREDITORS</span>
                            <span
                                style={{ fontSize: "0.7rem" }}>
                                invoices received</span>
                        </div>
                    </button>
                    <button
                        className='main_buttons'
                        onClick={handlePayments}>
                        <MdPayment
                            size={24} />
                        PAYMENTS
                    </button>
                    <button
                        className='main_buttons'
                        onClick={handleReceipts}>
                        <FaReceipt
                            size={24} />
                        RECEIPTS
                    </button>
                    <button
                        className='main_buttons'
                        onClick={handleClose}>
                        <RiArrowGoBackFill
                            size={24} />
                        Close
                    </button>
                </div>
            </div>
            {/* </div> */}
        </div >
    )
}

export default Transactions
