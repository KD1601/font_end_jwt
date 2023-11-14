import './App.scss';
import NavHeader from './components/Navigation/NavHeader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRouters from './routes/AppRoutes';
import {
  BrowserRouter,
} from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import { Rings } from 'react-loader-spinner'
import { UserContext } from './context/UserContext';

function App() {
  const { user } = useContext(UserContext)

  return (
    <>
      <BrowserRouter>
        {user && user.isLoading ?
          <div className='loading-container'>
            <Rings
              height="80"
              width="80"
              radius="9"
              color='#1877f2'
              ariaLabel='three-dots-loading'
              wrapperStyle
              wrapperClass
            />
            <div>Loading data...</div>
          </div>

          :
          <>
            <div className='app-header'>
              <NavHeader />
            </div>
            <div className='app-container'>
              <AppRouters />
            </div>
          </>
        }

        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>

    </>
  );
}

export default App;
