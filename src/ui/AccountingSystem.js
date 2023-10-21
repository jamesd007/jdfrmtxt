import React, { useEffect, useState } from 'react'
import accountsData from '../assets/stdaccs.json';
import "../styles/checkbox.css"

function AccountingSystem(props) {
    const [accounts] = useState(accountsData);
const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

const handleCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    if (isChecked) {
    setSelectedCheckboxes(prevState => [...prevState, id]);
    } else {
    setSelectedCheckboxes(prevState =>
    prevState.filter(item => item !== id)
    );
    }
};
    
const handleSelectAll = () => {
    if (selectedCheckboxes.length === accountsData.length) {
    setSelectedCheckboxes([])
    }
    else {
    setSelectedCheckboxes(accounts.map((item) => item.id));
    }
};

useEffect(() => {
    let selectedAccounts=[]
    for (let i=0;i<selectedCheckboxes?.length;i++)
    selectedAccounts.push(accounts[i])
    props.checkAccs(selectedAccounts)
}, [selectedCheckboxes])

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr className='header-row'>
                        <th></th>
                        <th>Number</th>
                        <th>Account Name</th>
                        <th>Class</th>
                        <th>Category</th>
                        <th
                        className='tooltip'
                        data-tooltip="Tooltip for Standard Amount">Std Amt</th>
                    </tr>
                </thead>
                 <label
                    className="checkbox-row">
                    <input
                        type="checkbox"
                        checked={selectedCheckboxes.length === accounts.length}
                        onChange={handleSelectAll}
                    />
                        Select All
                    </label>
                    <tbody >
                        {accounts.map(item => (
                            < div key={item.id} className="checkbox-row">
                                <input 
                                    type="checkbox"
                                    checked={selectedCheckboxes.includes(item.id)}
                                    onChange={e => handleCheckboxChange(e, item.id)} />
                                    <span className="ellipsis">{item.number}</span>
                                    <span className="ellipsis">{item.name}</span>
                                    <span className="ellipsis">{item.class}</span>
                                    <span className="ellipsis">{item.category}</span>
                                    <span className="ellipsis_right">{item.stdAmt}</span>
                            </div>
                        ))}
                    </tbody>
            </table>
        </div>
        // <div>
        //   <p style={{ textAlign: "left" }}>
        //     The follwoing accounts will be added to your chart of accounts.
        //     None of your existing accounts will be deleted although
        //     checks will be performed to see if there are account number conflicts.
        //     If a conflict is discovered no new account will be added
        //     and your existing account will remian.
        //     A list of conflicts will show on screen.
        //   </p>
    );
}

export default AccountingSystem
