import { faBars,  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom"; 
import { useContext, useEffect, useRef, useState } from "react";
import { WindowSize } from "../../Component/Context/WindowContext";
// import MenuList from "./MenuList";
import './menulist.css';
import './home.css' ;

export default function Topbar_home(props){ 
  const size=useContext(WindowSize) ;
  const windowSize=size.windowSize ;   
 
     const[open,setOpen]=useState(false) ;
    //  const[laoading,setLoading]=useState(false) ;
     const[open2,setOpen2]=useState(false) ;
    //  const[openMenue,setOpenMenu]=useState(false) ;
     
     const phoneNumber = '967770515088';  
     const message = 'مرحباً! كيف يمكنني مساعدتك؟';  
     const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

       

     const scrollYRef = useRef(0);
  const topbarRef = useRef(null);
 
  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;

      if (topbarRef.current) {
        if (scrollYRef.current > 100) {   
            // topbarRef.current.style.background = 'linear-gradient(to right, #0d47a1, #00acc1)';
          // topbarRef.current.style.backgroundColor = '#0288d1'; // لون عند التمرير
          // topbarRef.current.style.backgroundColor = '#0288d1'; // لون عند التمرير
          topbarRef.current.style.backgroundColor = 'rgb(36, 158, 214)'; // لون عند التمرير
          
          topbarRef.current.style.color = 'black';
        } else {         
             topbarRef.current.style.backgroundColor = 'rgb(235, 237, 240)';          
             topbarRef.current.style.color = 'black';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
 
 
   
     
      // function handleOpen(){      
      //   // setOpenMenu(prev=>!prev);
      // }
      // const[openFormRegister,setOpenFormRegister]=useState(false) ;

      // function handeleOpenFormRegister(e){         
      //   //  setOpenFormRegister(perv=>!perv)
      //   }
        
      

//=============================================================================
  
     
    return(      
   <div className="w-100   "
       style={{
        // height:'99vh',
        position:'relative',
        // zIndex:'10',
          // background:'rgb(3, 35, 77)' ,
           overflow:'hidden' }} > 

         
          
        <div    ref={topbarRef} className="w-100     d-flex align-items-center justify-content-center rounded    "
           style={{height:'90px' , position:'fixed',opacity:'1',
            zIndex:'4'  ,
              transition: 'background 0.5s ease, color 1.9s ease',         
           }}> 
         <div className="  col-lg-12 col-md-12  col-sm-12 col-12    
               d-flex align-items-center justify-content-between ps-4 pe-4 mb-1" 
                 style={{height:'100%',border:'4px solid rgb(13, 44, 85)' }}>
             
            <div className=" col-lg-3 col-md-3 col-sm-2 col-3  text-center order-lg-3  fs-5  ">
              {/* <p>yyyyyyyyyyy</p> */}
                
                <p   className="m-0 cursor"
                 style={{background:'none',cursor:'pointer'}}
                 onClick={()=>{ 
                              
                  props.setIsModalOpen(perv=>!perv)  
                   }} >تسجيل الدخول</p>
              
            
           </div> 
           <div className="  d-flex align-items-center gap-2 justify-content-center  col-lg-3 col-md-3 col-sm-2   order-lg-1  "
          //  style={{zIndex:'2'} } 
               >
             {windowSize >950 && 
               <p className="m-0 fs-3 ">مرحبا في انظمة</p> }
                {windowSize > 230 && 
                <img src={require('../../img/المس.png')} style={{width:'75px',borderRadius:'100%'}}></img>
                   }
                   
             </div> 

            <div className="order-lg-2    col-lg-6 col-md-4 col-sm-2 col-3     h-100  fs-5 ">
                    {windowSize >1000 && 
                      <ul className=" m-0 ps-2 pe-2 border d-flex   align-items-center justify-content-between   "
                      style={{height:'100%' ,listStyle:'none',}}>
                         
                          <li  onClick={props.onHeroSectionClick} style={{cursor:'pointer'}}>الصفحة الرئيسية </li>                                                                   
                       
                          <li  className=" d-flex  align-items-center justify-content-between flex-column gap-5    " 
                                style={{cursor:'pointer'}}
                                  onMouseEnter={()=>setOpen2(true)} onMouseLeave={()=>setOpen2(false)}>
                                <p className="m-0">معلومات عنا </p> 
                                { open2===true &&                                     
                                    <div className=" pt-5 " style={{ position:'absolute' , zIndex:'150'}}>
                                        <ul className="  rounded d-flex align-items-center justify-content-between  p-3  gap-3 border pe-1 ps-1   flex-wrap "
                                           style={{background:'#00000080',listStyle:'none',width:'200px'  }}>
                                          <li  className="ms-2 me-2 text-white" onClick={props.ontestimonialsClick}> اراء العملاء </li>
                                            <li className="ms-2 me-2"><Link className=" link"  to='#'> لماذا برنامج تسهيل</Link></li>
                                            <li className="ms-2 me-2"><Link className=" link"  to='#'> عملائنا</Link></li>
                                        </ul>                                                              
                                    </div>                     
                                  }                   
                          </li>
                         
                          <li  className="  d-flex  align-items-center justify-content-between flex-column gap-5  " 
                            style={{cursor:'pointer'}}
                              onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
                            <p className="m-0" >المزايا</p> 
                            { open===true &&                                     
                                <div  className=" pt-5 "
                                        style={{ position:'absolute' ,zIndex:'150' }}>
                                    <ul className="  rounded d-flex align-items-center justify-content-between  p-3  gap-3 border pe-1 ps-1 flex-wrap "
                                      style={{background:'#00000080',color:'white',listStyle:'none',width:'180px'  }}>
                                              <li className="ms-0 me-0 pe-0 ps-0" > <Link  className=" link "  to='#'  > إدارة المرتبات</Link> </li>
                                              {/* <li><Link    className=" link"  to='#'>الرواتب</Link></li> */}
                                              <li><Link  className=" link" to='#'>الاجازات</Link></li>
                                              <li className=""><Link  className=" link" to='#'> ادارة المهام</Link></li> 
                                    </ul>                                                              
                                </div>                     
                              }                   
                          </li> 
                          <Link to={waLink} target="_blank" rel="noopener noreferrer" 
                          style={{color:'brown'}}>  تواصل معنا </Link>  
                          {/* <Link to={waLink} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon  icon={faWhatsapp} style={{color:'green'}}/>        
                          </Link> */}
                       </ul>}
                    {windowSize <1000 &&
                    <div className="d-flex align-items-center    justify-content-center h-100 "   style={{textAlign:'left' }} >
                       <FontAwesomeIcon  icon={faBars} 
                       style={{cursor:'pointer',      
                        }} 
                        // onClick={props.setOpenMenu(perv=>!perv)}
                        onClick={props.setOpenMenu}  
                        /> 
                    </div> 
                   
                       }
            </div>  

            </div>

        </div>              
     
       </div>
    )
}
