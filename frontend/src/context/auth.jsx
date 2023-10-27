// import { useContext, createContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// const AuthProvider = ({children}) =>{
//     const [auth, setAuth] = useState({
//         user : null,
//         token : '',
//     });

//     // (start here )user token/details data ko page pe rahe refresh kareke bahd token page pe se na hate ishiye yhh code using useEffect
//     useEffect(()=>{
//         const data = localStorage.getItem('userToken');
//         if(data){
//             const parseData = JSON.parse(data);
//             setAuth({
//                 ...auth, 
//                 user : parseData.userExit,
//                 token : parseData.token,
//             })
//         }

//     },[])
//    // ***************end here*************
//     return (
//         <AuthContext.Provider value={[auth, setAuth]}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// //custom hooks
// const useAuth = () => useContext(AuthContext);

// export {useAuth, AuthProvider};




import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext =  createContext();

const UserProvider = ({children})=>{
    const [auth, setAuth] = useState({
        user : null,
        token : '',
    })


    //adding headers for private routes (default axios)
    axios.defaults.headers.common['Authorization'] = auth?.token




    //saving user token on brower
    useEffect(()=>{
      const data = localStorage.getItem('token')
      if(data){
        const parseData = JSON.parse(data);
        setAuth({...auth, 
        user : parseData.userExit,
        token : parseData.token})
      }

    },[])

    return (
        <UserContext.Provider value={[auth, setAuth]}>
            {children}
        </UserContext.Provider>
    )
}


//custom hook
const useAuth = ()=> useContext(UserContext);

export {useAuth, UserProvider};

