import React, { useState, useEffect } from 'react'
import CheckboxTable from "../utils/CheckboxTable";
import { BsFillHouseCheckFill, BsFillHouseExclamationFill } from 'react-icons/bs'
import { FaBriefcase, FaFileInvoice, FaNetworkWired, FaRegFileAlt } from 'react-icons/fa'
import { IoDocumentsOutline } from 'react-icons/io5'
import { RiEdit2Fill, RiArrowGoBackFill } from 'react-icons/ri'
import { updateAccount, getAllAccounts } from '../store/dexie';
import { addTransaction } from '../store/dexie';
import '../App.css'
import Modals from '../utils/Modals'
import "../styles/modals.css"
import { getMonthName } from '../utils/UtilsGeneral';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Levies = (props) => {
    const [checkedAccs, setCheckedAccs] = useState([])
    const [getStdAmt, setGetStdAmt] = useState()
    const [stdAmount, setStdAmount] = useState()
    const [popupPosition, setPopupPosition] = useState()
    const [confirmModal, setConfirmModal] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [transactionArr, setTransactionArr] = useState([])
    const [transactionsUpdated, setTransactionsUpdated] = useState(false)
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Adding 1 because month is 0-based
    const day = today.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleSetRateAll = (e) => {
        if (checkedAccs.length <= 0) {
            window.alert('No accounts are selected');
        }
        else
            setGetStdAmt(true)
    }

    const handleChange = (event) => {
        setStdAmount(event.target.value)
    }

    const handleSetStdAmount = () => {
        //item is the index of checked accounts
        let index = -1
        props.levyAccs.map(item => {
            index++
            if (checkedAccs.includes(item.id)) {
                item.stdAmt = stdAmount
            }
            updateAccount(item.id, item);
            return {}
        })
        setGetStdAmt(false)
    }

    const handleSetRateSpecial = () => {

    }
    const handleEdit = () => {

    }
    const handleInvoice = () => {
        window.alert(`for now use post to ledger\nI need to decide how to do this\ncos you shouldn't invoice without posting to ledger\nalthough some acc packages let you`);
    }
    const handleStatements = () => {

    }
    const handleAgeAnalysis = () => {

    }

    async function contraAccountExists() {
        const existingAccounts = await getAllAccounts();
        let contraAcc = existingAccounts.filter(account =>
            account.category.toLowerCase() === "levies-contra")
        if (contraAcc) return contraAcc[0]
        else return undefined
        // return existingAccounts.some(account => 
        //     account.category.toLowerCase() === "levies-contra");
    }

    const handlePost = async () => {
        if (checkedAccs.length <= 0) {
            window.alert('No accounts are selected');
        }
        else {
            try {
                const exists = await contraAccountExists(); // Await the result of the async function
                if (exists && exists !== undefined) {
                    //item is the index of checked accounts
                    let index = -1
                    let thisArr = []
                    let floatValue
                    props.levyAccs.map(item => {
                        index++
                        if (checkedAccs.includes(item.id)) {
                            floatValue = parseFloat(props.levyAccs[index].stdAmt);
                            // let contra={id:exists.id,amount:stdAmt,date:}
                            // ++id,account_id,amount,date,balance
                            // item.stdAmt = stdAmount

                            thisArr = [...thisArr, {
                                date: selectedDate || formattedDate, acc_num: props.levyAccs[index].number, acc_name: props.levyAccs[index].name,
                                description: "LEVIES " + getMonthName(month) + year, amount: -floatValue
                            }, {
                                date: selectedDate || formattedDate, acc_num: exists.number, acc_name: exists.name,
                                description: "LEVIES " + props.levyAccs[index].name + getMonthName(month) + year, amount: floatValue
                            }]

                        }
                        setTransactionArr(thisArr)
                        setTransactionsUpdated(true)

                        //place popup/modal with transactions, ask to proceed
                        // const userConfirmed = window.confirm('No contra account found\nThe system can create a new contra account for you\nDo you want to proceed?');
                        // updateAccount(item.id, item);
                        return {}
                    })
                } else {
                    window.alert('No contra account (levies-CONTRA) exists, please create the account');
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
        //check for contra account
        //contra account should have a category levies-CONTRA

        // if (contraAccountExists) {
        //     console.log("tedtestB it exists whoopee")
        //     checkedAccs.map(item => {
        //         console.log("tedtestb item=", item)
        //     }
        //     )
        // }
        // else {
        //     console.log("tedtestB it does not exist :(")
        //     window.alert('No contra account (levies-CONTRA) exists please create account')
        // }
        // addTransaction(formData)
        // .then(() => {
        //   props.close()
        // })
        // .catch(error => {
        //   console.error('Error adding account:', error);
        // });
    }

    const handleClose = () => {
        props.close()
    }

    useEffect(() => {
        if (transactionsUpdated) setConfirmModal(true)
        return () => {

        }
    }, [transactionsUpdated])

    useEffect(() => {
        if (confirm) {
            transactionArr.map((item) => {
                addTransaction(item);
            })
        }
        return () => { }
    }, [confirm])


    return (
        <div
            className='levies_container'
            style={{ backgroundColor: " rgb(199, 221, 249)" }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                <h3
                    style={{
                        margin: "0px 0px 0px 1rem",
                        alignSelf: "start"
                    }}>
                    LEVIES
                </h3>
                {/* <span
                    style={{ fontSize: "1.2rem" }}>
                    <span>Date: </span>
                    <span>{formattedDate}</span>
                </span> */}
                <div style={{
                    display: "flex", flexDirection: "row",
                    fontSize: "1rem",
                    alignItems: "center"
                }}>
                    <p>Transaction Date-</p>
                    <DatePicker
                        // className="custom-date-picker"
                        // style={{ width: "fit-content" }}
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        dateFormat="dd/MM/yyyy"
                        wrapperClassName="custom-date-picker" // Apply your custom wrapper class name
                        className="custom-input" // Apply your custom input class name
                    />
                    {/* {selectedDate !== null && (
                        <p>
                            Selected date: {selectedDate.toLocaleDateString()}
                        </p>
                    )} */}
                    {/* {selectedDate && <p>Selected date: {selectedDate.toDateString()}</p>} */}
                </div>
                {/* how to calculate the month?
                    last month posted:
                    check the last month on GL
                    these transactions will be for  */}
            </div>
            {confirmModal && transactionsUpdated &&
                <Modals
                    title="Confirm Post"
                    onClose={() => handleClose()}
                    footer={
                        <div>
                            <button
                                className={"UI-button-service"}
                                type="button"
                                onClick={() => {
                                    setConfirm(true)
                                    setConfirmModal(false)
                                    setTransactionsUpdated(false)
                                }}
                            >
                                Proceed
                            </button>
                            <button
                                className={"UI-button-service"}
                                type="button"
                                onClick={() => {
                                    setConfirm(false)
                                    setConfirmModal(false)
                                    setTransactionsUpdated(false)
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    }
                >
                    <div
                        className='transaction_grid'
                        style={{ fontWeight: "bold" }}>
                        <span className='transaction_row_left'>date</span>
                        <span className='transaction_row_left'>acc_num</span>
                        <span className='transaction_row_left'>acc_name</span>
                        <span className='transaction_row_left'>description</span>
                        <span style={{ textAlign: "right" }}>Dr</span>
                        <span style={{ textAlign: "right" }}>Cr</span>
                    </div>
                    {transactionArr.map((item, index) => {
                        return (
                            <div key={index}
                                className='transaction_grid'
                            >
                                <span className='transaction_row_left'>{item.date.toLocaleDateString()}</span>
                                <span className='transaction_row_left'>{item.acc_num}</span>
                                <span
                                    className='transaction_row_left'>{item.acc_name}</span>
                                <span className='transaction_row_left'>{item.description}</span>
                                <span style={{ textAlign: "right" }}>{item.amount < 0 && item.amount * -1}</span>
                                <span style={{ textAlign: "right" }}>{item.amount > 0 && item.amount}</span>
                            </div>)
                    })}
                    {/* display transactions here testing long line of tests display transactions here testing long line of tests */}

                </Modals>
            }
            {
                getStdAmt &&
                <Modals
                    title="Set Rate"
                    onClose={() => setGetStdAmt(false)}
                    footer={
                        <div>
                            <button
                                style={{
                                    alignSelf: "flex-end",
                                    margin: "0.5rem",
                                    width: "fit-content",
                                    backgroundColor: "lightgray",
                                    color: "black",
                                    border: "1px solid black",
                                    borderRadius: "0.5rem",
                                    padding: "0.3rem"
                                }}
                                onClick={handleSetStdAmount}>
                                submit
                            </button>
                            <button
                                style={{
                                    alignSelf: "flex-end",
                                    margin: "0.5rem",
                                    width: "fit-content",
                                    backgroundColor: "lightgray",
                                    color: "black",
                                    border: "1px solid black",
                                    borderRadius: "0.5rem",
                                    padding: "0.3rem"
                                }}
                                onClick={handleSetStdAmount}>
                                cancel
                            </button>
                        </div>
                    }>
                    <div
                        className="levy_sub_menu"
                    // style={{
                    //     left: `${popupPosition.x}px`,
                    //     top: `${popupPosition.y - 300}px`
                    // }}
                    >
                        <label>
                            Enter New Levy
                        </label>
                        <input
                            style={{
                                margin: "0.5rem"
                            }}
                            type="text"
                            name="stdAmt"
                            value={stdAmount}
                            onChange={handleChange}
                            placeholder="Enter amount">
                        </input>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row"
                            }}>
                            {/* <button
                                style={{
                                    alignSelf: "flex-end",
                                    margin: "0.5rem",
                                    width: "fit-content",
                                    backgroundColor: "lightgray",
                                    color: "black",
                                    border: "1px solid black",
                                    borderRadius: "0.5rem",
                                    padding: "0.3rem"
                                }}
                                onClick={handleSetStdAmount}>
                                submit
                            </button>
                            <button
                                style={{
                                    alignSelf: "flex-end",
                                    margin: "0.5rem",
                                    width: "fit-content",
                                    backgroundColor: "lightgray",
                                    color: "black",
                                    border: "1px solid black",
                                    borderRadius: "0.5rem",
                                    padding: "0.3rem"
                                }}
                                onClick={handleSetStdAmount}>
                                cancel
                            </button> */}
                        </div>
                    </div>
                </Modals>
                // <div
                //     className="levy_sub_menu"
                //     style={{
                //         left: `${popupPosition.x}px`,
                //         top: `${popupPosition.y - 300}px`
                //     }}
                // >
                //     <label>
                //         Enter New Levy
                //     </label>
                //     <input
                //         style={{
                //             margin: "0.5rem"
                //         }}
                //         type="text"
                //         name="stdAmt"
                //         value={stdAmount}
                //         onChange={handleChange}
                //         placeholder="Enter amount">
                //     </input>
                //     <div
                //         style={{
                //             display: "flex",
                //             flexDirection: "row"
                //         }}>
                //         <button
                //             style={{
                //                 alignSelf: "flex-end",
                //                 margin: "0.5rem",
                //                 width: "fit-content",
                //                 backgroundColor: "lightgray",
                //                 color: "black",
                //                 border: "1px solid black",
                //                 borderRadius: "0.5rem",
                //                 padding: "0.3rem"
                //             }}
                //             onClick={handleSetStdAmount}>
                //             submit
                //         </button>
                //         <button
                //             style={{
                //                 alignSelf: "flex-end",
                //                 margin: "0.5rem",
                //                 width: "fit-content",
                //                 backgroundColor: "lightgray",
                //                 color: "black",
                //                 border: "1px solid black",
                //                 borderRadius: "0.5rem",
                //                 padding: "0.3rem"
                //             }}
                //             onClick={handleSetStdAmount}>
                //             cancel
                //         </button>
                //     </div>
                // </div>
            }
            <CheckboxTable
                checkAccs={(chkdArr) => setCheckedAccs(chkdArr)}
                checkboxData={props.levyAccs} />
            {/* </div> */}
            <div className='container_levies'>
                <div className='button_grid_secondary'
                    style={{ gridTemplateColumns: "repeat(5, 7rem)" }}>
                    <button
                        className='secondary_buttons'
                        onClick={handleSetRateAll}>
                        <BsFillHouseCheckFill
                            size={22} />
                        SET RATE
                    </button>
                    <button
                        className='secondary_buttons'
                        onClick={handleSetRateSpecial}>
                        <BsFillHouseExclamationFill
                            size={28} />
                        SPECIAL LEVIES
                    </button>
                    <button
                        className='secondary_buttons'
                        disabled={checkedAccs?.length <= 0}
                        onClick={handleEdit}>
                        <RiEdit2Fill
                            size={24} />
                        Edit
                    </button>
                    <button
                        className='secondary_buttons'
                        onClick={handleInvoice}>
                        <FaFileInvoice
                            size={20} />
                        INVOICE
                    </button>
                    <button
                        className='secondary_buttons'
                        onClick={handleStatements}>
                        <IoDocumentsOutline
                            size={20} />
                        Statements
                    </button>
                    <button
                        className='secondary_buttons'
                        onClick={handleAgeAnalysis}>
                        <FaRegFileAlt
                            size={20} />
                        Age Analysis
                    </button>
                    <button
                        className='secondary_buttons'
                        onClick={handlePost}>
                        <FaBriefcase
                            size={28} />
                        POST TO LEDGER
                    </button>
                    <button
                        className='secondary_buttons'
                        onClick={handleClose}>
                        <RiArrowGoBackFill
                            size={20} />
                        Close
                    </button>
                </div>
            </div>
        </div >
    )
}

export default Levies
