import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider ({children}) {
    const [user, setUser] = useState(null);
        
    useEffect(() => {
        fetch("/api/users/user", {
            credentials: "include"
        })
            .then(res => {
                if (!res.ok) {
                    setUser(null);
                    return null;
                }
                return res.json();
            })
            .then(data => {
                if (data !== null) {
                    setUser(data);
                }
            });
    }, []);

    return(
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )

}