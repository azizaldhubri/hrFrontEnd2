import React, { useEffect, useState } from "react";
import { Axios } from "../../Api/axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from '@mui/material'; 
 

export default function LeaveBalancesTable() {
    const [leaveBalances, setLeaveBalances] = useState([]);

    useEffect(() => {
        async function fetchLeaveBalances(){
        try{   await  Axios.get('leave-balances')                 
              .then(data => {setLeaveBalances(data.data); })                     
            }
        catch(err){console.log(err);   }
            };
        fetchLeaveBalances();
    }, []);
     
    const style_Cell=
{  maxWidth:100,
  fontSize: '15px',  // تغيير حجم الخط
  fontWeight: 'bold', // جعل الخط عريضًا
  borderRight: '2px solid black',    
  borderColor:'#c2c5c5',
  borderBottom:'3px solid gray',
  textAlign: 'center',
backgroundColor:'gray',
color:'white',

}

  const body_Cell={
    // maxWidth:100,
    fontSize: '15px',          
    borderRight: '2px solid black',              
    borderColor:'#c2c5c5',
    borderBottom:'3px solid gray',
    textAlign: 'center'
  }
 
    return (
        <div className="container px-2 py-3 ">
            <h3 className="m-2 ">أرصدة الإجازات</h3>
            <TableContainer   component={Paper} sx={{ maxHeight: 390,  overflowX: 'auto',display:'block'   }}    >
                <Table aria-label="simple table" sx={{  width:'100%'  }}>
                    <TableHead   className="border border-danger p-2" >
                        <TableRow sx={{ backgroundColor: '#d3d9db',fontSize:'20px', }}>
                            <TableCell sx={style_Cell}>#</TableCell>
                            <TableCell sx={style_Cell}>الموظف</TableCell>
                            <TableCell sx={style_Cell}>نوع الإجازة</TableCell>
                            <TableCell sx={style_Cell}>عدد الأيام الكلي</TableCell>
                            <TableCell sx={style_Cell}>المستَخدم</TableCell>
                            <TableCell sx={style_Cell}>المتبقي</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaveBalances.length > 0 ? (
                            leaveBalances.map((balance, index) => (
                                <TableRow key={balance.id}>
                                    <TableCell sx={body_Cell}>{index + 1}</TableCell>
                                    <TableCell sx={body_Cell}>{balance.employee?.name || "غير معروف"}</TableCell>
                                    <TableCell sx={body_Cell}>{balance.leave_type?.name || "غير معروف"}</TableCell>
                                    <TableCell sx={body_Cell}>{balance.total_days}</TableCell>
                                    <TableCell sx={body_Cell}>{balance.used_days}</TableCell>
                                    <TableCell sx={body_Cell}>{balance.remaining_days}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                           {     leaveBalances ?
                                <TableCell colSpan="6">Loading ...</TableCell>
                               : <TableCell colSpan="6">لا توجد بيانات أرصدة إجازات.</TableCell>
                             }
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>  
        </div>
    );
};


