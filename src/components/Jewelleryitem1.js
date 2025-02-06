import React from 'react'
// import noteContext from "../context/notes/noteContext"


const Jewelleryitem1 = (props) => {
    // const context = useContext(noteContext);
    // const {}=context;

    const { note } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                    <div className="card-body">
                        <h5 className="card-title">{note.jewelleryname}</h5>
                        <p className="card-text"> {note.description}</p>

                        {/* <a href="/" className="btn btn-primary">Go somewhere</a> */}
                    </div>
            </div>
        </div>
    )
}

export default Jewelleryitem1
