"use client"
import { createContext, useEffect, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }: {children: React.ReactNode}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/check`, {credentials: 'include'});
            if(res.ok){
                const data = await res.json();
                setUser(data);
            }else{
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => { checkAuth()}, []);

    return (
        <AuthContext.Provider value={{user, loading, checkAuth, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);