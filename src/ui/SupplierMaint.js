import React, { useState, useEffect } from 'react'
import { RiEdit2Fill, RiFileAddLine, RiArrowGoBackFill, RiDeleteBin5Line } from 'react-icons/ri'
import CheckboxTable from "../utils/CheckboxTable";
import Modals from '../utils/Modals'
import { FaFileImport } from 'react-icons/fa'
import '../App.css'
import { getAllSuppliers } from '../store/dexie';
import CustSuppForm from '../forms/CustSuppForm'

const SupplierMaint = (props) => {
    const [allSuppliers, setAllSuppliers] = useState()
    const [checkedAccs, setCheckedAccs] = useState([])
    const [supplierCreate, setSupplierCreate] = useState(false)
    const [supplierEdit, setSupplierEdit] = useState(false)
    const [underConstruction, setUnderConstruction] = useState(true)
    const [dbChange, setDbChange] = useState(false)

    useEffect(() => {
        getAllSuppliers()
            .then(accounts => {
                setAllSuppliers(accounts)
            })
            .catch(error => {
                console.error('Error retrieving suppliers:', error);
            });
        setDbChange(false)
        return () => {
        }
    }, [supplierCreate, dbChange])

    const handleCreate = () => {
        setSupplierCreate(true)
    }
    const handleEdit = () => {
        setSupplierEdit(true)
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
        setSupplierCreate(false)
        setSupplierEdit(false)
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
            {(supplierCreate || supplierEdit) && (
                <Modals
                    title={(props.edit && checkedAccs && allSuppliers[checkedAccs[0] - 1]) ? "Edit Supplier" : "Create Supplier"}
                    onClose={() => handleCloseModal()}
                    footer={
                        <div>
                        </div>
                    }>
                    <CustSuppForm
                        edit={supplierEdit && allSuppliers[checkedAccs[0] - 1]}
                        customer={false}
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
                    Supplier Maintenance</h2>
            </div>
            {allSuppliers &&
                <CheckboxTable
                    checkAccs={(chkdArr) => setCheckedAccs(chkdArr)}
                    checkboxData={allSuppliers} />}
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

export default SupplierMaint
