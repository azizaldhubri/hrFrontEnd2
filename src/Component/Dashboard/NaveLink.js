import { faPlus, faUsers,  } from '@fortawesome/free-solid-svg-icons'
 

export const Links=[
    {
        name:'إدارة الموارد البشرية',
        path:'users',
        icon:faUsers,
        role:['1995','2001','2002']
        
    },
    {
        name:'Users',
        path:'users',
        icon:faUsers,
        role:['1995','2001','2002']
        
    },
    {
        name:'Add User',
        path:'user/add',
        icon:faPlus,
        role:'1995'        
    }
    
    ,
    {
        name:'Taskes',
        path:'taskes',
        icon:faPlus,
        role:'1995'        
    },  
 
  
    {
        name:'Writer',
        path:'writer',
        icon:faPlus,
        role:['1995' ,'1996']        
    },
   
];

export const taplink=[
   {maintitle:'إدارة الموارد البشرية',link:'#',
    permission:'موارد بشرية',
     img:'Mask Group 75.png',   
    subtitle:[
        {link:'users',title:'الموظفين'}
                , {link:'EmployeeChart',title:'البيانات'},               
                , {link:'adduser',title:'اضافة موظف'},               
                // {link:'Salaries',title:'المرتبات'},
        //   {link:'#',title:'نقل الموظفين'}
        ]         
     
   },

//    
   {maintitle:'إدارة الإجازات',link:'#', permission:'مهام الإدارات',img:'Mask Group 78.png' ,   
    subtitle:[  {link:'LeavesType',title:'انواع الإجازة' },  {link:'AddLeavesRequst',title:'طلب إجازة جديد' },  
        {link:'Leaves',title:'الإجازات'},{link:'LeavesRequestsManegment',title:'إدارة طلبات الاجازة'},        
        {link:'LeaveBalancesTable',title:'عرض أرصدة الاجازات'},              
   ]},

   {maintitle:'إدارة المرتبات',permission:'إدارة المرتبات', img:'Mask Group 73.png',   
    subtitle:[      
        {link:'payrolls',title:"المرتبات"},          
        {link:'AddAllowances',title:"إضافة حافز"},
        {link:'AddAdvance',title:"إضافة سلفة"},
        {link:'ViewDeduction',title:"عرض الخصومات لموظف"},
        {link:'ViewAllowances',title:"عرض الحوافز لموظف"},
        // {link:'FinancialTransactions',title:"الحركات المالية"},
        // {link:'AddTransaction',title:"إضافة حركة مالية"},
        {link:'AddDeductions',title:"إضافة خصم او غياب"},
         
       
        
             
   ]},
   {maintitle:'إدارة المهام',link:'#', permission:'مهام الإدارات',img:'Mask Group 78.png' ,   
    subtitle:[{link:'addtask',title:'جديد'}, {link:'Taskes1',title:'الوارد'},
       
               
   ]},

   {maintitle:'المستندات',permission:'المستندات',img:'Mask Group 73.png',    
    subtitle:[      
       {link:'AddDocument',title:"اضافة مستند"
        ,role:['1995','2001']},{link:'documents',title:"استعراض"},{link:'OrderDocument',title:"سندات الأمر" }      
   ]},


   {maintitle:'إدارة الاقسام',permission:'إدارةالاقسام', img:'Mask Group 73.png',   
    subtitle:[      
        {link:'Departments',title:"الاقسام"},
        {link:'AddDepartment',title:"إضافة قسم"},
        {link:'Appi',title:"Appi"},
             
   ]},

  
   {maintitle:'الإعدادات',permission:'الصلاحيات',  img:'Mask Group 83.png',   
    subtitle:[  
        {title: "الصلاحيات",link:'Role' },
        {title: "نموذج جديد",link:'#', },{title: "ادارة النماذج",link:'#' },
        {title: "محرر العقود",link:'#', },{title: "إعدادات المهام",link:'#' },
        {title: "إعدادات عامة",link:'#', }, 
            
   ]},

 

 



]
 
