import React, { useState } from 'react'
import accountsData from '../assets/stdaccs.json';
import "../App.css"

function AccountingSystem() {
    const [accounts] = useState(accountsData);

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Account Name</th>
                        <th>Class</th>
                        <th>Category</th>
                        <th>Standard Amount</th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {accounts.map((item, index) => (
                        <tr key={index}>
                            <td>{item.number}</td>
                            <td>{item.name}</td>
                            <td>{item.class}</td>
                            <td>{item.category}</td>
                            <td>{item.stdAmt}</td>
                        </tr>
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
        //   <div className="grid-container"
        //     style={{
        //       gridTemplateColumns: "5rem 14rem 7rem 10rem 5rem"
        //     }}>
        //     <div className="grid-header">Number</div>
        //     <div className="grid-header">Account name</div>
        //     <div className="grid-header">Class</div>
        //     <div className="grid-header">Category</div>
        //     <div className="grid-header">Standard amount</div>
        //     <div>
        //       {accounts.map(account => (
        //         <div key={account.number}
        //           className="grid-container"
        //           style={{
        //             gridTemplateColumns: "5rem 14rem 7rem 10rem 5rem"
        //           }}
        //         >
        //           <div className='transaction_row_left'
        //             style={{ width: "fit-content" }}
        //           >{account.number}</div>
        //           <div
        //             className='transaction_row_left'
        //             style={{ width: "fit-content" }}>{account.name}</div>
        //           <div
        //             className='transaction_row_left'
        //             style={{ width: "fit-content" }}>{account.class}</div>
        //           <div
        //             className='transaction_row_left'
        //             style={{ width: "fit-content" }}>{account.category}</div>
        //           <div
        //             className='transaction_row_left'
        //             style={{ width: "fit-content" }}>{account.stdAmt}</div>
        //         </div>
        //       ))}
        //     </div>
        //   </div>
        // </div>
    );
}

export default AccountingSystem
