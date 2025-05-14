import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Axios } from "../../Api/axios";
import { Departments } from "../../Api/Api";
import Table_documents from "../../Component/Dashboard/Table_document";
import NavHeader from "../../Component/Dashboard/NavHeader";

export default function Department(){

    const[departments,setDepartments]=useState([]);
    const[limit,setLimit]=useState(3)
    // const[loading,setLoading]=useState(false)
    // const[total,setTotal]=useState(0);
    // const[role,setRole]=useState('');

    useEffect(()=>{
        async function handleGetDepartments(){    
            try{
                await Axios.get(`${Departments}`)
                .then(res=>setDepartments(res.data)) 
                }
            catch(err){
                console.log(err)
            }    
        }
        handleGetDepartments();
    },[])
   
    const header=[
          
        {  
            key:'department_name',
            name:'اسم القسم',
           
        },     
        {
            key:'description',
            name:'الوصف',
           
        },
        {
            key:'responsible_manager',
            name:'المدير المسؤول',           
        },
        {
            key:'location',
            name:'الموقع',
           
        },
        {
            key:'creation_date',
            name:'التاريخ المُنشأ',
            
        },
        {
            key:'Status',
            name:'الحالة',
            
        },     
        {
            key:'action',
            name:'العمليات'
        },
     ]
      async function handleDelet(id){
             try{
              await Axios.delete(`${Departments}/${id}`);
              setDepartments((prev)=>prev.filter((item)=>item.id!==id)) ;
                                   
              }
             catch(err){
                         console.log(err)
                    }         
            }

            const links=[
                {name:'الاقسام',
                 link:'#'
                },
                
              ]

    return(
        <div className="w-100">
                <NavHeader nav={links}  />                         
                <div className=" fs-4  me-3">                 
                    <Link to='/dashboard/AddDepartment' className="text-danger">إضافة قسم +</Link>
                </div>              
                <div className="   p-2 "style={{ }}>                              
                        <Table_documents
                            limit={limit}
                        setLimit={setLimit}
                    //   page={page}
                        header={header}
                        data={departments}
                        // currentUser={currentUser}
                        delete ={handleDelet}
                        edit='departments'
                        // setPage={setPage}
                        loading='false'
                        total='0'
                        search='name'
                        //   Linksearch={USER}
                        //   createTask={createTask}
                            role='admin'
                        />
                
                </div>
                     
                     
        </div>
        
    )
}