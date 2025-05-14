import { useEffect, useState } from "react"; 
import { Form , Col } from "react-bootstrap"; 
import Select from 'react-select';
import HistoryDate from "../../Component/Dashboard/History";
import { Axios } from "../../Api/axios";
import NavHeader from "../../Component/Dashboard/NavHeader";

export default function AddDeductions(){ 
    const [employees, setEmployees] = useState([]);
    const [employeeId, setEmployeeId] = useState("");
    const [deductionType, setDeductionType] = useState("");
    const [deductionAmount, setDeductionAmount] = useState("");    
    const [absenceType, setAbsenceType] = useState("1");
    const [absenceDeduction, setAbsenceDeduction] = useState("");    
    const [absenceDate, setAbsenceDate] = useState(new Date()); 
   
        function handleValueHire_date(value) {
            setAbsenceDate(value);      
        };

    useEffect(() => {        
        fetchEmployees();
    }, []);
    
    const fetchEmployees = async () => {
        try{ 
        const response = await Axios.get("users");
        setEmployees(response.data.data.data);
        }
        catch(err){console.log(err)}
    };

    const handleAddDeduction = async () => {        
     try{        
          await Axios.post("deductions", {
            employee_id: employeeId,
            deduction_type: deductionType,
            amount: deductionAmount,
        });      
        alert('تم إضافة الخصم بنجاح'); 
        setDeductionType('');  
        setDeductionAmount(''); 
        setEmployeeId(null);
    }
        catch(err){console.log(err)}
    };

    const handleAddAbsence = async () => {  
        const formData =new FormData();
        formData.append('employee_id',employeeId)   
        formData.append('absence_date',absenceDate)   
        formData.append('absence_type',absenceType)   
        formData.append('deduction_amount',absenceType=== '1'? absenceDeduction:0)   
          
            try{                 
             await Axios.post("absences", formData );
           alert('تم إضافة الخصم بنجاح');           
            setAbsenceDeduction('');
            setEmployeeId(null);
           
        }      
        catch(err){console.log(err)            
            alert(err.response.data.message)
        }
    };

    const options =employees && employees.map(item => ({
        value: item.id,
        label: item.name
      }));
     
      const handleChange = (selected) => {
        setEmployeeId(selected.value); // تحديث الحالة بالقيمة المحددة
      };
      const customStyles = {
        container: (provided) => ({
          ...provided,
          fontSize: '22px',
          minWidth: '200px', 
           borderLeft: '5px solid green',  
          borderRight: '5px solid green',  
          borderTop: '2px solid gray',            
          borderBottom: '2px solid gray',        
          boxShadow: 'none',         
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

       const links=[
            {name:'إضافة خصم',
             link:'#'},    
          ]
          
          return (
            <div className="px-3 py-2 h-100 border border-3"style={{height:'100vh'}}>     
            <NavHeader nav={links}  />
            {/* <h3 className="pt-2">إضافة خصم</h3>           */}

         <div className="    w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
            <Form.Group   className="d-flex  col-lg-5 col-md-6 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center  " >
                 <Form.Label  className="  col-6 col-lg-3 col-md-6 col-sm-4 m-0   "   > اختر موظف </Form.Label>
                     <Col lg={9} sm={8} xs={12} md={12} >
                          <Select                       
                              options={options}                             
                              value={employeeId !=null ? employeeId.label  :'اختر موظف '}
                              name="employeeId"                            
                            onChange={handleChange}
                              placeholder="اختر موظف "
                            styles={customStyles}                             
                            required
                          >                    
                       </Select>                        
                     </Col>
            </Form.Group> 
            <Form.Group   className="d-flex  col-lg-5 col-md-6 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center  " >
                 <Form.Label  className="  col-6 col-lg-3 col-md-6 col-sm-4 m-0   "   > نوع الخصم</Form.Label>
                     <Col lg={9} sm={8} xs={12} md={12} >
                          <Form.Control className='w-100   '
                          type="text"
                          placeholder="نوع الخصم" 
                          value={deductionType}
                          onChange={(e) => setDeductionType(e.target.value)}                             
                          >                    
                       </Form.Control>                        
                     </Col>
            </Form.Group>
             </div>

        
            <div className="    w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
           
            <Form.Group   className="d-flex  col-lg-5 col-md-6 col-sm-11  col-12  p-2 flex-wrap align-items-center justify-content-center  " >
                    <Form.Label  className="  col-6 col-lg-3 col-md-6 col-sm-4 m-0  "   > المبلغ  </Form.Label>
                    <Col lg={9} sm={8} xs={12} md={12} >
                    <Form.Control className='w-100   '
                     type="number"
                      placeholder="المبلغ  "
                      value={deductionAmount}
                      onChange={(e) => setDeductionAmount(e.target.value)}                              
                             > 
                  </Form.Control>   
                    </Col>
             </Form.Group> 
             <div className="d-flex  col-lg-5 col-md-6 col-sm-11  col-12  p-2 flex-wrap align-items-center justify-content-start">
               <button className="btn btn-primary" onClick={handleAddDeduction}>إضافة الخصم</button>
             </div>
             </div> 
                     {/*--------------------------------------------------- إضافة غياب--------------------------  */}

            <h3 className=" border-0 border-top pt-3 mt-5">إضافة غياب</h3>    
            <div className="    w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
            <Form.Group   className="d-flex  col-lg-5 col-md-6 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center  " >
                 <Form.Label  className="  col-6 col-lg-3 col-md-6 col-sm-4 m-0   "   > اختر موظف </Form.Label>
                     <Col lg={9} sm={8} xs={12} md={12} >
                          <Select                          
                              options={options}                             
                              value={employeeId !=null ? employeeId.label  :'اختر موظف '}
                              name="employeeId"                            
                            onChange={handleChange}
                              placeholder="اختر موظف "
                            styles={customStyles}   
                            required
                          >                    
                       </Select>                        
                     </Col>
            </Form.Group> 
            <Form.Group   className="d-flex  col-lg-5 col-md-6 col-sm-11  col-12  p-2 flex-wrap align-items-center justify-content-center  " >
                    <Form.Label  className="  col-6 col-lg-3 col-md-6 col-sm-4 m-0  "   > تاريخ الغياب</Form.Label>
                    <Col lg={9} sm={8} xs={12} md={12} >
                                <HistoryDate
                                name="allowanceDate"
                                value={absenceDate}
                                date={absenceDate}                               
                                onChange={(e)=>setAbsenceDate(e.target.value)}
                               setSelectDate={handleValueHire_date}
                                    />      
                    </Col>
             </Form.Group> 
             </div>
            <div className="    w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
            <Form.Group   className="d-flex  col-lg-5 col-md-6 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center  " >
                 <Form.Label  className="  col-6 col-lg-3 col-md-6 col-sm-4 m-0   "   > نوع الغياب</Form.Label>                  
                        <fieldset>
                    <Form.Group className="mt-3 d-flex gap-3" style={{textAlign:'right'}}>   
                        <Form.Check                        
                                type="radio"                       
                                name="absenceType"                          
                                checked={absenceType === '1'}    
                                value='1'                      
                                onChange={(e) => setAbsenceType(e.target.value)}  
                                />
                        <Form.Label > غياب بغير اذن</Form.Label>                   

                        <Form.Check                        
                        type="radio"                       
                        name="absenceType"                          
                        value='2'                        
                        onChange={(e) => setAbsenceType(e.target.value)}  
                        />
                         <Form.Label > غياب مع إذن </Form.Label>                    
                    </Form.Group>
                    </fieldset>
            </Form.Group> 
            <Form.Group   className="d-flex  col-lg-5 col-md-6 col-sm-11  col-12  p-2 flex-wrap align-items-center justify-content-center  " >
                    <Form.Label  className="  col-6 col-lg-3 col-md-6 col-sm-4 m-0  "   > المبلغ المخصوم</Form.Label>
                    <Col lg={9} sm={8} xs={12} md={12} >
                    <Form.Control className='w-100   '
                     type="number"
                      placeholder="المبلغ المخصوم"  
                      value={absenceDeduction}                                            
                      onChange={(e) => setAbsenceDeduction(  e.target.value)}  
                      disabled={absenceType==='2' ? true:false}                            
                             > 
                  </Form.Control>   
                    </Col>
             </Form.Group> 
             </div> 
             <div className="w-100  d-flex align-items-center justify-content-center">
                <button className="mt-3 btn btn-primary "
              onClick={handleAddAbsence}>إضافة الغياب</button>
             </div>           
        </div>
    );
}