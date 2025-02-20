import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Login from "../Login/Login";
import Home from "../Home/Home";


const Layout = () => {

    const {user} = useContext(AuthContext)

    return (
        <div>

            {
                !user? <Login></Login> : <><Home></Home></>
            }
            
        </div>
    );
};

export default Layout;