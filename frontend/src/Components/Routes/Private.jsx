import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from '../../Components/Spinner'
import toast from "react-hot-toast";

export const PrivateRoute = ()=>{
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(()=>{
        const authCheck = async ()=>{
            const res = await axios.get('http://localhost:3000/userAuth',
            // i can set this code in context (globaly check context auth.jsx upon useeffect )
            // {
            //     headers : {
            //         'Authorization' : auth?.token //you can also pass this using  context
            //     }
            // }
            )

            if(res.data.ok){
                setOk(true);
            }
            else{
                setAuth(false)
            }
        }

        if(auth?.token) authCheck();
    },[auth?.token])


    return ok ? <Outlet/> : <Spinner />
    // return ok ? <Outlet/> : toast.error('Login first')

}