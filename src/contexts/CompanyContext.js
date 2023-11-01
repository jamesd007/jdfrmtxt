

import React, { createContext, useState, useContext } from 'react';

// Create a context for the active database
const ActiveDBContext = createContext();
const ActiveDBUpdateContext = createContext();

// Provider component to manage the active database
export function ActiveDBProvider({ children }) {
    const [activeDB, setActiveDB] = useState(null);

    // Function to change the active database
    function changeActiveDB(newDB) {
        setActiveDB(newDB);
    }

    return (
        <ActiveDBContext.Provider value={activeDB}>
            <ActiveDBUpdateContext.Provider value={changeActiveDB}>
                {children}
            </ActiveDBUpdateContext.Provider>
        </ActiveDBContext.Provider>
    );
}

// Custom hook to access the active database and its update function
export function useActiveDB() {
    const activeDB = useContext(ActiveDBContext);
    const updateActiveDB = useContext(ActiveDBUpdateContext);
    return [activeDB, updateActiveDB];
}




// import React, { createContext, useContext, useState } from 'react'
// import switchToCompanyDatabase from '../store/dexie'

// const CompanyContext = createContext()
// const CompanyUpdateContext = createContext()
// const CurrentUserContext = createContext()
// const CurrentUserUpdateContext = createContext()
// // const AuthContext = createContext();

// export function useCompany() {
//     return useContext(CompanyContext)
// }

// export function useCompanyUpdate() {
//     return useContext(CompanyUpdateContext)
// }

// export function useCurrentUser() {
//     return useContext(CurrentUserContext)
// }

// export function useCurrentUserUpdate() {
//     return useContext(CurrentUserUpdateContext)
// }

// // export function useAuth() {
// //     return useContext(AuthContext);
// // }

// export function CompanyProvider({ children }) {
//     const [companyId, setCompanyId] = useState('')
//     const [currentUser, setCurrentUser] = useState('')

//     function changeCompanyId(newCompanyId) {
//         setCompanyId(newCompanyId)
//     }
//     function changeUser(newUser) {
//         setCurrentUser(newUser)
//     }

//     return (
//         <CurrentUserContext.Provider value={currentUser}>
//             <CurrentUserUpdateContext.Provider value={changeUser}>
//                 <CompanyContext.Provider value={companyId}>
//                     <CompanyUpdateContext.Provider value={changeCompanyId}>
//                         {children}
//                     </CompanyUpdateContext.Provider>
//                 </CompanyContext.Provider>
//             </CurrentUserUpdateContext.Provider>
//         </CurrentUserContext.Provider>
//     )
// }

