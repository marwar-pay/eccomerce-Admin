import React, { createContext, useState, useContext, useEffect } from "react";
import { apiGet } from "../api/apiMethods";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    const token = localStorage.getItem('accessToken')

    const initializeUser = async () => {
        try {
            const response = await apiGet("api/auth/userInfo"); 
            if(response.status === 200){
                setUser(response.data?.user); 
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error.message);
        }
    };

    useEffect(() => {
        if(token){
            initializeUser();
        }
    }, [token]);

    return (
        <UserContext.Provider value={{ user, setUser, initializeUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
