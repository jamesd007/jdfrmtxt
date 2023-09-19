import React, { useState } from 'react'
import accountsData from '../assets/stdaccs.json'
import { addAccount } from '../store/dexie';
import Modals from "../utils/Modals"
import AccountingSystem from '../ui/AccountingSystem'

const NutsOfSetup = (props) => {
    const [accounts] = useState(accountsData);
    const [formData, setFormData] = useState()

    const handleProceed = () => {
        accounts.map(account => (
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
        <div>NutsofSetup
            <Modals
                title="Standard Accounts"
                onClose={() => handleCloseModal()}
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
                            onClick={() => { handleCloseModal() }}
                        >
                            Cancel
                        </button>
                    </div>
                }>
                <div>
                    <AccountingSystem />
                    {/* formData={(val) => setFormData(val)} /> */}
                </div>
            </Modals>
        </div>
    )
}

export default NutsOfSetup