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
import { Scrollbars } from 'react-custom-scrollbars'

const App = () => {
  const { user } = useContext(UserContext)
  const [scrollHeight, setScrollHeight] = useState(0)
  useEffect(() => {
    let windowHeight = window.innerHeight
    setScrollHeight(windowHeight)
  }, [user])
  return (
    <Scrollbars atuoHide style={{ height: scrollHeight }}>

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
              wrapperClass='true'
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
          autoClose={3000}
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
    </Scrollbars>

  );
}

export default App;
