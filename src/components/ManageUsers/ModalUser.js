import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react'
import { fetchGroups, createNewUser, updateCurrentUser } from '../../services/userService'
import { toast } from 'react-toastify'
import _ from "lodash"

const ModalUser = (props) => {
    const { action, dataModalUser } = props
    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        address: '',
        sex: '',
        group: ''
    }

    const validInputsDefault = {
        email: true,
        phone: true,
        password: true,
        address: true,
        sex: true,
        group: true
    }

    const [userData, setUserData] = useState(defaultUserData)
    const [userGroups, setUserGroups] = useState([])
    const [validInputs, setValidInputs] = useState(validInputsDefault)

    useEffect(() => {
        getGroups()
    }, [])

    useEffect(() => {
        if (action === 'UPDATE') {
            setUserData({ ...dataModalUser, group: dataModalUser.Group ? dataModalUser.Group.id : '' })
        }
    }, [dataModalUser])

    useEffect(() => {
        if (action === 'CREATE') {
            if (userGroups && userGroups.length > 0) {
                setUserData({ ...userData, group: userGroups[0].id })
            }
        }
    }, [action])

    const getGroups = async () => {
        let res = await fetchGroups()
        if (res && +res.EC === 0) {
            setUserGroups(res.DT)
            if (res.DT && res.DT.length > 0) {
                let group = res.DT
                setUserData({ ...userData, group: group[0].id })
            }
        } else {
            toast.error(res.EM)
        }
    }

    const handleOnchangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData) // clone userData
        _userData[name] = value
        setUserData(_userData)
    }

    const checkValidate = () => {
        if (action === 'UPDATE') return true
        setValidInputs(validInputsDefault)
        let arr = ['email', 'phone', 'password', 'group']
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInputs = _.cloneDeep(validInputsDefault)
                _validInputs[arr[i]] = false
                setValidInputs(_validInputs)
                toast.error(`Empty input: ${arr[i]}`)
                return false
            }
        }
        return true
    }

    const handleConfirmUser = async () => {
        let check = checkValidate()
        if (check) {

            let res = action === 'CREATE' ?
                await createNewUser({ ...userData, groupId: userData.group })
                : await updateCurrentUser({ ...userData, groupId: userData.group })
            if (res && +res.EC === 0) {
                props.onHide()
                setUserData({
                    ...defaultUserData, group: userGroups && userGroups.length > 0 ?
                        userGroups[0].id : ''
                })
            }
            if (res && res.EC !== 0) {
                toast.error(res.EM)
                let _validInputs = _.cloneDeep(validInputsDefault)
                _validInputs[res.DT] = false
                setValidInputs(_validInputs)
            }
        }
    }

    const handleCloseModalUser = () => {
        props.onHide()
        setUserData(defaultUserData)
        setValidInputs(validInputsDefault)
    }

    return (
        <>
            <Modal show={props.show} centered size="lg" className='modal-user' onHide={() => handleCloseModalUser()}>
                <Modal.Header closeButton>
                    <Modal.Title><span>{props.action === 'CREATE' ? 'Create new user' : 'Edit a user'}</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='col-12 col-sm-6 form-group' >
                            <label>Email address (<span className='red'>*</span>):</label>
                            <input disabled={action === 'CREATE' ? false : true} className={validInputs.email ? 'form-control' : 'form-control is-invalid'} type="email" value={userData.email}
                                onChange={(e) => handleOnchangeInput(e.target.value, 'email')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group' >
                            <label>Phone number (<span className='red'>*</span>):</label>
                            <input
                                disabled={action === 'CREATE' ? false : true}
                                className={validInputs.phone ? 'form-control' : 'form-control is-invalid'} type="text" value={userData.phone}
                                onChange={(e) => handleOnchangeInput(e.target.value, 'phone')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group' >
                            <label>Username: </label>
                            <input className='form-control ' type="text" value={userData.username}
                                onChange={(e) => handleOnchangeInput(e.target.value, 'username')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group' >
                            {action === 'CREATE'
                                &&
                                <>
                                    <label>Password (<span className='red'>*</span>):</label>
                                    <input className={validInputs.password ? 'form-control' : 'form-control is-invalid'} type="password" value={userData.password}
                                        onChange={(e) => handleOnchangeInput(e.target.value, 'password')}
                                    />
                                </>
                            }
                        </div>

                        <div className='col-12 col-sm-12 form-group' >
                            <label>Address (<span className='red'>*</span>):</label>
                            <input className={validInputs.address ? 'form-control' : 'form-control is-invalid'} type="text" value={userData.address}
                                onChange={(e) => handleOnchangeInput(e.target.value, 'address')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group' >
                            <label>Gender:</label>
                            <select className='form-select' value={userData.sex}
                                onChange={(e) => handleOnchangeInput(e.target.value, 'sex')}
                            >
                                <option selected defaultValue='Male'>Male</option>
                                <option value='Female'>Female</option>
                                <option value='Other'>Other</option>
                            </select>
                        </div>
                        <div className='col-12 col-sm-6 form-group' >
                            <label>Group (<span className='red'>*</span>):</label>
                            <select
                                value={userData.group}
                                className={validInputs.group ? 'form-select' : 'form-select is-invalid'}
                                onChange={(e) => handleOnchangeInput(e.target.value, 'group')}
                            >
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModalUser()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmUser()}>
                        {action === 'CREATE' ? 'Save' : 'Update'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUser;