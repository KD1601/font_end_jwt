import './App.scss';
import Nav from './components/Navigation/Nav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRouters from './routes/AppRoutes';
import {
  BrowserRouter,
} from "react-router-dom";
import { useEffect, useState } from 'react';

function App() {
  const [account, setAccount] = useState('')
  useEffect(() => {
    let session = sessionStorage.getItem('account')
    if (session) {
      setAccount(JSON.parse(session))
    }
  }, [])
  return (
    <>
      <BrowserRouter>
        <div className='app-header'>
          <Nav />
        </div>
        <div className='app-container'>
          <AppRouters />
        </div>
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
