import './Login.scss'
import { useHistory } from 'react-router-dom'

const Login = (props) => {
    let history = useHistory()
    const handleCreateNewAccount = () => {
        history.push('/register')
    }

    return (
        <div className="login-container ">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-12 col-sm-7 d-none d-sm-block">
                        <div className='title'>
                            Felix Dev
                        </div>
                        <div className='detail'>
                            Learn JWT + React Hook
                        </div>
                    </div>
                    <div className="content-right d-flex flex-column gap-3 col-12 col-sm-5 py-3">
                        <div className='title d-sm-none'>
                            Felix Dev
                        </div>
                        <input className='form-control' type="text" placeholder='Email address or phone number' />
                        <input className='form-control' type="password" placeholder='Password' />
                        <button className='btn btn-primary'>Login</button>
                        <span className='text-center'><a href="#" className='forgot-password'>Forgot your password?</a></span>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleCreateNewAccount()}>Create new account</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login