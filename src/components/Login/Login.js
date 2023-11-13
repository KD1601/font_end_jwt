import './Login.scss'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { loginUser } from '../../services/userService'

const Login = (props) => {
    let history = useHistory()

    const [valueLogin, setValueLogin] = useState('')
    const [password, setPassword] = useState('')


    const defaultObjValidInput = {
        isValidUsername: true,
        isValidPassword: true,
    }
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput)

    const handleCreateNewAccount = () => {
        history.push('/register')
    }

    const handleLogin = async () => {
        setObjValidInput(defaultObjValidInput)
        if (!valueLogin) {
            setObjValidInput({ ...defaultObjValidInput, isValidUsername: false })
            toast.error('Please enter your email address or phone number')
            return
        }
        if (!password) {
            setObjValidInput({ ...defaultObjValidInput, isValidPassword: false })
            toast.error('Please enter your password')
            return

        }
        let res = await loginUser(valueLogin, password)
        if (res && +res.EC === 0) {
            let data = {
                isAuthenticated: true,
                token: 'fake token'
            }
            sessionStorage.setItem('account', JSON.stringify(data))
            history.push('/users')
            window.location.reload()
        }
        if (res && +res.EC !== 0) {
            toast.error(res.EM)
        }
    }

    const handlePressEnter = (e) => {
        if (e.charCode === 13 && e.code === "Enter") {
            handleLogin()
        }
    }

    useEffect(() => {
        let session = sessionStorage.getItem('account')
        if (session) {
            history.push('/')
            window.location.reload()
        }
    }, [])

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
                        <input className={objValidInput.isValidUsername ? 'form-control' : 'form-control is-invalid'} type="text"
                            value={valueLogin} onChange={(e) => setValueLogin(e.target.value)}
                            placeholder='Email address or phone number' />
                        <input className={objValidInput.isValidPassword ? 'form-control' : 'form-control is-invalid'} type="password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                            onKeyPress={(e) => handlePressEnter(e)}
                        />
                        <button className='btn btn-primary'
                            onClick={() => handleLogin()}
                        >Login</button>
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