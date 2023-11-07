import Users from '../components/ManageUsers/User';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";
import PrivateRoutes from './PrivateRoutes';
const AppRouters = (props) => {
    const Project = () => {
        return (
            <div>
                Project component
            </div>
        )
    }

    return (
        <>
            <Switch>
                <PrivateRoutes path="/users" component={Users} />
                <PrivateRoutes path="/projects" component={Project} />
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
        </>
    )
}

export default AppRouters