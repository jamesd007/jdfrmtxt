import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();
const AuthUpdateContext = createContext()

export function useAuthUpdate() {
    return useContext(AuthUpdateContext)
}

// export function useAuth() {
//     return useContext(AuthContext);
// }

export function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false);
    // function login() {
    //     // Implement your login logic here
    //     setAuthenticated(true);
    // };

    function logout() {
        // Implement your logout logic here
        setAuthenticated(false);
    };

    return (
        // <AuthContext.Provider value={authenticated}>
        <AuthUpdateContext.Provider value={logout}>
            {children}
        </AuthUpdateContext.Provider>
        // </AuthContext.Provider>
    );
}
