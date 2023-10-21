import React, { useEffect, useState } from 'react';
import '../styles/checkbox.css'
import "../styles/checkbox.css"

const CheckboxTable = ({ checkboxData, ...props }) => {
    console.log("tedtestCHECKBOXTABLE checkboxdata=",checkboxData)
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
        if (selectedCheckboxes.length === checkboxData.length) {
            setSelectedCheckboxes([])
        }
        else {
            setSelectedCheckboxes(checkboxData.map((item) => item.id));
        }
    };

    useEffect(() => {
        props.checkAccs(selectedCheckboxes)
    }, [selectedCheckboxes])

    return (
        <div className="table-container">
            <table >
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
                        checked={selectedCheckboxes.length === checkboxData.length}
                        onChange={handleSelectAll}
                    />
                    Select All
                </label>
                <tbody>
                    {checkboxData.map((item, index) => (
                        <tr key={index} className="checkbox-row">
                            <input 
                                    type="checkbox"
                                    checked={selectedCheckboxes.includes(item.id)}
                                    onChange={e => handleCheckboxChange(e, item.id)} />
                                    <span className="ellipsis">{item.number}</span>
                                    <span className="ellipsis">{item.name}</span>
                                    <span className="ellipsis">{item.class}</span>
                                    <span className="ellipsis">{item.category}</span>
                                    <span className="ellipsis_right">{item.stdAmt}</span>
                            {/* <td>{item.number}</td>
                            <td>{item.name}</td>
                            <td>{item.class}</td>
                            <td>{item.category}</td>
                            <td>{item.stdAmt}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};



export default CheckboxTable;
