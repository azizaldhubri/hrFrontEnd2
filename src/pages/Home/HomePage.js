 import { useContext, useRef, useState } from "react"; 
import MenuList from "./MenuList";
import './menulist.css';
import './home.css' ; 
import Login from "../Auth/Login";  
// import Register from "../Auth/Register"; 
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";
import TestimonialsSection from "./TestimonialsSection";
import CallToActionSection from "./CallToActionSection";
import ScreenshotsSection from "./ScreenshotsSection";
import Topbar_home from "./Topbar_home";
import { WindowSize } from "../../Component/Context/WindowContext";
import Register2 from "../Auth/Register2"; 

export default function Homepage(){ 
    const size=useContext(WindowSize) ;
    const windowSize=size.windowSize ; 
     const[openMenue,setOpenMenu]=useState(false) ;
   const aboutRef = useRef(null);
   const heroSectionRef = useRef(null);
  const featuresRef = useRef(null);
  const screenshotsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const callToActionRef = useRef(null);

  const scrollTo = (ref) => {    
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
     
      function handleOpen(){               
        setOpenMenu(perv=>!perv);
      }


      const[openFormRegister,setOpenFormRegister]=useState(false) ;
      function handeleOpenFormRegister(){              
         setOpenFormRegister(perv=>!perv)
        }
        
      

//=============================================================================
const [isModalOpen, setIsModalOpen] = useState(false);        

  function handle_openModel(e){    
    setIsModalOpen(e)}    
    
      // دالة لإغلاق المودال
      const closeModal = () => setIsModalOpen(false);    
      function Modal({ onclose }) {
        return (
            <div className="modal_homepage1  "
              onClick={(e)=>{
              setIsModalOpen(false) ;
                }}  >                    
                    <div  className='modal_content_home' 
                       onClick={(e)=>{                              
                        e.stopPropagation(); }}  >                          
                        {openFormRegister === false ?  <Login register={handeleOpenFormRegister}/>
                        : <Register2 login={handeleOpenFormRegister}/> }                        
                    </div>                    
            </div>
        );
    }
    return(      
      <div className="w-100" style={{position:'relative'}}> 

          <div >
              <Topbar_home 
              setIsModalOpen={handle_openModel}
                setOpenMenu={handleOpen}
                  onHeroSectionClick={() => scrollTo(heroSectionRef)}
                   ontestimonialsClick={() => scrollTo(testimonialsRef)}
              />

          </div>
          

      <div >      
        <div ref={heroSectionRef}><HeroSection /></div>
        <div ref={aboutRef}><AboutSection /></div>
        <div ref={featuresRef}><FeaturesSection /></div>
        <div ref={screenshotsRef}><ScreenshotsSection /></div>
        <div ref={testimonialsRef}><TestimonialsSection /></div>
        <div ref={callToActionRef}><CallToActionSection /></div>
        <Footer />
     </div> 

      
           {openMenue && windowSize<1000 &&           
              <div className="child">
                <MenuList  
                 onHeroSectionClick={() => scrollTo(heroSectionRef)}
                 onAboutClick={() => scrollTo(aboutRef)}
                 onFeaturesClick={() => scrollTo(featuresRef)}
                 onScreenshotsSectionClick={() => scrollTo(screenshotsRef)}
                // refTo={testimonialsRef}
                openMenue={handleOpen} 
                setIsModalOpen={handle_openModel}
                />
            
           </div>}                 
           
          <div className=" w-100    " style={{zIndex:'2'}}>     
            {isModalOpen && <Modal onClose={closeModal} />}
          </div>

    </div>      
     
       
    )
}
