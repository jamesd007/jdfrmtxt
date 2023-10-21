import React, { useState } from 'react'
import accountsData from '../assets/stdaccs.json'
import { addAccount } from '../store/dexie';
import Modals from "../utils/Modals"
import AccountingSystem from '../ui/AccountingSystem'
import "../styles/nutsOfSetup.css"

const NutsOfSetup = (props) => {
    const [accounts] = useState(accountsData);
    const [formData, setFormData] = useState()
    const[checkedAccs,setCheckedAccs]=useState([])

    const handleProceed = () => {
        console.log("tedtestA checkaccs=",checkedAccs)
        checkedAccs.map(account => (
            addAccount(account)
                .then(() => {
                    props.close()
                })
                .catch(error => {
                    console.error('Error adding account:', error);
                })
        )
        )
    }

    const handleCloseModal = () => {
        props.close()
    }

    return (
        <div>
            <Modals
                title="Standard Accounts"
                mainStyle={{width:"100%"}}
                style={{maxWidth:"50rem",
                width:"90%"}}
                onClose={() => handleCloseModal()}
                footer={
                    <div>
                        <button
                            className={"button_modal"}
                            type="button"
                            onClick={handleProceed}
                        >
                            Proceed
                        </button>
                        <button
                            className={"button_modal"}
                            type="button"
                            onClick={() => { handleCloseModal() }}
                        >
                            Cancel
                        </button>
                    </div>
                }>
                    <AccountingSystem
                    checkAccs={(chkdArr) => setCheckedAccs(chkdArr)} />
                    {/* formData={(val) => setFormData(val)} /> */}
            </Modals>
        </div>
    )
}

export default NutsOfSetup