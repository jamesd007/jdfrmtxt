import React, { useState, useEffect } from 'react'
import '../App.css'
import { FaFileImport } from 'react-icons/fa'
import { MdAccountBalanceWallet } from 'react-icons/md'
import { RiEdit2Fill, RiFileAddLine, RiArrowGoBackFill, RiDeleteBin5Line } from 'react-icons/ri'
import AccountForm from '../forms/AccountForm'
import { deleteAccount, getAllAccounts, getAllTransactions } from '../store/dexie';
import CheckboxTable from '../utils/CheckboxTable';
import Modals from '../utils/Modals'
import NutsofSetup from '../utils/NutsOfSetup'

const AccMaint = (props) => {

    const [accCreate, setAccCreate] = useState(false)
    const [allAccs, setAllAccs] = useState()
    const [allTrans, setAllTrans] = useState()
    const [accEdit, setAccEdit] = useState(false)
    const [checkedAccs, setCheckedAccs] = useState([])
    const [underConstruction, setUnderConstruction] = useState(true)
    const [dbChange, setDbChange] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [stdAccs, setStdAccs] = useState(false)

    useEffect(() => {
        getAllAccounts()
            .then(accounts => {
                setAllAccs(accounts)
            })
            .catch(error => {
                console.error('Error retrieving accounts:', error);
            });
        setDbChange(false)
        return () => {
        }
    }, [accCreate, dbChange])

    useEffect(() => {
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
    
    const handleCreate = () => {
        setAccCreate(true)
    }
    const handleEdit = () => {
        setAccEdit(true)
    }
    const hanldeCloseDelModal = () => {
        setDeleteConfirm(false)
    }
    const deleteSelectedAccounts = async () => {
        for (let i = 0; i < allAccs?.length; i++) {
            if (checkedAccs.includes(allAccs[i].id)) {
                const theAccNum = allAccs[i].number;
                const accountIdsSet = allTrans.map(trans => trans.acc_num);

                try {
                    if (!accountIdsSet.includes(theAccNum.toString())) {
                        await deleteAccount(allAccs[i].id); // Assuming deleteAccount is an asynchronous function
                    }
                    setDbChange(true);
                    hanldeCloseDelModal()
                } catch (error) {
                    console.error('Error deleting accounts:', error);
                }
            }
        }
    }

    const handleProceed = () => {
        deleteSelectedAccounts()
    }
    const handleDelete = () => {
        setDeleteConfirm(true)
    }

    const handleImport = () => {
    }
    const handleSetup = () => {
        setStdAccs(true)
    }
    const handleClose = () => {
        props.close()
    }
    const handleCloseModal = () => {
        setAccCreate(false)
        setAccEdit(false)
    }

    return (
        <div
            className='work_container'
            style={{
                backgroundColor: "lightgray"
            }}>
            {(accCreate || accEdit) && (
                <Modals
                    title={allAccs[checkedAccs[0] - 1] ? "Edit Account" : "Create Account"}
                    onClose={() => handleCloseModal()}
                    footer={
                        <div>
                        </div>
                    }>
                    <AccountForm
                        edit={accEdit && allAccs[checkedAccs[0] - 1]}
                        dbChange={(val) => setDbChange(val)}
                        allAccs={allAccs}
                        close={() => handleCloseModal()}
                    >
                    </AccountForm>
                </Modals>
            )}
            {deleteConfirm &&
                <Modals
                    title="Delete"
                    noBckgrnd={true}
                    onClose={() => hanldeCloseDelModal()}
                    footer={
                        <div>
                            <button
                                className={"UI-button-service"}
                                type="button"
                                onClick={handleProceed}
                            >
                                Proceed
                            </button>
                            <button
                                className={"UI-button-service"}
                                type="button"
                                onClick={() => { hanldeCloseDelModal() }}
                            >
                                Cancel
                            </button>
                        </div>
                    }>
                    <div className='delete_table'>
                        {/* {<p>The following accounts will be deleted:</p> */}
                        <div
                            className="delete-grid-row"
                            style={{ fontWeight: "bold" }}>
                            {/* style={{ display: "grid", gridTemplateColumns: "repeat(3 8rem)" }} */}
                            <span>ID</span>
                            <span>Nmber</span>
                            <span>Name</span>
                            <span>Comments</span>
                        </div>
                        {allAccs.map(item => {
                            // {item.id}
                            if (checkedAccs.includes(item.id)) {
                                let theAccNum = item.number
                                const accountIdsSet = allTrans.map(trans => trans.acc_num);
                                // if (accountIdsSet.includes(theAccNum.toString())) {
                                return <div >
                                    <div className="delete-grid-row"
                                        key={item.id}>
                                        <span classname="transaction_row_left">{item.id}</span>
                                        <span classname="transaction_row_left">{item.number}</span>
                                        <span classname="transaction_row_left">{item.name}</span>
                                        <span classname="transaction_row_left"
                                            style={
                                                accountIdsSet.includes(theAccNum.toString())
                                                    ? {}
                                                    : { display: "none" }
                                            }>Cannot delete - account contains transactions
                                        </span>
                                    </div>
                                </div>
                            }
                        }
                        )}
                    </div>
                </Modals>
            }
            <div
                style={{ height: "100&" }}>
                <h2 style={{
                    textAlign: "left",
                    marginLeft: "1rem",
                    marginTop: "0px"
                }}>
                    Account Maintenance</h2>
                {allAccs?.length>0
                ?<CheckboxTable
                        checkAccs={(chkdArr) => setCheckedAccs(chkdArr)}
                        checkboxData={allAccs}/>
                        : <p>No records found</p>
                }
                {stdAccs && <NutsofSetup
                    close={() => setStdAccs(false)} />
                }
                <div className='container'>
                    <div className='button_grid'>
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
                            disabled={checkedAccs?.length <= 0}
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
                            disabled={allAccs?.length > 0}
                            onClick={handleSetup}>
                            <MdAccountBalanceWallet
                                className='side_buttons_content_icon'
                                size={24} />
                            Standard set of accounts
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
        </div >
    )
}

export default AccMaint
