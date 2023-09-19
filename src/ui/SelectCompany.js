import React, { useEffect, useRef, useState } from 'react'
import db from '../store/dexie'
import { getAllCompanies } from '../store/dexie'
import { useCompany, useCompanyUpdate, useCurrentUser } from '../contexts/CompanyContext'


const SelectCompany = (props) => {
    const [allCompanies, setAllCompanies] = useState([])
    const [companyNames, setCompanyNames] = useState([])
    const [filteredCompanies, setFilteredCompanies] = useState([])
    const [searchStr, setSearchStr] = useState('');
    const [companiesList, setCompaniesList] = useState([]);
    const [displayListNew, setDisplayListNew] = useState([])
    const inputRef = useRef(null);
    const companyId = useCompany()
    const changeCompanyId = useCompanyUpdate()
    const currentUser = useCurrentUser()

    useEffect(() => {
        // Set focus when the component mounts
        inputRef.current.focus();
    }, [])

    useEffect(() => {
        getAllCompanies()
            .then(cos => {
                setAllCompanies(cos.map((item) => {
                    return { "companyName": item.companyName, "companyId": item.id }
                }))
            })
            .catch(error => {
                console.error('Error retrieving companies:', error);
            });
    }, [])

    async function goToCompany(company) {
        const updated = await db.users.update(currentUser, { last_company: company.companyId });
        if (updated) {
            window.alert(`Successfully updated user database`)
            // props.success({ status: "success", lastCo: companyId });
            changeCompanyId(company.companyId)
            props.close()
        } else {
            window.alert(`User with user_id ${currentUser} not found.`)
        }
        changeCompanyId(company.companyId)
    }

    useEffect(() => {
        // Filter the companies based on the searchStr
        const resultsList = allCompanies.filter((company) =>
            company.companyName.toLowerCase().includes(searchStr.toLowerCase())
        );

        setFilteredCompanies(resultsList);
    }, [searchStr, allCompanies]);

    const handleSearchStr = (event) => {
        setSearchStr(event.target.value)
    }

    const handleClearContent = () => {
        setSearchStr("")
    }

    return (
        <div
            style={{ maxHeight: "70vh", width: "100%" }}>
            <input
                ref={inputRef}
                type="text"
                placeholder="Search for a company"
                value={searchStr}
                onChange={(e) => setSearchStr(e.target.value)}
            />
            <ul>
                {filteredCompanies.map((company) => (
                    <li
                        key={company.companyId}
                        onClick={() => goToCompany(company)}>
                        {company.companyName}
                    </li>
                ))}
            </ul>
            {/* <div
                style={{
                    overflow: "hidden", overflowY: "auto",
                    width: "100%", maxHeight: "70vh",
                    textAlign: "left"
                }}>
                {displayListNew.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "3rem 10rem"
                        }}
                    // onclick={handleSelect(item)}
                    >
                        <span>{item.companyId}</span>
                        <span>{item.companyName}</span>
                    </div>))
                }
            </div> */}
        </div>
    )
}

export default SelectCompany