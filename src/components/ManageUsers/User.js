import { useEffect, useState } from "react"
import './User.scss'
import { fetchAllUsers } from '../../services/userService'
import ReactPaginate from 'react-paginate';

const Users = (props) => {
    const [listUser, setListUser] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(3)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        fetchUsers()
    }, [currentPage])

    const fetchUsers = async () => {
        let res = await fetchAllUsers(currentPage, currentLimit)
        console.log('check res: ', res)
        if (res && res.data && +res.data.EC === 0) {
            setTotalPages(res.data.DT.totalPage)
            setListUser(res.data.DT.users)
        }
    }

    // Invoke when user click to request another page.
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1)
    }

    return (
        <>
            <div className="container">

                <div className="manage-user-container">
                    <div className="user-header">
                        <div className="title">
                            <h3>Table User</h3>
                        </div>
                        <div className="actions">
                            <button className="btn btn-primary">Refresh</button>
                            <button className="btn btn-success">Add new user</button>
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
                                                    <td>{index + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.Group ? item.Group.name : ''}</td>
                                                    <td>
                                                        <button className="btn btn-warning">Edit</button>
                                                        <button className="btn btn-danger">Delete</button>
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

        </>
    )
}

export default Users