import React, { useState, useEffect } from 'react'
import { FaPrint } from 'react-icons/fa'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { getAllAccounts, getAllTransactions } from '../store/dexie'

const Reports = (props) => {
    const [underConstruction, setUnderConstruction] = useState(true)
    const [openLevyRpts, setOpenLevyRpts] = useState(false)
    const [openGLRpts, setOpenGLRpts] = useState(false)
    const [allAccs, setAllAccs] = useState()
    const [allTrans, setAllTrans] = useState()
    let bigArr = []
    const handleLevyReports = () => {
        if (openGLRpts) setOpenGLRpts(false)
        setOpenLevyRpts(true)
    }

    useEffect(() => {
        getAllAccounts()
            .then(accounts => {
                setAllAccs(accounts)
            })
            .catch(error => {
                console.error('Error retrieving accounts:', error);
            });
        getAllTransactions()
            .then(item => {
                setAllTrans(item)
            })
            .catch(error => {
                console.error('Error retrieving transactions:', error);
            });

        return () => {
        }
    }, [])

    const handleGLReports = () => {
        if (openLevyRpts) setOpenLevyRpts(false)
        setOpenGLRpts(true)
    }
    const handleDebtorsReports = () => {

    }
    const handleCreditorsReports = () => {

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
            <h2 style={{
                textAlign: "left",
                margin: "0px 1rem 0px 1rem"
            }}>
                Reports
            </h2>
            {openLevyRpts &&
                <div
                    className='report'>
                    Levies
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "20rem",
                            fontSize: "1rem",
                            textAlign: "left"
                        }}>
                        {allTrans.map(item => item.description)}
                    </div>
                </div>}
            {openGLRpts &&
                <div
                    className='report'
                >
                    General Ledger
                    {/* <div
            className='GL_report'
            style={{ fontWeight: "bold" }}>
            <span>date</span>
            <span>description</span> */}
                    <div
                        className='transaction_grid'
                        style={{
                            fontWeight: "bold",
                            fontSize: "1rem",
                            gridTemplateColumns: "6rem 15rem 4rem 4rem"
                        }}>
                        <span className='transaction_row_left'>date</span>
                        {/* <span className='transaction_row_left'>acc_num</span> */}
                        {/* <span className='transaction_row_left'>acc_name</span> */}
                        <span className='transaction_row_left'>description</span>
                        <span style={{ textAlign: "right" }}>Dr</span>
                        <span style={{ textAlign: "right" }}>Cr</span>
                    </div>
                    {/* <div> */}
                    {/* {allTrans.map((item, index) => {
              return (
                <div key={index}
                  className='transaction_grid'
                  style={{ fontSize: "1rem" }}
                >
                  <span className='transaction_row_left'>{item.date}</span>
                  <span className='transaction_row_left'>{item.acc_num}</span>
                  <span
                    className='transaction_row_left'>{item.acc_name}</span>
                  <span className='transaction_row_left'>{item.description}</span>
                  <span style={{ textAlign: "right" }}>{item.amount < 0 && item.amount * -1}</span>
                  <span style={{ textAlign: "right" }}>{item.amount > 0 && item.amount}</span>
                </div>)
            })} */}
                    {/* </div> */}
                    <div>
                        {allAccs.map((item) => {
                            let GLArr = allTrans.filter((transItem => transItem.acc_num === item.number))
                            let newObj = { "acc_num": item.number, "acc_name": item.name, "glarr": GLArr }

                            bigArr = [...bigArr, newObj]
                        })}

                        {bigArr.map((ba, index) => {
                            return (
                                <div
                                    key={index}>
                                    <span
                                        style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                                        {ba.acc_num} </span>
                                    <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                                        {ba.acc_name}</span>
                                    {ba.glarr.map(element => {
                                        return (<div
                                            className='transaction_grid'
                                            style={{
                                                fontSize: "1rem",
                                                gridTemplateColumns: "6rem 15rem 4rem 4rem"
                                            }}
                                        >
                                            {/* <span >{element.date}</span> */}
                                            <span >{element.description}</span>
                                            <span style={{
                                                textAlign: "right",
                                            }}>{element.amount < 0 && element.amount * -1}</span>
                                            <span style={{
                                                textAlign: "right",
                                            }}>{element.amount > 0 && element.amount}</span>
                                        </div>)
                                    })}
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            }
            <div
                style={{
                    margin: "1rem 0rem 0rem 1rem"
                }}>
                {/* className='button_grid'
          style={{ gridTemplateColumns: "repeat(5, 120px)" }}> */}

                <button
                    className='side_buttons'
                    onClick={handleLevyReports}>
                    <div
                        className='side_buttons_content'>
                        <FaPrint
                            className='side_buttons_content_icon'
                            size={24} />
                        <p
                            className='side_buttons_content_text'>
                            Levies
                        </p>
                    </div>
                </button>
                <button
                    className='side_buttons'
                    // disabled={checkedAccs?.length <= 0}
                    onClick={handleGLReports}>
                    <div
                        className='side_buttons_content'>
                        <FaPrint
                            className='side_buttons_content_icon'
                            size={24} />
                        <p
                            className='side_buttons_content_text'>
                            General Ledger
                        </p>
                    </div>
                </button>
                <button
                    className='side_buttons'
                    disabled={underConstruction}
                    onClick={handleDebtorsReports}>
                    <div
                        className='side_buttons_content'>
                        <FaPrint
                            className='side_buttons_content_icon'
                            size={24} />
                        <p className='side_buttons_content_text'>
                            Debtors
                        </p>
                    </div>
                </button>
                <button
                    className='side_buttons'
                    disabled={underConstruction}
                    onClick={handleCreditorsReports}>
                    <div
                        className='side_buttons_content'>
                        <FaPrint
                            className='side_buttons_content_icon'
                            size={24} />
                        <p className='side_buttons_content_text'>
                            Creditors
                        </p>
                    </div>
                </button>
                <button
                    className='side_buttons'
                    onClick={handleClose}>
                    <div
                        className='side_buttons_content'>
                        <RiArrowGoBackFill
                            className='side_buttons_content_icon'
                            size={24} />
                    </div>
                    <p className='side_buttons_content_text'>
                        Close</p>
                </button>
            </div>
        </div >
    )
}

export default Reports
