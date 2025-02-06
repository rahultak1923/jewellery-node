import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"
import Jewelleryitem1 from './Jewelleryitem1';

const AllJewellery = () => {
    const context = useContext(noteContext);
    const {notes}= context;
  return (
    <div>
      <div className="row my-3">
    <h2>Your Jewellery</h2>
    {notes.map((note)=>{
      return <Jewelleryitem1 key={note._id} note={note}/>
    })}
  </div>
    </div>
  )
}

export default AllJewellery
