import './Register.scss'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { registerNewUser } from '../../services/userService'

const Register = (props) => {
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput)
    let history = useHistory()
    const handleLogin = () => {
        history.push('/login')
    }

    useEffect(() => {
        // axios.get("http://localhost:8081/api/v1/test-api").then(data => {
        //     console.log('check data: ', data)
        // })

    }, [])

    const isValidInputs = () => {
        setObjCheckInput(defaultValidInput)
        if (!email) {
            toast.error('Email is required')
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false })
            return false
        }

        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            toast.error('Please enter a valid email address')
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false })
            return false
        }

        if (!phone) {
            toast.error('Phone is required')
            setObjCheckInput({ ...defaultValidInput, isValidPhone: false })

            return false

        }
        if (!username) {
            toast.error('Username is required')
            return false

        }
        if (!password) {
            toast.error('Password is required')
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false })
            return false
        }
        if (password !== confirmPassword) {
            toast.error('Password is not the same')
            setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false })
            return false
        }


        return true
    }

    const handleRegister = async () => {
        let check = isValidInputs()
        if (check) {
            let res = await registerNewUser(email, phone, username, password)
            let serverData = res.data
            if (+serverData.EC === 0) {
                toast.success(serverData.EM)
                history.push('/login')
            } else {
                toast.error(serverData.EM)
            }
        }
    }

    return (
        <div className="register-container ">
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

                        <div className='form-group'>
                            <label for="email">Email</label>
                            <input id='email' className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'} type="text" placeholder='Email address'
                                value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label for="phone">Phone number</label>
                            <input id='phone' className={objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'} type="text" placeholder='Phone number'
                                value={phone} onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label for="username">Username</label>
                            <input id='username' className='form-control' type="text" placeholder='Username'
                                value={username} onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label for="password">Password</label>
                            <input id='password' className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'} type="password" placeholder='Password'
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label for="re-pass">Re-enter Password</label>
                            <input id='re-pass' className={objCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'} type="password" placeholder='Password'
                                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button className='btn btn-primary'
                            onClick={() => handleRegister()}
                        >Register</button>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleLogin()}>Already have an account. Login</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Register