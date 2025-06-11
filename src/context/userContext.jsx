import {  createContext, useState } from "react";


// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [userData,setUserData] = useState({
        id:"",
        name:"",
        email:"",
        role:""
    })

    return (
        <UserContext.Provider value={{userData,setUserData}}>
            {children}
        </UserContext.Provider>
    )
}