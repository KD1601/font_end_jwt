import React, { useState, useEffect } from 'react'
import { getUserAccount } from '../services/userService'

const UserContext = React.createContext(null)
const UserProvider = ({ children }) => {

    const userDefault = {
        isLoading: true,
        isAuthenticated: false,
        token: '',
        account: {}
    };
    const [user, setUser] = useState(userDefault);

    // Login updates the user data with a name parameter
    const loginContext = (userData) => {
        setUser({ ...userData, isLoading: false })
    };

    // Logout updates the user data to default
    const logoutContext = (userData) => {
        setUser({ ...userDefault, isLoading: false });
    };

    const fetchUser = async () => {
        let res = await getUserAccount()
        if (res && res.EC === 0) {
            let groupWithRoles = res.DT.groupWithRoles
            let email = res.DT.email
            let username = res.DT.username
            let token = res.DT.access_token
            let data = {
                isAuthenticated: true,
                token: token,
                account: { groupWithRoles, email, username },
                isLoading: false
            }
            setUser(data)

        } else {
            setUser({ ...userDefault, isLoading: false })
        }
    }

    useEffect(() => {
        // if (window.location.pathname !== '/' && window.location.pathname !== '/login') {
        //     fetchUser()
        // } else {
        //     setUser({ user, isLoading: false })
        // }
        fetchUser()
    }, [])

    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider }