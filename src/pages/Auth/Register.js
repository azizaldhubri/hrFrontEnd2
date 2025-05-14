import { Form , Col } from "react-bootstrap";
import './Auth.css' 
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react"
// import { LOGIN, baseUrl } from "../../Api/Api";
// import LoadingSubmit from "../../Component/Loading/Loading";
import Cookie from 'cookie-universal' ;
// import Form from 'react-bootstrap/Form'; 
import { baseUrl,  REGISTER } from "../../Api/Api";
import { WindowSize } from "../../Component/Context/WindowContext";
export default function Register(props){
    // const size=useContext(WindowSize) ;
    //   const windowSize=size.windowSize ;   

    const size=useContext(WindowSize);
    const windowsize=size.windowSize ;
    

    const [form,setForm]=useState({
         name:'',
        email:'',
        password: ''
    })
   

    // const[loading,setLoading]=useState(false);
    //cookies
    const cookie=Cookie();

    // const[err,setErr]=useState('');

     // ref
     const focus=useRef('');
    
     // handle focus
     useEffect(()=>{     
      focus.current.focus();
     },[]);
    
     

       function handleChange (e){            
            setForm({...form,[e.target.name]: e.target.value})            
        } 
        async function handleSubmit(e){
            e.preventDefault();
            // setLoading(true)
            try{
               
             const res= await axios.post(`${baseUrl}/${REGISTER}`,form);
            //    setLoading(false)
               const token=res.data.token;
               const role=res.data.user.role;
             const go=role==='admin' ?'users':'writer'
                cookie.set('h-resurce',token)   ;         
                window.location.pathname=`/dashboard/${go}`;
    
            }
            catch(err){
                console.log(err)               
                // setLoading(false)
                // if(err.response.status===422){
                //     setErr('Email is already been taken')
                // }else{setErr('Internal Server Error')}
            }
    
        }
    return(
        <div className="  w-100  d-flex align-items-center justify-content-center h-100 bg-light  "style={{height:'82vh',zIndex:23, position:'relative'}}>
            <div className="   d-flex align-items-center justify-content-center  w-100">
             {windowsize > 600 && <img src={require('../../img/login.png')} className="rounded w-100 " 
               style={{position:'relative',zIndex:0 ,opacity:1 ,height:'70vh'}}></img> }   
              
                <div className="p-2     d-flex align-items-center justify-content-center flex-column   border rounded text-white
                   fs-5   " style={{position:'absolute' ,zIndex:22,
                    background:'rgb(3, 35, 77)' 
                   }}> 
                   <Col className=" " >              
                  
                    <Form.Group   >
                        <Form.Label className="d-flex align-items-start p-2">الاسم:</Form.Label>
                        <Form.Control  className="w-100" 
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                           type="text" placeholder="Enter Your Name.." 
                           ref={focus}
                        
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label className="d-flex align-items-start ">الايميل:</Form.Label>
                        <Form.Control 
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                           type="email" placeholder="Enter Your Email.."                        
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label  className="d-flex align-items-start mt-2 ">كلمة المرور:</Form.Label>
                        <Form.Control
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                          minLength={6}
                          required
                           type="password" placeholder="Enter Your Password.."
                         ></Form.Control>
                    </Form.Group>
                    </Col>
                    <div className="d-flex gap-3">
                            <button className="text-center rounded btn btn-primary mt-3 " onClick={handleSubmit}
                            style={{background:'rgb(3, 35, 77)' }}>Register</button>
                            <button className="text-center rounded btn btn-primary mt-3  "
                            style={{background:'rgb(3, 35, 77)' }}
                              onClick={props.login}> login                               
                                </button>
                                

                    </div>
                </div>

            </div>
        </div>
    )
}