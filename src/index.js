import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
 
import App from './App';
import MenuContext from './Component/Context/MenuContext';
import WindowContext from './Component/Context/WindowContext';
import '../src/pages/Home/home.css'
import './index.css';
import './Css/components/select.css';

import { UserProvider } from './Component/Context/UserProvider';
 
 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // UserProvider
  // <React.StrictMode>
    <WindowContext>
      <MenuContext>
        <UserProvider>
          <App /> 
        </UserProvider>
      </MenuContext>
    </WindowContext>
  // </React.StrictMode>
);

 
