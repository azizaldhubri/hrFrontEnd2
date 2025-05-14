import './style _TopAndSidBar.css'
import { useContext, useState } from 'react';
import { Menu } from '../Context/MenuContext';   
import { Link } from 'react-router-dom';
import {  List, ListItem, ListItemIcon, ListItemText, Collapse,Box } from '@mui/material';
import { taplink } from './NaveLink';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import  { WindowSize } from '../Context/WindowContext';

 export default function SideBar(){
    const menu=useContext(Menu)
const isOpen=menu.isOpen ;
const WindowContext=useContext(WindowSize)
const windowSize=WindowContext.windowSize;


const [openMain, setOpenMain] = useState(null);
const [openSub, setOpenSub] = useState({});

const [openSub2, setOpenSub2] = useState('');
const handleMainClickSub2 = (itemId) => {
  setOpenSub2(itemId );  
};



const handleMainClick = (itemId) => {
    setOpenMain(openMain === itemId ? null : itemId);
  
};

const handleSubClick = (mainItemId, subItemId) => {
    setOpenSub((prevState) => ({
        ...prevState,
        [mainItemId]: prevState[mainItemId] === subItemId ? null : subItemId,
    }));
     
  };

 

    return(

      <>
        <div className='w-100 ms-2 me-2'style={{                
                  position:'fixed',
                  top:'55',
                   left:'0' ,
                   width:'100%',
                   height:'100vh',
                   backgroundColor:'rgba(0 ,0 ,0 ,0.2)',
                   display:windowSize< '600' && isOpen ? 'block':'none',
                   zIndex:'5'
                  
                  }}>
        </div>
       
       
       <div className={`sidbar fade-div ${isOpen ? "visible" : "hidden"}`} 
            style={{minWidth:isOpen ?'265px':'0',width:'250px',height:'92vh',
            position:windowSize<600 ?'fixed':(isOpen?'sticky':'fixed' ),       
              top:55}}>
         
          <div className='w-00 border    p-2 fs-1 flex-center gap-5  d-flex align-items-center border   mt-2'
               style={{color:'black',background:'#0a6f9e'}}>                
              <Link to='/dashboard' style={{color:'black',textDecoration: 'none'}}>الرئيسية</Link>            
              <img src={require('../../img/hr7.png')} alt='' style={{ borderRadius:'100%',margin:'3px'}}height={75} width={75}></img>
          </div>
          <div >  
            <Box className='side-bar m-0  ' 
                  sx={{ width: '265px', height: '67vh',overflowY: 'auto',overflowX: 'hidden', 
                  '&::-webkit-scrollbar': {
                    width: '0px',  // إخفاء شريط التمرير في الوضع الافتراضي
                },
                '&:hover::-webkit-scrollbar': {
                    width: '9px',  // عرض شريط التمرير عند التعويم فوق الصندوق
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#f0f0f0', // لون الخلفية لمسار التمرير
                  
              },
              '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#888',   // لون شريط التمرير نفسه      
                  borderRadius: '20px',
                cursor:'pointer'
              },
              '&::-webkit-scrollbar-thumb:hover': {
                  backgroundColor: '#555',    // لون شريط التمرير عند التمرير عليه
                  // backgroundColor: 'red',    // لون شريط التمرير عند التمرير عليه
              },
                     }} >
              <List className=' p-0' >                             
                {taplink &&  taplink.map((item,index)=>                   
                <div key={index} className='  '>
                   <>    
                    <ListItem  
                    onClick={() => handleMainClick(index)}         
                        sx={{
                          textAlign: 'right',  
                          borderRadius:'4px', 
                          cursor:'pointer' , 
                          marginBottom:'8px',                
                          fontFamily:'Cairo, sans-serif ',           
                        backgroundColor: openMain === index ? '#6d95bd9d' : 'transparent',
                        '&:hover': { backgroundColor: '#6d95bd9d',color:'black' },
                      '& .MuiListItemText-primary': {
                          color: openMain === index && '#FFFFFF' ,
                            fontWeight: openMain === index ? 'bold' : 'bold',
                            }
                          }}          
                    >
                      <ListItemIcon sx={{ minWidth: '0px'}}>
                          {/* <img width='30px' src={require(`./../../Assets/img/${item.img}`)}></img>       */}      
                      </ListItemIcon>      
                        <ListItemText 
                        primary={item.maintitle}     
                          primaryTypographyProps={{ fontSize: '18px' }}      
                        sx={{paddingRight: '8px',}}    />     
                        {item.subtitle && ( openMain === index ? <ExpandLess sx={{color:'black'}}/> : <ExpandMore />)}
                    </ListItem>
                    <Collapse in={openMain === index} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {/* الفرع الفرعي 1-1 */}
                    {item.subtitle && item.subtitle.map((item2,index2)=>
                        <div key={index2}  style={{fontWeight:'bold',color:'#333333',textDecoration:'none'}}>
                               {/* <Link key={index2} to={`${item2.link}`} style={{fontWeight:'bold',color:'#333333',textDecoration:'none'}}> */}
                            <ListItem   onClick={() => handleSubClick(index, index2)}  
                              sx={{
                                textAlign: 'right',    
                                margin: '-6px',                   
                                padding:'7px',
                                paddingRight: '8px',
                              borderRadius:'4px',
                              width: '230px' ,                 
                              cursor:'pointer' ,
                              marginRight:'10px',
                              marginBottom:'8px',   
                          backgroundColor: openSub[index] === index2 ? '#9eafc09d' : 'transparent',
                          '&:hover': {            
                            backgroundColor: '#abb5c09d' , 
                            color:'black'  ,              
                          },
                          '& .MuiListItemText-primary': {
                              color: openSub[index] === index2 && ' black ',
                              fontWeight: 'bold',
                              fontSize:'18px'
                                }}}   >
                             <ListItemIcon sx={{ minWidth: '0px', margin: '0px', padding:'0px',paddingRight: '20px'  }}>                                    
                             </ListItemIcon>
                              <Link to={`${item2.link}`}>                                      
                                  <ListItemText primary={item.subtitle[index2].details? item2.title :item2.title}
                                      sx={{   paddingRight: '8px', }} />
                              </Link>
                                  {item.subtitle[index2].details && (openSub[index] === index2 ? <ExpandLess sx={{color:'black'}}/> : <ExpandMore />)}
                            </ListItem>
                          <Collapse in={openSub[index] === index2} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                                            
                              {/* الفرع الفرعي 1-2 */}
                              { item.subtitle[index2].details &&
                                item.subtitle[index2].details.map((item3,index3)=>
                               <Link key={index3} to={`${item3.link}`} style={{fontWeight:'bold',color:'black',textDecoration:'none'}}>
                                  <ListItem   sx={{ pl: 8 }}>
                                    <ListItemText primary={item3.title}
                                        onClick={()=>handleMainClickSub2(index3)}                    
                                        sx={{
                                          // border:'1px solid black',
                                          width:'180px' ,
                                          textAlign: 'center',
                                            padding:'5px',
                                      margin:'-6px',
                                      fontWeight:'bold',
                                      marginRight:'10px',
                                        borderRadius:'4px',
                                        cursor:'pointer' ,
                                      
                                        // color:'black',
                                        backgroundColor: openSub2 === index3 ? 'transparent' : 'transparent',
                                        '&:hover': {  color: '#2B60DE' },
                                      
                                        
                                        '& .MuiListItemText-primary': {
                                            color: openSub2===index3  && 'blue' ,
                                            fontWeight:  'bold'  ,
                                            fontSize:'17px',
                                          }
                                          
                                          }}    />
                                   </ListItem>
                               </Link>                         
                              
                                )
                              }                      
                            </List>
                          </Collapse>
              
                        </div>
                        
                      )
                    }           
                  
                  </List>
                    </Collapse>
                   </>              
                </div>
                 )}     
              </List>
           </Box>  
            
                  
          </div> 
      </div>
     </>
       
    )
 }