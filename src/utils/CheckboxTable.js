import React, { useEffect, useState } from 'react';
import '../styles/checkbox.css'

const CheckboxTable = ({ checkboxData, ...props }) => {
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
        <div>
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
                <tbody>
                    {checkboxData.map((item, index) => (
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
    );
};



export default CheckboxTable;
