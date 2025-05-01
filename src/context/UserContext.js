"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [adminName, setAdminName] = useState("");
    

    return (
        <UserContext.Provider value={{ adminName, setAdminName }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
