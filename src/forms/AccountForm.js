import React, { useState, useRef, useEffect } from 'react';
import "../App.css"
import { addAccount, getAllAccounts, updateAccount } from '../store/dexie';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const AccountForm = (props) => {
    const inputRef = useRef(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [formData, setFormData] = useState({
        number: props.edit ? props.edit.number : '',
        name: props.edit ? props.edit.name : '',
        class: props.edit ? props.edit.class : 'expenses',
        category: props.edit ? props.edit.category : 'levies',
        stdAmt: props.edit ? props.edit.stdAmt : "",
        contra: props.edit ? props.edit.contra : ""
        // contra:props.edit?props.edit.contra:""
    });

    useEffect(() => {
        // Set focus when the component mounts
        inputRef.current.focus();
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // const getPossContras=(thisAcc)=>{
    // const existingAccounts = await getAllAccounts()
    // let possContras=existingAccounts.filter(item=>item.balance!==thisAcc)
    // }

    async function accountNumberExists(accountNumber) {
        const existingAccounts = await getAllAccounts();
        return existingAccounts.some(account => account.number === accountNumber);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // let success = false
        if (!props.edit) {
            accountNumberExists(formData.number)
                .then(exists => {
                    if (exists) {
                        window.alert('An account with this number already exists.');
                    } else {
                        addAccount(formData)
                            .then(() => {
                                props.dbChange(true)
                                props.close()
                            })
                            .catch(error => {
                                console.error('Error adding account:', error);
                            });
                        //MAYBE/MAYBENOT check if this acc is first in the category
                        //if it is tell user they need to set up a contra account for that category
                        //allow user to auto setup contra.
                        // if (checkIfFirstInCat(formData)){
                        // const userConfirmed = window.confirm('No contra account found\nThe system can create a new contra account for you\nDo you want to proceed?');
                        // if (userConfirmed){
                        // let contraDetails={
                        // name: formData.category,
                        // number: props.edit ? props.edit.number : '',
                        // category: category,
                        // stdAmt: "",
                        // balance:formData.balance==="debit"?"credit":"debit"
                        // }
                        // addAccount(formData)
                        // .then(() => {
                        // props.close()
                        // })
                        // .catch(error => {
                        // console.error('Error adding account:', error);
                        // });
                        // }
                        // }
                    }
                })
                .catch(error => {
                    console.error('Error checking account number:', error);
                });
        }
        else {
            updateAccount(props.edit.id, formData);
            props.dbChange(true)
            props.close()
        }
    };

    const handleSelectChange = (option) => {
        setSelectedOption(option);
    };

    const handleClose = () => {
        props.close()
    }

    const handleInput = (e) => {

    }
    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        // console.log("tedtestTT string,results=", string, results)
    }

    const handleOnHover = (result) => {
        // the item hovered
        // console.log("tedtestTT resulkt=", result)
    }

    const handleOnSelect = (item) => {
        // the item selected
        // console.log("tedtestTT item=", item)
    }

    const handleOnFocus = () => {
    }

    const formatResult = (item) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>
                <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
            </>
        )
    }


    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                margin: "1rem 0rem 0rem 1rem"
            }}
        >
            <form onSubmit={handleSubmit}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                    }}>
                    <label
                        style={{
                            width: "15rem",
                            textAlign: "right",
                            marginRight: "0.5rem"
                        }}>
                        Number/Code:</label>
                    <input
                        ref={inputRef}
                        type="text"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                    }}>
                    <label
                        style={{
                            width: "15rem",
                            textAlign: "right",
                            marginRight: "0.5rem"
                        }}>
                        Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                    }}>
                    <label
                        style={{
                            width: "15rem",
                            textAlign: "right",
                            marginRight: "0.5rem"
                        }}>
                        Class:</label>
                    <select
                        style={{
                            fontSize: "1rem",
                            width: "10rem",
                            textAlign: "left"
                        }}
                        name="class"
                        value={formData.class}
                        onChange={handleChange}
                    >
                        <option value="asset">asset</option>
                        <option value="liability">liabilty</option>
                        <option value="income">income</option>
                        <option value="expense">expense</option>
                    </select>
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                    }}>
                    <label
                        style={{
                            width: "15rem",
                            textAlign: "right",
                            marginRight: "0.5rem"
                        }}>
                        Category:</label>
                    <select
                        style={{
                            fontSize: "1rem",
                            width: "15rem",
                            textAlign: "left"
                        }}
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="levies">Levies</option>
                        {/* <option value="levies-contra">Levies contra</option> */}
                        <option value="managementFees">Management Fees</option>
                        <option value="bank charges">Bank Charges</option>
                        <option value="utilities">Utilities</option>
                        <option value="insurances">Insurances</option>
                        <option value="salariesAndWages">Salaries and Wages</option>
                        <option value="general">General</option>
                    </select>
                </div>
                <div
                    style={formData.category === "levies" ? {
                        display: "flex",
                        flexDirection: "row",
                    } : { display: "none" }}>
                    <label
                        style={{
                            width: "15rem",
                            textAlign: "right",
                            marginRight: "0.5rem"
                        }}>
                        Standard amount:</label>
                    <input
                        type="text"
                        name="stdAmt"
                        value={formData.stdAmt}
                        onChange={handleChange}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                    }}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                        }}>
                        <label
                            style={{
                                width: "15rem",
                                textAlign: "right",
                                marginRight: "0.5rem"
                            }}>
                            Contra-account:</label>
                        <ReactSearchAutocomplete
                            items={props.allAccs}
                            onSearch={handleOnSearch}
                            onHover={handleOnHover}
                            onSelect={handleOnSelect}
                            onFocus={handleOnFocus}
                            autoFocus
                            formatResult={formatResult}
                        />
                        {/* <input
type="text"
name="contra"
placeholder='type to begin seacrh'
value={formData.contra}
onChange={(e) => {
handleInput(e);
}}
/> */}
                    </div>
                    {/* <label
style={{
width: "15rem",
textAlign: "right",
marginRight: "0.5rem"
}}> */}
                    {/* Normal Balance:</label> */}
                    {/* <select
style={{
fontSize: "1rem",
width: "5rem",
textAlign: "left"
}}
name="balance"
value={formData.balance}
onChange={handleChange}
>
<option value="debit">Debit</option>
<option value="credit">Credit</option>
</select> */}
                </div>
                {/* <div
style={{
display: "flex",
flexDirection: "row",
}}>
<label
style={{
width: "15rem",
textAlign: "right",
marginRight: "0.5rem"
}}>
Contra account:</label>
<select
style={{
fontSize: "1rem",
width: "5rem",
textAlign: "left"
}}
name="contra"
value={formData.contra}
onChange={handleChange}
>
<option value="debit">Debit</option>
<option value="credit">Credit</option>
</select>
</div> */}
                <div className='button_grid'
                    style={{
                        marginTop: "1rem",
                        // gridTemplateColumns: "repeat(2,8rem)"
                    }}>
                    <button
                        className="form_buttons"
                        disabled={formData.name?.length <= 0 || formData.number?.length <= 0}
                        type="submit">
                        Submit
                    </button>
                    <button
                        type="button"
                        className="form_buttons"
                        onClick={handleClose}>
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AccountForm;
