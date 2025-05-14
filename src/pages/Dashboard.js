 import React from 'react'; 
import Topbar from '../Component/Dashboard/Topbar';
import SideBar from '../Component/Dashboard/SideBar'; 
import { Outlet } from 'react-router-dom';
// import { WindowSize } from '../Component/Context/WindowContext';
 
 

const Dashboard = () => {
  // const size=useContext(WindowSize);
  // const windowSize=size.windowSize ;
   
  return (
    <div  className="position-relative w-100   " >
              <Topbar/>
                <div  className="w-100 dashboard d-flex gap-1     position-relative p-1    "
                 style={{ marginTop:'53px' ,height:'91vh' }}>               
                <SideBar/>               
                
                <div  className='w-100   border'
                style={{ overflow:'auto',background:'rgba(211, 224, 230, 0.2)'  }} >              
                 <Outlet />                
                </div> 
                
                </div>
                
            </div> 


 
  );
};

export default Dashboard;



