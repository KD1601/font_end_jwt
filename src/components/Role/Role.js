import './Role.scss'
const Role = (props) => {
    return (
        <div className='role-container'>
            <div className='container'>
                <div className='mt-3'>
                    <div className='title-role '>
                        <h4>Add a new role...</h4>
                        <div className='role-parent'>
                            <div className='role-child row '>
                                <div className='col-5 form-group'>
                                    <label>URL: </label>
                                    <input type='text' className='form-control' />
                                </div>

                                <div className='col-5 form-group'>
                                    <label>Description: </label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='col-2 mt-4 actions'>
                                    <i className='fa fa-plus-circle add'></i>
                                    <i className='fa fa-trash-o delete'></i>
                                </div>
                            </div>
                            <div className="btn btn-warning mt-3">Save</div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Role