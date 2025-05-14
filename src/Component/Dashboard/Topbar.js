import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style _TopAndSidBar.css' ;
import {  faBars,  faBell,     faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import  { Menu } from '../Context/MenuContext';
import { UserContext } from '../Context/UserProvider'; 
import { Axios } from '../../Api/axios';
import { LOGOUT } from '../../Api/Api';
import Cookie from 'cookie-universal' ;
import { typeFile } from '../../Helpers/Files';
import '../../Css/Modal.css'; 
import { Link } from 'react-router-dom';
import { WindowSize } from '../Context/WindowContext';
 

 
export default function Topbar(props){

    const WindowContext=useContext(WindowSize)
    const windowSize=WindowContext.windowSize;       
    const cookie=Cookie();  
    const menu=useContext(Menu)   
    const user=useContext(UserContext)
    const user_data=user.user ;  

    const[notifications,setNotfication]=useState([])
    const[count_notifications,setCountNotfication]=useState(0)

 
    const isUpdated=menu.isupdateNotifaction ;
  
 
//  const imageProfile=`${JSON.parse(user_data.file_paths)}`
 
let imageProfile = null;

if (user_data?.file_paths) {
  try {
    const filePaths = JSON.parse(user_data.file_paths); // تحويل النص إلى مصفوفة
    if (Array.isArray(filePaths) && filePaths.length > 0) {
      // بناء رابط الصورة باستخدام عنوان السيرفر
    //   imageProfile = `http://localhost:8000/${filePaths[0]}`;
      imageProfile = `${filePaths[0]}`;
    }
  } catch (error) {
    console.error("خطأ في JSON.parse:", error);
  }
}

    let setisOpen=menu.setisOpen ;
    function handelchangeMenue(){        
        setisOpen((perv)=>!perv) ;  
  }
  async function handleLogout(){
    try{
        await Axios.get(`/${LOGOUT}`);         
     window.location.pathname='/'
     cookie.remove('h-resurce');   
    }
    catch(err){   console.log(err)  }

    }


    useEffect(()=>{      
       getNotification();

    },[isUpdated])

    async function getNotification(){         
        try{
          await Axios.get(`notifications`)
          .then(res=>{setNotfication(res.data);
            
              // لتحديث عدد الاشعارات 
            if(res.data){
                setCountNotfication(0)
                res.data.map((item)=>
                    setCountNotfication(perv => (item.is_read===0)?(perv+1):(perv) )
                )
                       
            }
         })         
        }
        catch(err){console.log(err)      }
    }

    // ===========================
async function Notification_isread(id){
    try{ 
        await Axios.post(`Notification_isread/${id}`);
        getNotification();
        
    }
    catch(err){console.log(err)}
}

    const [isModalOpen, setIsModalOpen] = useState(false);

    // دالة لفتح المودال
    // const openModal = () => setIsModalOpen(true);
  
    // دالة لإغلاق المودال
    const closeModal = () => setIsModalOpen(false);
  
    function Modal({ onClose }) {
      return (
          <div className="modal-notification    " 
          onMouseLeave={closeModal}         
              style={{overflowY:'auto',maxHeight:'70vh'}}           
              // style={{overflowY:'scroll',}}          
             >
                 
              <div style={{  }} className='w-100 p-1  mb-2  '>
                  <div className="modal-content1  " 
                  onClick={(e)=>{  e.stopPropagation();}}>
                  <div  className='        gap-3 align-items-start rounded   '   >
                  {notifications && 
                  notifications.map((item,i)=>
                  <div key={i} className='  border-bottom  mt-1  d-flex align-items-center justify-content-center '
                  onClick={()=>Notification_isread(item.id)}

                  style={{
                    background:item.is_read ===0 ? 'rgba(230, 236, 238, 0.8)':'white',
                    height:'70px',
                

                    }}>
                      {/* <p  className='m-0 p-2 rounded text-dark border ' key={i}>{item.message}</p> */}
                      <Link   to={item.link_notification} className='fs-5  m-0  rounded text-dark  ' >{item.message}</Link>
                  </div>
            )

                  }
                  
                
  
                  </div>
                  
                  </div>
              </div>
          </div>
      );
  }

    return(
        <div className="  px-3 py-2  w-100 top d-flex align-items-center justify-content-center ms-2   "
        >
            <div className='  d-flex align-items-center justify-content-between    ps-4 pe-4  '
             style={{width:'90%' }}>
             <div className='d-flex align-items-center justify-content-center gap-3  '
              style={{width:windowSize < 400 && '100%'}}
             >
                
                <FontAwesomeIcon icon={faBars} 
                style={{cursor:'pointer'}}
                onClick={handelchangeMenue}
                 />    

                 <div className='d-flex fs-5 text-white align-items-center justify-content-between      '
                
                 style={{width:'100%'}}
                 >                

                <div className="         "   style={{ cursor:'pointer'}}>                                        
                     {  imageProfile !== null  ?                    
                        <div key={0} className=" " >  
                                {  typeFile.map((typfile,k)=>
                            <div key={k}>
                            {typfile.name.includes(imageProfile.split('.').pop())&&(
                                <div>
                                <img  src={typfile.type =='img'? ` ${typfile.pathimg}/${imageProfile}`:` ${typfile.pathimg}`} 
                                    style={{borderRadius:'100%'}}height={40} width={40} alt=''></img>     
                            

                                </div>
                            )}

                            </div>)} 
                        </div>
                        :
                        <img src={require('./../../Assets/images/user.png')} style={{borderRadius:'100%'}} height={40} width={40} alt='' ></img>

                    } 
            
                </div>

      
               
                
                 
                    {/* <p className='m-0 me-2'> {user_data.name} </p> */}
                     

                     <div className='d-flex align-items-center justify-content-center border me-2'                     
                      onClick={( )=>setIsModalOpen(perv=>!perv)}
                       style={{
                        position:'relative' ,
                        width:'45px',
                        height:'45px',
                        borderRadius:'100%',
                        background:'rgb(231, 238, 238)'

                       }}> 

                        <FontAwesomeIcon className=' ' icon={faBell} style={{cursor:'pointer',color:'rgb(50, 49, 51)'}}   />
                        {isModalOpen && <Modal onClose={closeModal} />}
                        <p className='m-0 p-1  text-center  '
                        style={{
                            background:'rgb(245, 113, 133)',
                            position:'absolute',
                            fontWeight:'bold',
                            width:'25px',
                            height:'25px',
                            color:'white',                             
                            fontSize:'14px',
                            borderRadius:'100%',
                            bottom:21 ,
                            right:28
                        }}>
                            {/* {notifications.length} */}
                           { count_notifications}
                            </p>
                     </div>
                   <div className='d-flex align-items-center justify-content-center border me-2'
                    style={{                       
                        width:'45px',
                        height:'45px',
                        borderRadius:'100%',
                        background:'rgb(231, 238, 238)'

                       }}>
      
                        {/* <IoMdLogOut style={{cursor:'pointer',color:'black'}} onClick={handleLogout}/>  */}
                      <FontAwesomeIcon className=' ' icon={faSignOut} style={{cursor:'pointer',color:'black'}} onClick={handleLogout}/>

                   </div>

                 </div>
                
             </div>
              
                {windowSize >400 &&   <img   src={require('../../img/hr7.png')} style={{borderRadius:'100%'}} width={50} alt=''></img>}
               

                

            </div>
           

            
        </div>
    )
}