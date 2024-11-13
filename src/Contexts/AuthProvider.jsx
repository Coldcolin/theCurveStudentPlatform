import React, { createContext, useState, useEffect} from "react"
// import { useDispatch} from "react-redux";
// import { signOut } from "./IdReducer.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children })=>{
    const [saveUser, setSaveUser] = useState(null);
    const [showSide, setShowSide] = useState(false);
    const [editProfile, setEditProfile] = useState(false)
    const [onSignOut, setOnsignOut] = useState(false);

    
    
    const toggleSide = ()=>{
        setShowSide(!showSide)
    }
    const displayEdit =()=>{
        setEditProfile(!editProfile)
    }
    useEffect(()=>{
        setSaveUser(JSON.parse(localStorage.getItem("SOTWUser")))
    }, [onSignOut])
    return(
        <AuthContext.Provider value={{ showSide, toggleSide, editProfile, displayEdit}}>{children}</AuthContext.Provider>
    )
}

