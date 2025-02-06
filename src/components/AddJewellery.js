import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"


const AddJewellery = () => {
    const context = useContext(noteContext);
    const {addJewellery}= context;

    const [jewellery, setJewellery]= useState({jewelleryname:"", description:"",price:"",quantity:""})
    const handleclick=(e)=>{
        e.preventDefault(); // page reload na ho
        addJewellery(jewellery.jewelleryname, jewellery.description)
    }
    const onChange =(e)=>{
        setJewellery({...jewellery,[e.target.name]: e.target.value})
    }
  return (
    <div>
       <div className="mt-4">
      <h1>Add a Jewellery</h1>
      <form>
  <div className="mb-3">
    <label htmlFor="jewelleryname" className="form-label">Jewellery Name</label>
    <input type="text" className="form-control" id="jewelleryname" name='jewelleryname' aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name='description' onChange={onChange}/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={onChange}/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleclick}>Add Jewellery</button>
</form>

      </div>
    </div>
  )
}

export default AddJewellery
