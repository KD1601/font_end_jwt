// import axios from 'axios'
import axios from '../setup/axios'

const createRole = (roles) => {
    return axios.post('/api/v1/role/create', [...roles])
}

const fetchAllRole = (page, limit) => {
    return axios.get(`/api/v1/role/read?page=${page}&limit=${limit}`)
}

const deleteRole = (role) => {
    return axios.delete('/api/v1/role/delete', { data: { id: role.id } })
}

const fetchRoleByGroup = (groupId) => {
    return axios.get(`/api/v1/role/by-group/${groupId}`)

}

const assignRolesToGroup = (data) => {
    return axios.post('/api/v1/role/assign-to-group', { data })

}

export {
    createRole, fetchAllRole, deleteRole, fetchRoleByGroup,
    assignRolesToGroup
}