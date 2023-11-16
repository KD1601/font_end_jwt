import { useEffect, useState, forwardRef, useImperativeHandle } from "react"
import { fetchAllRole, deleteRole } from '../../services/roleService'
import { toast } from 'react-toastify'
import ReactPaginate from 'react-paginate';


const TableRole = forwardRef((props, ref) => {
    const [totalPages, setTotalPages] = useState(0)
    const [listRoles, setListRoles] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(5)

    useEffect(() => {
        getAllRoles()
    }, [currentPage])

    useImperativeHandle(ref, () => ({
        fetchListRoleAgain() {
            getAllRoles()
        }
    }))

    const getAllRoles = async () => {
        let data = await fetchAllRole(currentPage, currentLimit)
        if (data && data.EC === 0) {
            console.log(data)
            setTotalPages(data.DT.totalPage)
            setListRoles(data.DT.roles)
        }
    }

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1)
    }

    const handleDeleteRole = async (role) => {
        let data = await deleteRole(role)
        if (data && data.EC === 0) {
            toast.success(data.EM)
        }
        await getAllRoles()
    }

    return (<>
        <table className="table table-hover table-bordered">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Url l</th>
                    <th scope="col">Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {listRoles && listRoles.length > 0 ?
                    <>
                        {listRoles.map((item, index) => {
                            return (
                                <tr key={`row-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.url}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <span className="delete" title="Delete"
                                            onClick={() => handleDeleteRole(item)}
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
                            <td colSpan={4}>Not found role</td>
                        </tr>
                    </>
                }


            </tbody>
        </table>
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
    </>)
})

export default TableRole