import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Login from "../Login/Login";
import Home from "../Home/Home";


const Layout = () => {


    const {user, loading} = useContext(AuthContext);

    if(loading) return <span className="loading loading-ring text-center loading-lg"></span>

    return (
        <div>

            {
                !user? <Login></Login> : <><Home></Home></>
            }
            
        </div>
    );
};

export default Layout;