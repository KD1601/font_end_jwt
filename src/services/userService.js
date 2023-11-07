import axios from 'axios'

const registerNewUser = (email, phone, username, password) => {
    return axios.post('http://localhost:8081/api/v1/register', {
        email, phone, username, password
    })
}

const loginUser = (username, password) => {
    return axios.post('http://localhost:8081/api/v1/login', {
        username, password
    })
}

export { registerNewUser, loginUser }