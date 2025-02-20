import { createContext, useState } from "react";
import { useEffect } from "react";
import { app } from "../../firebase.init";
import { getAuth, onAuthStateChanged } from "firebase/auth";




export const AuthContext = createContext(null);
export const auth = getAuth(app);


const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth,currentUser=>{
             setUser(currentUser)
            setLoading(false)
            }

        )
    
        return ()=>{
            return unsubscribe()
        }
    },[])
     

        const authInfo={
           user,
           loading
        }


    return (
        <AuthContext.Provider value={authInfo}>
        {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;