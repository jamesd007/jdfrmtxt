import React, { useState, useEffect } from 'react'
import { RiEdit2Fill, RiFileAddLine, RiArrowGoBackFill, RiDeleteBin5Line } from 'react-icons/ri'
import CheckboxTable from "../utils/CheckboxTable";
import Modals from '../utils/Modals'
import { FaFileImport } from 'react-icons/fa'
import '../App.css'
import { getAllCustomers } from '../store/dexie';
import CustSuppForm from '../forms/CustSuppForm'

const CustomerMaint = (props) => {
    const [allCustomers, setAllCustomers] = useState()
    const [checkedAccs, setCheckedAccs] = useState([])
    const [customerCreate, setCustomerCreate] = useState(false)
    const [customerEdit, setCustomerEdit] = useState(false)
    const [underConstruction, setUnderConstruction] = useState(true)
    const [dbChange, setDbChange] = useState(false)


    useEffect(() => {
        getAllCustomers()
            .then(accounts => {
                setAllCustomers(accounts)
            })
            .catch(error => {
                console.error('Error retrieving customers:', error);
            });
        setDbChange(false)
        return () => {
        }
    }, [customerCreate, dbChange])

    const handleCreate = () => {
        setCustomerCreate(true)
    }
    const handleEdit = () => {
        setCustomerEdit(true)
    }
    const handleDelete = () => {
        window.alert('This module not yet available')
        console.log("delete")
    }
    const handleImport = () => {
        console.log("import")
    }
    const handleSetUp = () => {

    }
    const handleClose = () => {
        props.close()
    }
    const handleCloseModal = () => {
        setCustomerCreate(false)
        setCustomerEdit(false)
    }

    const containerStyle = {
        gridTemplateColumns: "repeat(6, 8.2rem)",
        '@media (maxWidth: 1100px)': {
            gridTemplateColumns: "repeat(4, 8.2rem)",
            backgroundColor: "red"
        },
    };

    return (
        <div
            className='work_container'
            style={{
                // height: "100%",
                // width: "100%",
                backgroundColor: "lightgray"
            }}>
            {/* style={{
                height: "100%",
                width: "100%",
                backgroundColor: "lightgray"
            }}> */}
            {(customerCreate || customerEdit) && (
                <Modals
                    title={(props.edit && checkedAccs && allCustomers[checkedAccs[0] - 1]) ? "Edit Customer" : "Create Customer"}
                    onClose={() => handleCloseModal()}
                    footer={
                        <div>
                        </div>
                    }>
                    <CustSuppForm
                        edit={customerEdit && allCustomers[checkedAccs[0] - 1]}
                        customer={true}
                        dbChange={(val) => setDbChange(val)}
                        close={() => handleCloseModal()}
                    >
                    </CustSuppForm>
                </Modals>
            )}
            <div style={{ height: "100&" }}>
                <h2 style={{
                    textAlign: "left",
                    marginLeft: "1rem",
                    marginTop: "0px"
                }}>
                    Customer Maintenance</h2>
            </div>
            {allCustomers &&
                <CheckboxTable
                    checkAccs={(chkdArr) => setCheckedAccs(chkdArr)}
                    checkboxData={allCustomers} />}
            <div className='container'>
                <div className='button_grid'
                    style={containerStyle}>
                    <button
                        className='main_buttons'
                        onClick={handleCreate}>
                        <RiFileAddLine
                            size={24} />
                        Create
                    </button>
                    <button
                        className='main_buttons'
                        disabled={checkedAccs?.length <= 0}
                        onClick={handleEdit}>
                        <RiEdit2Fill
                            size={24} />
                        Edit
                    </button>
                    <button
                        className='main_buttons'
                        disabled={underConstruction}
                        onClick={handleDelete}>
                        <RiDeleteBin5Line
                            size={24} />
                        Delete
                    </button>
                    <button
                        className='main_buttons'
                        disabled={underConstruction}
                        onClick={handleImport}>
                        <FaFileImport
                            size={24} />
                        Import
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
        </div>
    )
}

export default CustomerMaint
