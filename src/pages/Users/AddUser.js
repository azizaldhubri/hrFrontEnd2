 import { Form , Col } from "react-bootstrap"; 
import Select from 'react-select';
import HistoryDate from "../../Component/Dashboard/History";
import { useContext, useEffect, useRef, useState } from "react"; 
import 'moment/locale/ar';
import { Link, useNavigate } from "react-router-dom"; 
import { typeFile } from "../../Helpers/Files";
import { Axios } from "../../Api/axios";
import { USERS } from "../../Api/Api";
import { Menu } from "../../Component/Context/MenuContext";
 
 

export default function AddUser(){  
  const menu=useContext(Menu)    
  let setIsupdated=menu.setIsupdateNotifaction ;
  const navigate=useNavigate('')
  const[filesdata,setFilesdata]=useState([]); 
  const[confirmPassword,setConfirmPassword]=useState('');
  const[message,setMessage]=useState('');
  const[departments,setDepartments]=useState([]);
  // const[department_id,setDepartment_Id]=useState('');
  const[roles,setRole]=useState([]);
  const[form,setForm]=useState({
    name:'',  
    email:'',
    salary:'',
    phone_number:'',
    national_id:'',       
    job_title:'',
    gender:'ذكر', 
    nationality:'', 
    department_id:'', 
    // departments:'', 
    role:'user',       
    role_id:'2',         
    employment_type:'دوام كامل',
    password:'',
    status:'نشط'
          
});

  useEffect(()=>{
     getRoles();
     getDepartment();
  },[]) 

   //////////////////////////////   getDepartment ---------
  async function getDepartment(){
    try{ await Axios.get('departments')
      .then(res =>{setDepartments(res.data);
        
      })
     }
    catch(err){
      console.log(err)
    }
  }

 
  const department =departments && departments.map(item => ({
    value: item.id,
    label: item.department_name 
  }));
 
  // const handleChangeDept = (selected) => {
  //   setDepartment_Id(selected.value); // تحديث الحالة بالقيمة المحددة
  // };
  
 //////////////////////////////   getRoles---------
  async function getRoles(){
    try{ await Axios.get('roles')
      .then(res =>setRole(res.data))
     }
    catch(err){
      console.log(err)
    }
  }
  const OptionRoles =roles && roles.map(item => ({
    value: item.id,
    label: item.name
  }));
//----------------


  function handleChange (e){      
    setForm({...form,[e.target.name]:e.target.value})
    }



  const focus=useRef('');   
  const openImage=useRef(null);
  const Country=[ 'اليمن','المملكة العربية السعودية','عمان','قطر','السودان','مصر',
    'المغرب','لبنان','فلسطين','الامارات','سورياء','الاردن','ليبيا','الصومال','الجزائر','العراق','البحرين',]

  const options =Country && Country.map(item => ({
    value: item,
    label: item
  }));

  // const employment_type=['']
    

  const customStyles = {
    container: (provided) => ({
      ...provided,
      fontSize: '22px',
      minWidth: '200px', 
       borderLeft: '7px solid green',  // تخصيص الحدود اليسرى
      borderRight: '7px solid green', // تخصيص الحدود اليمنى
      borderTop: '2px solid gray',             // إزالة الحدود العلوية (اختياري)
      borderBottom: '2px solid gray',          // إزالة الحدود السفلية (اختياري)
      boxShadow: 'none',             // إيقاف تأثير الظل الافتراضي
      '&:hover': {
        borderLeft: '5px solid darkred', // تخصيص الحدود اليسرى عند التمرير
        borderRight: '5px solid darkred', // تخصيص الحدود اليمنى عند التمرير
      }
    }),
    menu: (provided) => ({
      ...provided,      
      fontSize: '19px',
      zIndex: 9999,  // لتحديد قيمة z-index

     
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: '200px', // تحديد الحد الأقصى لارتفاع القائمة
      overflowY: 'auto',  // تفعيل التمرير إذا تجاوزت القائمة الحد الأقصى
    }),
    
     
  };

     //------------------------function Date-------------------------------------------------------
     ///date selectedDate
    
     const [birth_date, setbirth_date] = useState(new Date()); 
        function handleValuebirth_date (value) {    
          setbirth_date(value);   };

    const [hire_date, setHire_date] = useState(new Date());      
        function handleValueHire_date(value) {
        setHire_date(value);      
        };
   
 
  
  

function handlechangefile(e){
  // setFilesdata((prev)=>[...prev,...e.target.files]); 
  setFilesdata( [...e.target.files]); 
}

// function HandleCansleFiles(id){
//   setFilesdata((prev)=>prev.filter(img=>img !==id)) ;            
// }

function handleOpenImage(){
  openImage.current.click()      
}

async function handleSubmit(e){
  e.preventDefault();
 
  const formData = new FormData();     
    formData.append('name', form.name);  
    formData.append('email', form.email);
    formData.append('salary', form.salary);
    formData.append('password', form.password);
    formData.append('phone_number', form.phone_number);
    formData.append('national_id', form.national_id);
    formData.append('birth_date', birth_date); 
    formData.append('hire_date',hire_date);  
    formData.append('job_title', form.job_title);
    formData.append('gender', form.gender);
    formData.append('nationality', form.nationality.value);    
    formData.append('department_id',form.department_id.value);    
    formData.append('role', form.role.label );
    formData.append('role_id', form.role.value );   
    formData.append('employment_type', form.employment_type );
    formData.append('status', form.status ); 
    formData.append('admin', '1'); // اضافة تنبية  للمدير بوجود موظف جديد   
    formData.append('files[]', filesdata[0])
    try{                       
      // console.log(...formData)   
       await Axios.post(`${USERS}/add`,formData )  ; 
       navigate('/dashboard/users')  ;
       handelUpateNotifaction();   
    //  window.location.pathname='/dashboard/users'
       
    }
    catch(err){       
      // console.log(err);
      console.log(err.response.data.message);
      setMessage(err.response.data.message)
    }
}

function handelUpateNotifaction(){        
  setIsupdated((perv)=>!perv) ;  
}
 
 
    return(
        <div className="w-100        col-12 col-lg-12 col-md-12 col-sm-12   "
        style={{}}>

                <div className="w-25 d-flex justify-content-between fs-4 p-2   "
                style={{marginRight:'8%'}}> 
                <Link to='/dashboard'>رجوع</Link>
                 <Link to='/dashboard/users'className="link m-0  ">عرض كل الموظفين</Link>                
              </div>
            <div className="w-100 d-flex  col-12 col-lg-12 col-md-12 col-sm-12   flex-column border-0 border-top    ">

                <div className="  mt-3  w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
                    <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" >
                            <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-3"   >الاسم</Form.Label>
                            <Col lg={9} sm={8} xs={12} md={12} >
                              <Form.Control  className="p-2"                                         
                                  type="text" 
                                  name="name"
                                  value={form.name}
                                  onChange={handleChange}
                                  >                        
                              </Form.Control>
                            </Col>
                    </Form.Group>                   
                                     
          
 
                </div>
                <div className="    w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
                    <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center"
                    >
                            <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8"   > البريد الالكتروني</Form.Label>
                            <Col lg={9} sm={8} xs={12} md={12} >
                              <Form.Control  className="p-2"                                         
                                  type="email" 
                                  name="email"
                                  value={form.email}
                                  onChange={handleChange}>                        
                              </Form.Control>
                            </Col>
                            {message.includes('The email has already been taken.')&&
                            <p className="text-danger m-0" style={{fontSize:'13px'}}>الايميل هذا مسجل من قبل</p>                            
                            }
                    </Form.Group>                   
                    <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12  p-2 flex-wrap align-items-center justify-content-center" >
                            <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8"   >رقم الهاتف</Form.Label>
                            <Col lg={9} sm={8} xs={12} md={12} >
                              <Form.Control  className="p-2"                                          
                                  type="number"
                                  name="phone_number"
                                  value={form.phone_number}
                                  onChange={handleChange}>                        
                              </Form.Control>
                            </Col>
                    </Form.Group>                   
                  
 
                </div>
                <div className="    w-100       fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
                      <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" >
                              <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8  "   >رقم الهوية الوطنية </Form.Label>
                              <Col lg={9} sm={8} xs={12} md={12} >
                                <Form.Control  className="p-2"                                         
                                    type="number" 
                                    name="national_id"
                                    value={form.national_id}
                                    onChange={handleChange}>                        
                                </Form.Control>
                                {(message.length> 0 && form.national_id==='')&&
                            <p className="text-danger m-0" style={{fontSize:'13px'}}> ادخل الرقم الوطني</p>                            
                            }
                  
                              </Col>
                      </Form.Group>                   
                      <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12  p-2 flex-wrap align-items-center justify-content-center" >
                              <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8"   >المسمى الوظيفي</Form.Label>
                              <Col lg={9} sm={8} xs={12} md={12} >
                                <Form.Control  className="p-2"                                          
                                    type="text"
                                    name="job_title"
                                    value={form.job_title}
                                    onChange={handleChange} >                        
                                </Form.Control>
                                {(message.length> 0 && form.job_title==='')&&
                            <p className="text-danger m-0" style={{fontSize:'13px'}}>Required</p>                            
                            }
                              </Col>
                      </Form.Group>                   
                  
 
                </div>
                
                <div className="    w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
                                             
                    <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12  p-2 flex-wrap align-items-center justify-content-center" >
                            <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8"   > تاريخ الميلاد</Form.Label>
                            <Col lg={9} sm={8} xs={12} md={12} >
                                      <HistoryDate 
                                      name="birth_date"
                                      value={birth_date}
                                      date={birth_date}
                                      // onChange={handleChange}
                                      onChange={(e)=>setHire_date(e.target.value)}
                                  setSelectDate={handleValuebirth_date} 

                                          />      
                            </Col>
                    </Form.Group>                   
                    <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12  p-2 flex-wrap align-items-center justify-content-center" >
                            <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8"   > تاريخ التوظيف</Form.Label>
                            <Col lg={9} sm={8} xs={12} md={12} >
                                      <HistoryDate
                                      date={hire_date} 
                                  setSelectDate={handleValueHire_date}     
                                          />      
                            </Col>
                    </Form.Group>                   
          
 
                </div>
                <div className="    w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
                    <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" >
                            <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-3"   > الجنسية </Form.Label>
                     <Col lg={9} sm={8} xs={12} md={12} >
                          <Select className='w-100   '
                              name='nationality'
                               onChange={(e)=> setForm({...form,nationality:e })}
                              options={options}                                                           
                              placeholder="اختر البلد "
                            styles={customStyles}
                            required
                          >                    
                       </Select> 
                       {(message.length> 0 && form.nationality==='')&&
                            <p className="text-danger m-0" style={{fontSize:'13px'}}>Required</p>                            
                            }
                     </Col>
                    </Form.Group>                   
                    <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" >
                            <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-3"   > القسم </Form.Label>
                            <Col lg={9} sm={8} xs={12} md={12} >
                            <Select className='w-100   '
                                name='department_id'                                 
                                options={department}                                                           
                                onChange={(e)=> setForm({...form,department_id:e })}                                                                       
                                placeholder="اختر القسم " 
                                required                              
                                styles={customStyles}
                           >                            
                  </Select> 
                  {(message.length> 0 && form.department_id==='')&&
                            <p className="text-danger m-0" style={{fontSize:'13px'}}>Required</p>                            
                            }
                            </Col>
                    </Form.Group>                    

                </div>


                <div className="    w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
                    <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" >
                            <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-3"   > الجنس </Form.Label>
                <Col lg={9} sm={8} xs={7} md={12} >
                  <fieldset>
                    <Form.Group className="mt-3 d-flex gap-3" style={{textAlign:'right'}}>                   
                        <Form.Check
                        type="radio"                                            
                        name="gender"                                                 
                        value="ذكر"
                        checked={form.gender === 'ذكر'}                       
                        onChange={handleChange}            
                                  
                        />
                            <Form.Label > ذكر </Form.Label>
                        
                        
                        <Form.Check
                        
                        type="radio"                       
                        name="gender"                        
                        value='انثى'
                        checked={form.gender === 'انثى'}                        
                        onChange={handleChange}
                        />
                          <Form.Label > انثى </Form.Label>
                  
                    
                    </Form.Group>
                    </fieldset>
                          
                
                    </Col>
                    </Form.Group>                   
                    <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" >
                            <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-3"   > نوع العمل </Form.Label>
                <Col lg={9} sm={8} xs={7} md={12} >
                  <fieldset>
                    <Form.Group className="mt-3 d-flex gap-3" style={{textAlign:'right'}}>                   
                        <Form.Check
                        type="radio"                                            
                        name="employment_type"                                                 
                        value="دوام كامل"
                        checked={form.employment_type === 'دوام كامل'}                       
                        onChange={handleChange}
                                                          
                        />
                         <Form.Label > كامل </Form.Label>    
                        
                        <Form.Check                        
                        type="radio"                       
                        name="employment_type"                        
                        value='دوام جزئي'
                        checked={form.employment_type === 'دوام جزئي'}                        
                        onChange={handleChange}
                        />
                          <Form.Label > جزئي </Form.Label>    
                        <Form.Check                        
                        type="radio"                       
                        name="employment_type"                        
                        value='تعاقد'
                        checked={form.employment_type === 'تعاقد'}                        
                        onChange={handleChange}
                        />
                          <Form.Label > تعاقد </Form.Label>    
                    
                    </Form.Group>
                    </fieldset>
                          
                
                    </Col>
                    </Form.Group>                   
                                      
 
                </div>
                <div className="    w-100    fs-5 col-12 col-lg-12  gap-3 col-md-12 col-sm-12 d-flex   gap-lg-4 align-items-center justify-content-center  flex-wrap  ">                                     
                                       
                    <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center  " >
                            <Form.Label  className="  col-6 col-lg-3   col-sm-4 m-0 col-md-8 "   > صلاحية المستخدم </Form.Label>
                            <Col lg={9} sm={8} xs={6} md={9} >
                              <Select className='w-100   '
                                name='role'
                                onChange={(e)=> setForm({...form,role:e })}             
                                  options={OptionRoles}                                                           
                                  placeholder="user"
                                // styles={customStyles}
                                required
                              >                            
                              </Select> 
                            </Col>
                    </Form.Group> 
                    <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" >
                              <Form.Label  className="  col-6 col-lg-3   col-sm-4 m-0 col-md-4   "   >المرتب</Form.Label>
                              <Col lg={9} sm={8} xs={6} md={9} >
                                <Form.Control  className="p-2"                                         
                                    type="number" 
                                    name="salary"
                                    value={form.salary}
                                    onChange={handleChange}>                        
                                </Form.Control>
                                {(message.length> 0 && form.salary==='')&&
                            <p className="text-danger m-0" style={{fontSize:'13px'}}> ادخل المرتب   </p>                            
                            }
                  
                              </Col>
                      </Form.Group>                    
                                     
 
                </div>
                <div className="    w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
                                       
                    <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" >
                            <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8 "   > كلمة المرور </Form.Label>
                            <Col lg={9} sm={8} xs={12} md={12} >
                            <Form.Control
                            type="password"
                            name="password"
                              placeholder="At least 6 charecter"
                            value={form.password}
                            onChange={handleChange}                            
                            ></Form.Control>
                            {message.includes('The password field is required.')&&
                            <p className="text-danger m-0" style={{fontSize:'13px'}}>يرجى ادخال كلمة مرور من 6 ارقام فاكثر</p>                            
                            }
                           
                            </Col>
                    </Form.Group>                    
                    <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" 
                    >
                            <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8 "   >تأكيد كلمة المرور </Form.Label>
                            <Col lg={9} sm={8} xs={12} md={12} 
                              style={{
                                borderBottom:confirmPassword.length===0 ?'':
                                (form.password===confirmPassword && confirmPassword.length >=6) ?'4px solid green': '4px solid red'
                              }} >
                            <Form.Control
                            type="password"
                            name="confirmPassword"
                             value={confirmPassword}
                             placeholder="At least 6 charecter"
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                                                     
                            ></Form.Control>
                  
                            </Col>
                    </Form.Group>                    
 
                </div>
                <div className="    w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center flex-column gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
                                             
                    <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12    flex-wrap align-items-center justify-content-center" >
                            
                            <Col lg={9} sm={8} xs={12} md={12} >
                            <Form.Control 
                            type="file"
                            hidden
                          //  event.target.files[0].
                          
                          // onChange={(event)=>setFilesdata( URL.createObjectURL(event.target.files[0]))}
                          onChange={handlechangefile}
                          
                            ref={openImage}
                            ></Form.Control>
                                      
                            </Col>
                  </Form.Group>  
                  <p className="m-0 fs-5"> اختر الصورة الشخصية</p>
                  <div className="border bg-light p-3 mb-4"
                    onClick={handleOpenImage}
                    
                  style={{width:'200px',height:'200px',cursor:'pointer'}}>
                   {filesdata[0] && 
                    // <img src={filesdata}style={{width:'100%',height:'180px'}} ></img>     

                     <div   className="  position-relative mt-2   ">                                                                
                    {  typeFile.map((typfile,ki)=>
                      <div key={ki}>
                           {typfile.src_type===filesdata[0].type&&(
                           <div className="d-flex align-items-center justify-content-start flex-column ">
                                 <img  src={typfile.type ==='img'? `${URL.createObjectURL(filesdata[0])}`:` ${typfile.pathimg}`} 
                                style={{width:'100%',height:'180px'}} alt="" ></img>
                          
                            </div>
                             )}
                       </div>)}
                       </div>

                       } 

                              
                       </div>
                 </div>

              <div className="w-100 border text-center gap-4">
                <button className="btn btn-primary m-3" onClick={handleSubmit}>حفظ</button>
                <button className="btn btn-primary">إلغاء</button>
              </div>
                 
           

            </div>
        </div>
    )
}