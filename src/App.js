import './App.scss';
import Nav from './components/Navigation/Nav';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className='app-container'>
          {/* <Nav /> */}
          <Switch>
            <Route exact path="/news">
              news
            </Route>
            <Route path="/users">
              users
            </Route>
            <Route path="/contact">
              contact
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/" exact>
              home
            </Route>
            <Route path="*">
              404 Not found
            </Route>
          </Switch>
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
