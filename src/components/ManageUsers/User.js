import { useEffect, useState } from "react"
import './User.scss'
import { fetchAllUsers, deleteUser } from '../../services/userService'
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify'
import ModalDelete from './ModalDelete'
import ModalUser from "./ModalUser";

const Users = (props) => {
    const [listUser, setListUser] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(3)
    const [totalPages, setTotalPages] = useState(0)
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [dataModal, setDataModal] = useState({})
    const [isShowModalUser, setIsShowModalUser] = useState(false)
    const [actionModalUser, setActionModalUser] = useState('CREATE')
    const [dataModalUser, setDataModalUser] = useState({})

    useEffect(() => {
        fetchUsers()
    }, [currentPage])

    const fetchUsers = async () => {
        let res = await fetchAllUsers(currentPage, currentLimit)
        if (res && +res.EC === 0) {
            setTotalPages(res.DT.totalPage)
            setListUser(res.DT.users)
        }
    }

    // Invoke when user click to request another page.
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1)
    }

    const handleDeleteUser = async (user) => {
        setDataModal(user)
        setIsShowModalDelete(true)

    }

    const handleClose = () => {
        setIsShowModalDelete(false)
        setDataModal({})
    }

    const OnHideModalUser = async () => {
        setIsShowModalUser(false)
        setDataModalUser({})
        await fetchUsers()
    }


    const confirmDeleteUser = async () => {
        let response = await deleteUser(dataModal)
        if (response && +response.EC === 0) {
            toast.success(response.EM)
            await fetchUsers()
            setIsShowModalDelete(false)
        } else {
            toast.error(response.EM)
        }
    }

    const handleShowModalUser = () => {
        setIsShowModalUser(true)
    }

    const handleEditUser = (user) => {
        setActionModalUser("UPDATE")
        setDataModalUser(user)
        setIsShowModalUser(true)
    }

    const handleRefresh = async () => {
        await fetchUsers()
    }

    return (
        <>
            <div className="container">

                <div className="manage-user-container">
                    <div className="user-header">
                        <div className="title mt-3">
                            <h3>Manage User</h3>
                        </div>
                        <div className="actions my-3">
                            <button
                                onClick={() => handleRefresh()}
                                className="btn btn-primary refresh"><i className="fa fa-refresh"></i>Refresh</button>
                            <button className="btn btn-success" onClick={
                                () => {
                                    handleShowModalUser();
                                    setActionModalUser('CREATE')
                                }}><i className="fa fa-plus-circle"></i>
                                Add new user</button>
                        </div>
                    </div>
                    <div className="user-body">
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Id</th>
                                    <th scope="col">Email l</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Group</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUser && listUser.length > 0 ?
                                    <>
                                        {listUser.map((item, index) => {
                                            return (
                                                <tr key={`row-${index}`}>
                                                    <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.Group ? item.Group.name : ''}</td>
                                                    <td>
                                                        <span className="edit" title="Edit"
                                                            onClick={() => handleEditUser(item)}>
                                                            <i className="fa fa-pencil"></i>
                                                        </span>
                                                        <span className="delete" title="Delete"
                                                            onClick={() => handleDeleteUser(item)}
                                                        >
                                                            <i className="fa fa-trash"></i>
                                                        </span>
                                                    </td>
                                                </tr>
                                            )
                                        })}

                                    </>
                                    :
                                    <>
                                        <tr>
                                            <td>Not found user</td>
                                        </tr>
                                    </>
                                }


                            </tbody>
                        </table>
                    </div>
                    {totalPages > 0 &&
                        <div className="user-footer">
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPages}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    }

                </div>
            </div>
            <ModalDelete show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModal={dataModal}
            />
            <ModalUser
                onHide={OnHideModalUser}
                show={isShowModalUser}
                action={actionModalUser}
                dataModalUser={dataModalUser}
            />
        </>
    )
}

export default Users