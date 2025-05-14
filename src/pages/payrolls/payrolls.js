import { useEffect, useState } from "react";
import { Axios } from "../../Api/axios";
// import Table_documents from "../../Component/Dashboard/Table_document";
import TableShow from "../../Component/Dashboard/Table";
// import { Link } from "react-router-dom";
import NavHeader from "../../Component/Dashboard/NavHeader";
import LoadingSubmit from "../../Component/Loading/Loading";

export default function Payrolls(){
    const [payrolls, setPayrolls] = useState([]);
    const[page,setPage]=useState(1)
    const[limit,setLimit]=useState(3)
    const[loading,setLoading]=useState(false)
    // const[total,setTotal]=useState(0);
    // const[role,setRole]=useState('');
 
 

    useEffect(() => {
        getAllPayrolls();
        // fetchPayrolls();
        // fetchEmployees();
    }, [limit]);

    const fetchPayrolls = async () => {         
        try{ const response = await Axios.get(`payrolls? limit=${limit}&page=${page}`);
            setPayrolls(response.data.data);  
            // console.log(response.data.data)         
        }
        catch(err){console.log(err)}
       
    };

    /// دالة لحساب الخصومات والبدلات من المرتب قبل عرض المرتب
    const getAllPayrolls = async () => {
         
        try{ await Axios.post("update_payroll");
            fetchPayrolls();
            // .then(data=> console.log(data.data));            
            // alert('تم تحديث رواتب كل الموظفين')
            // fetchPayrolls();
        }
        catch(err){console.log(err);
            fetchPayrolls();
        }
       
    };

  // ترحيل الارصدة  من الشهر المنصرم للجديد 
        const handleCarryForward = async () => {
          setLoading(true);           
          try {
             await Axios.post('carry-forward-advances');             
            // console.log(response.data.message)
            fetchPayrolls();

          } catch (error) { console.log(error) }
          setLoading(false);
           
        };

 
    const header=[
          
        {             
            key:'employee_name',
            name:'الاسم  '            
        },
      
        {
            key:'basic_salary',
            name:'الراتب الأساسي',
           
        },
        {
            key:'total_allowances',
            name:'البدلات'
        },
        {
            key:'total_deductions',
            name:'الخصومات'
        },
        {
            key:'net_salary',
            name:'الراتب الصافي'
        },
        {
            key:'month',
            name:'مرتب شهر  '
        },
        
 
     ]
  

    
     const links=[
        {name:' عرض المرتبات ',
         link:'#'},   
        ]
       


      
    return (
        <>
        {loading && <LoadingSubmit/>}
        <div className="ps-2 pe-2 mt-2  ">                      
                <NavHeader nav={links}  />               
                
                {/* <button className="btn btn-primary" onClick={getAllPayrolls}>نحديث رواتب الموظفين</button>     */}
            
            
             <div className="mt-0    "style={{ }}>
                <div className="d-flex align-items-center  gap-3 mb-1">
                    <p className="m-0 pe-2">يجب ترحيل الارصدة من الشهر السابق اذا لم يتم ترحيلها هذا الشهر </p>
                    <button className="rounded" onClick={handleCarryForward}>ترحيل</button>
                </div>
                              
            
                <TableShow
                limit={limit}
                setLimit={setLimit}
                page={page}
                header={header}
                data={payrolls}
                // currentUser={currentUser}
                // delete ={handleDelet}
                setPage={setPage}
                loading={loading}
                edit=''
                total={0}
                search='name'
                  Linksearch={payrolls}
                //   createTask={createTask}
                    role= ''>

                </TableShow>
                
        
             </div>               

        </div>
        </>
    );
}