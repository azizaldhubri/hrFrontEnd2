 
import { Axios } from "../../Api/axios";
import { useEffect, useState } from "react"; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from '@mui/material'; 
import { Link } from "react-router-dom";
import NavHeader from "../../Component/Dashboard/NavHeader";
 
 
 
export default function EmployeesOnLeave(){  
 
    const [employees, setEmployees] = useState([]);
  
    useEffect(() => {     
      Axios.get("/employees-on-leave")
        .then(response => {setEmployees(response.data)  })
        .catch(error => console.error("Error fetching employees on leave:", error));
    }, []);

    const header1=[           
      {
          key:'name',
          name:'الموظف'       
      },
     
      {  
          // key:'user_name',
          name:'نوع الإجازة'      
      }
      ,
      {     key:'start_date',
          name:'تاريخ البداية'      
      } ,
      {
           key:'end_date',
          name:'تاريخ النهاية'       
      }       
  
  ] 
  
  const style_Cell=
  {  maxWidth:100,
    fontSize: '15px',  // تغيير حجم الخط
    fontWeight: 'bold', // جعل الخط عريضًا
    borderRight: '2px solid black',    
    borderColor:'#c2c5c5',
    borderBottom:'3px solid gray',
    textAlign: 'center'}
  
    const body_Cell={
      // maxWidth:100,
      fontSize: '15px',          
      borderRight: '2px solid black',              
      borderColor:'#c2c5c5',
      borderBottom:'3px solid gray',
      textAlign: 'center'
    }
  
    const header=header1.map((item,index)=>     
      <TableCell 
      key={index}
      sx={style_Cell}
      >{item.name}</TableCell>       
  )
  const links=[
      {name:'الإجازات',
       link:'#'},    
    ]
    
    return (
      <div className="w-100 px-3 py-3">         
        <NavHeader nav={links}  />        
        <TableContainer  component={Paper} sx={{ maxHeight: 448,  overflow: 'auto',display:'block'   }}    >
            <Table aria-label="simple table"   sx={{  width:'100%',  marginTop:0 }}>
              <TableHead  >
              <TableRow sx={{ backgroundColor: '#d3d9db',fontSize:'20px', }}> 
                  <TableCell  sx={style_Cell}>م</TableCell>
                    {header}                
                </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp,index )=> (
              <TableRow key={emp.id}>
                <TableCell sx={body_Cell}>{index }</TableCell>
                <TableCell sx={body_Cell}>{emp.employee.name}</TableCell>
                <TableCell sx={body_Cell}>{emp.leave_type.name}</TableCell>
                <TableCell sx={body_Cell}>{emp.start_date}</TableCell>
                <TableCell sx={body_Cell}>{emp.end_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
      </div>
    );
  };
  
 
