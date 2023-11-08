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

const fetchAllUsers = (page, limit) => {
    return axios.get(`http://localhost:8081/api/v1/users/read?page=${page}&limit=${limit}`)
}

export { registerNewUser, loginUser, fetchAllUsers }