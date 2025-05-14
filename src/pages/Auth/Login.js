import { Form , Col } from "react-bootstrap";
import './Auth.css' 
import axios from "axios";
import {  useEffect, useRef, useState } from "react"
// import { LOGIN, baseUrl } from "../../Api/Api";
// import LoadingSubmit from "../../Component/Loading/Loading";
import Cookie from 'cookie-universal' ;
// import Form from 'react-bootstrap/Form'; 
import { baseUrl, LOGIN } from "../../Api/Api";
// import { WindowSize } from "../../Component/Context/WindowContext";
import LoadingSubmit from "../../Component/Loading/Loading";
 
export default function Login(props){
    // const user=useContext(UserContext) ;
  

    // const setUser=user.setUser ;
    //   const windowSize=size.windowSize ;   

    // const size=useContext(WindowSize);
    // const windowsize=size.windowSize ;
    

    const [form,setForm]=useState({
       
        email:'',
        password: ''
    })
    // const navigate=useNavigate();

    const[loading,setLoading]=useState(false);
    //cookies
    const cookie=Cookie();

    const[err,setErr]=useState('');

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
        setLoading(true)
        try{
       const res= await axios.post(`${baseUrl}/${LOGIN}`,form);  
       console.log(res.data);
          
          const token=res.data.token;
    //    cookie.set('h-resurce',token);

       cookie.set('h-resurce',token);
       
       //    const role=res.data.user.role;
       //    const go=role==='1995' ?'users':'writer'
       //    window.location.pathname=`/dashboard/${go}`;
    //    window.location.pathname=`/dashboard`;
    //    navigate('dashboard')
   
       window.location.pathname=`/dashboard`;
       setLoading(false);
            }
        catch(err){
            console.log(err)
            // setLoading(false);
            // if(err.response.status===401){

            //     setErr('Wrong Email Or password ')
            // }else{setErr('Internal Server Error')}
           
        }

    }
    return(
    <>
       {loading && <LoadingSubmit/>} 
        <div className="  w-100  d-flex align-items-center justify-content-center h-100 bg-danger  "
        style={{height:'90vh',zIndex:22, position:'relative'}}>
            <div className="   d-flex align-items-center justify-content-center bg-danger  w-100">
             {/* {windowsize > 550 && <img src={require('../../img/login.png')} className="rounded w-100 h-100" 
               style={{position:'relative',zIndex:0 ,opacity:1}}></img> }    */}
              
                <div className="p-2     d-flex align-items-center justify-content-center flex-column   border rounded text-white
                   fs-5   " style={{position:'absolute' ,zIndex:22,
                    background:'rgb(9, 126, 141)' 
                   }}> 
                   <Col className=" " >
                  
                    <Form.Group >
                        <Form.Label className="d-flex align-items-start ">الايميل:</Form.Label>
                        <Form.Control 
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                           type="email" placeholder="Enter Your Email.." 
                           ref={focus}
                        
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
                            style={{background:'rgb(3, 35, 77)' }}>login</button>
                            <button className="text-center rounded btn btn-primary mt-3  "
                            style={{background:'rgb(3, 35, 77)' }} onClick={props.register}>Register
                                {/* <Link to='/Register'style={{color:'white'}} >Register</Link> */}
                                 
                                </button>

                    </div>
                </div>

            </div>
        </div>
    </> 
    )
}