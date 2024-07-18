import React, { createContext, useContext, useState, useEffect} from "react";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [user,setUser] = useState(null);

    useEffect( () => {
        const storedUser = localStorage.getItem('user')
        if(storedUser){setUser(JSON.parse(storedUser));}
    }, [])

    const login = (userData) => {setUser(userData);
        localStorage.setItem('user',JSON.stringify(userData))}

    const logout = () => {setUser(null);
        localStorage.removeItem("user")}

    const updateUser = (newUserFields) => {
        const existingUser = JSON.parse(localStorage.getItem('user')) || {};
        const updatedUser = { ...existingUser, ...newUserFields };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    return (<AuthContext.Provider value={{ user,login,logout,updateUser }}>
        {children}
    </AuthContext.Provider>)
}



const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
}

export { AuthProvider, useAuth }