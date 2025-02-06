import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"
import Jewelleryitem from './Jewelleryitem';
import AddJewellery from './AddJewellery';

const Jewellery = () => {
    const context = useContext(noteContext);
    const {notes, addJewellery}= context;
  return (
    <>
    <AddJewellery/>
    <div className="row my-3">
    <h2>Your Jewellery</h2>
    {notes.map((note)=>{
      return <Jewelleryitem key={note._id} note={note}/>
    })}
  </div>
    </>
  )
}

export default Jewellery
