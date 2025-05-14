import React, { useContext } from 'react';  
import { Outlet,Navigate, } from "react-router-dom";
import Cookie from 'cookie-universal' ;
import { useEffect, useState } from "react";
import LoadingSubmit from "../../Component/Loading/Loading"; 
import Error403 from "./403";
import { UserContext } from '../../Component/Context/UserProvider';
 
 
 

const ProtectedRoute = ({ permission }) => {

  const cookie=Cookie();
  const token=cookie.get('h-resurce');
  
    const USERNAME=useContext(UserContext)   
    const permissions=USERNAME.permissions;     
 
    const [isHasValidity, setIsHasValidity] = useState(false);  
    const [isValidited, setIsValidited] = useState(false);
    
    //   
    const [newLink, setNewLink] = useState('');  
    const[user,setUser]=useState(''); 
     
    
    // token and cookie

 
 
 
//===================================================================

function handleChangeValue(){
     
  };
useEffect(()=>{ 
    handleChangeValue() ;      
    async function fetchPermissi() {                
        const permissionsData = {};                 
          permissions.forEach(item => {             
              if(item.page.name===permission && item.can_view===1){                                     
                      setIsHasValidity(true)
                      setIsValidited(true);
                      setNewLink(permission)                      
               //   permissionsData[item.page.name] =item;
              }else  { setIsValidited(true);  }
          });

        };
         fetchPermissi();
},[permission,permissions]) 

 
 //-------------------------------------------------------------------------------------------
    return token ? (       
    //    (username.user=='' )  ?
       ( isValidited ===false)  ?
       (
        <LoadingSubmit/>
        ): (isHasValidity === true && newLink===permission) ?
        (        
        <Outlet/>
       ): (isHasValidity === true && newLink !==permission)?
       (<LoadingSubmit/>):         
        (<Error403 role={user.role}/>
        // <Outlet/>
        )
         ):(
             <Navigate to={'/login'}replace={true}/>        
            )
};

export default ProtectedRoute;
