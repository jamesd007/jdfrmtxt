import React, { createContext, useContext, useState } from 'react'

const CompanyContext = createContext()
const CompanyUpdateContext = createContext()
const CurrentUserContext = createContext()
const CurrentUserUpdateContext = createContext()
// const AuthContext = createContext();

export function useCompany() {
    return useContext(CompanyContext)
}

export function useCompanyUpdate() {
    return useContext(CompanyUpdateContext)
}

export function useCurrentUser() {
    return useContext(CurrentUserContext)
}

export function useCurrentUserUpdate() {
    return useContext(CurrentUserUpdateContext)
}

// export function useAuth() {
//     return useContext(AuthContext);
// }

export function CompanyProvider({ children }) {
    const [companyId, setCompanyId] = useState('')
    const [currentUser, setCurrentUser] = useState('')

    function changeCompanyId(newCompanyId) {
        setCompanyId(newCompanyId)
    }
    function changeUser(newUser) {
        setCurrentUser(newUser)
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <CurrentUserUpdateContext.Provider value={changeUser}>
                <CompanyContext.Provider value={companyId}>
                    <CompanyUpdateContext.Provider value={changeCompanyId}>
                        {children}
                    </CompanyUpdateContext.Provider>
                </CompanyContext.Provider>
            </CurrentUserUpdateContext.Provider>
        </CurrentUserContext.Provider>
    )
}

