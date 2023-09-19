import React, { useState, useEffect, useRef } from 'react'
import '../styles/company.css'
import db from '../store/dexie'
import { useCompany, useCompanyUpdate } from '../contexts/CompanyContext'

const CompanyForm = (props) => {
    const [companyName, setCompanyName] = useState('');
    const [companyType, setCompanyType] = useState('');
    const [companyRegNo, setCompanyRegNo] = useState('');
    const [addressPhysical, setAddressPhysical] = useState('')
    const [addressPostal, setAddressPostal] = useState('')
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [website, setWebsite] = useState('');
    const [taxNo, setTaxNo] = useState('');
    const [VATNo, setVATNo] = useState('');
    const inputRef = useRef(null);
    const currentCompany = useCompany()
    const currentCompanyChange = useCompanyUpdate()


    useEffect(() => {
        // Set focus when the component mounts
        inputRef.current.focus();
    }, [])

    useEffect(() => {
        const updateCoDetails = async () => {
            if (!companyName) {
                alert('Please fill in all fields');
                return;
            }
            try {
                // Save the company's details to the Dexie database
                const newCompany = {
                    companyName,
                    companyType,
                    companyRegNo,
                    addressPhysical,
                    addressPostal,
                    email,
                    telephone,
                    website,
                    taxNo,
                    VATNo
                };
                const companyId = await db.companies.add(newCompany);
                // Now, update the last_company field for the user
                const updated = await db.users.update(props.user, { last_company: companyId });

                if (updated) {
                    window.alert(`Successfully created company and updated user database`)
                    // props.success({ status: "success", lastCo: companyId });
                    currentCompany(companyId)
                } else {
                    window.alert(`User with user_id ${props.user.id} not found.`)
                }
            } catch (error) {
                console.error('ERROR creating company or updating last_company:', error);
                // props.success({ status: "error" + error, lastCo: '' });
                alert('Company create - failed');
            }
        };

        if (props.updateDatabase) {
            updateCoDetails();
        }
    }, [props.updateDatabase, companyName, companyType, addressPhysical, props.user, companyRegNo, addressPostal, email, telephone, website, taxNo, VATNo, currentCompany]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'companyName':
                setCompanyName(value);
                break;
            case 'companyType':
                setCompanyType(value);
                break;
            case 'companyRegNo':
                setCompanyRegNo(value);
                break;
            case 'addressPhysical':
                setAddressPhysical(value);
                break;
            case 'addressPostal':
                setAddressPostal(value)
                break;
            case 'email':
                setEmail(value)
                break;
            case 'telephone':
                setTelephone(value)
                break;
            case 'website':
                setWebsite(value)
                break;
            case 'taxNo':
                setTaxNo(value);
                break;
            case 'VATNo':
                setVATNo(value);
                break;
            // Add cases for other fields as well
            default:
                break;
        }
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "1.25rem"
                }}
            >
                <div
                    className='company_form_line'>
                    <label
                        className='company_label'
                        htmlFor="company_name">Company name:</label>
                    <input
                        ref={inputRef}
                        type="text"
                        name="companyName"
                        id="companyName"
                        value={companyName}
                        onChange={handleChange}
                    />
                </div>
                <div
                    className='company_form_line'>
                    <label
                        className='company_label'
                        htmlFor="company_name">Company type:</label>
                    <input
                        type="text"
                        name="companyType"
                        id="companyType"
                        value={companyType}
                        onChange={handleChange}
                    />
                </div>
                <div
                    className='company_form_line'>
                    <label
                        className='company_label'
                        htmlFor="companyRegNo">Company reg. no.:</label>
                    <input
                        type="text"
                        name="companyRegNo"
                        id="companyRegNo"
                        value={companyRegNo}
                        onChange={handleChange}
                    />
                </div>
                <div
                    className='company_form_line'>
                    <label
                        className='company_label'
                        htmlFor="username">Address physical:</label>
                    <input
                        type="text"
                        name="addressPhysical"
                        id="addressPhysical"
                        value={addressPhysical}
                        onChange={handleChange}
                    />
                </div>
                <div
                    className='company_form_line'>
                    <label
                        className='company_label'
                        htmlFor="username">Address postal:</label>
                    <input
                        type="text"
                        name="addressPostal"
                        id="addressPostal"
                        value={addressPostal}
                        onChange={handleChange}
                    />
                </div>
                <div
                    className='company_form_line'>
                    <label
                        className='company_label'
                        htmlFor="email">email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={handleChange}
                    />
                </div>
                <div
                    className='company_form_line'>
                    <label
                        className='company_label'
                        htmlFor="telephone">Telephone:</label>
                    <input
                        type="text"
                        name="telephone"
                        id="telephone"
                        value={telephone}
                        onChange={handleChange}
                    />
                </div>
                <div
                    className='company_form_line'>
                    <label
                        className='company_label'
                        htmlFor="website">Website:</label>
                    <input
                        type="text"
                        name="website"
                        id="website"
                        value={website}
                        onChange={handleChange}
                    />
                </div>
                <div
                    className='company_form_line'>
                    <label
                        className='company_label'
                        htmlFor="taxNo">Tax number:</label>
                    <input
                        type="taxNo"
                        name="taxNo"
                        id="text"
                        value={taxNo}
                        onChange={handleChange}
                    />
                </div>
                <div
                    className='company_form_line'>
                    <label
                        className='company_label'
                        htmlFor="VATNo">VAT number:</label>
                    <input
                        type="text"
                        name="VATNo"
                        id="VATNo"
                        value={VATNo}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default CompanyForm