import './GroupRole.scss'
import { useState, useEffect } from 'react'
import { fetchGroups } from '../../services/userService'
import { toast } from 'react-toastify'
import { fetchAllRole, fetchRoleByGroup, assignRolesToGroup } from '../../services/roleService'
import _ from 'lodash'

const GroupRole = () => {
    const [userGroups, setUserGroups] = useState([])
    const [selectGroup, setSelectGroup] = useState('')
    const [listRoles, setListRoles] = useState([])
    const [assignRolesByGroup, setAssignRolesByGroup] = useState([])

    useEffect(() => {
        getGroups()
        getAllRoles()
    }, [])

    const getGroups = async () => {
        let res = await fetchGroups()
        if (res && +res.EC === 0) {
            setUserGroups(res.DT)
        } else {
            toast.error(res.EM)
        }
    }

    const getAllRoles = async () => {
        let data = await fetchAllRole()
        if (data && data.EC === 0) {
            setListRoles(data.DT)
        }
    }

    const handleOnchangeGroup = async (value) => {
        setSelectGroup(value)
        if (value) {
            let data = await fetchRoleByGroup(value)
            if (data && data.EC === 0) {
                let result = buildDataByGroup(data.DT.Roles, listRoles)
                setAssignRolesByGroup(result)
            }
        }
    }

    const buildDataByGroup = (groupRoles, allRoles) => {
        let result = []
        if (allRoles && allRoles.length > 0) {
            allRoles.map((item, index) => {
                let obj = {}
                obj.url = item.url
                obj.id = item.id
                obj.description = item.description
                obj.isAssigned = false
                if (groupRoles && groupRoles.length > 0) {
                    obj.isAssigned = groupRoles.some(item => item.url === obj.url)
                }
                result.push(obj)
            })
        }
        return result
    }


    const handleSelectRole = (value) => {
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup)
        let foundIndex = _assignRolesByGroup.findIndex(item => +item.id === +value)
        if (foundIndex > -1) {
            _assignRolesByGroup[foundIndex].isAssigned = !_assignRolesByGroup[foundIndex].isAssigned
        }
        setAssignRolesByGroup(_assignRolesByGroup)
    }

    const buildDataToSave = () => {
        let result = {}
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup)
        result.groupId = +selectGroup
        let groupRoles = _assignRolesByGroup.filter(item => item.isAssigned === true)
        let finalGroupRoles = groupRoles.map(item => {
            let itemData = { groupId: +selectGroup, roleId: +item.id }
            return itemData
        })
        result.groupRoles = finalGroupRoles
        return result
    }

    const handleSave = async () => {
        let data = buildDataToSave()
        let res = await assignRolesToGroup(data)
        if (res && res.EC === 0) {
            toast.success(res.EM)
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className='group-role-container'>
            <div className='container'>
                <div className='container mt-3'>
                    <h4>Group Role: </h4>
                    <div className='assign-group-role'>
                        <div className='col-12 col-sm-6 form-group' >
                            <label>Select Group: (<span className='red'>*</span>):</label>
                            <select className='form-select' onChange={(e) => handleOnchangeGroup(e.target.value)}>
                                <option value=''>Please select your group</option>

                                {
                                    userGroups && userGroups.length > 0 &&
                                    userGroups.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                        )

                                    })
                                }

                            </select>
                        </div>
                    </div>
                    <hr />
                    {selectGroup &&
                        <div className='roles'>
                            <h5>Assign Roles: </h5>
                            {assignRolesByGroup && assignRolesByGroup.length > 0
                                &&
                                assignRolesByGroup.map((item, index) => {
                                    return (
                                        <div className="form-check" key={`list-role-${index}`}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={item.id}
                                                id={`list-role-${index}`}
                                                checked={item.isAssigned}
                                                onChange={(e) => handleSelectRole(e.target.value)} />
                                            <label className="form-check-label" htmlFor={`list-role-${index}`}>
                                                {item.url}
                                            </label>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    }
                    <div className='mt-3'>
                        <button className='btn btn-warning' onClick={() => handleSave()}>Save</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default GroupRole