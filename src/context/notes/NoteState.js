import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "6782a1041b535046cc15272c",
          "user": "67822e3c443e007b10fbe4ee",
          "jewelleryname": "kangan",
          "description": "this is a gun",
          "price": "4000",
          "quantity": "89",
          "date": "2025-01-11T16:49:08.624Z",
          "__v": 0
        },
        {
          "_id": "6782a1091b535046cc15272e",
          "user": "67822e3c443e007b10fbe4ee",
          "jewelleryname": "kangan ru",
          "description": "this is a gun",
          "price": "4000",
          "quantity": "89",
          "date": "2025-01-11T16:49:13.057Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(notesInitial)

      // Add a Jewellery
      const addJewellery = (jewelleryname,description,price,quantity)=>{
        const jewellery = {
          "_id": "6782a1091b535046cc15272e",
          "user": "67822e3c443e007b10fbe4ee",
          "jewelleryname": jewelleryname,
          "description": description,
          "price": "4000",
          "quantity": "89",
          "date": "2025-01-11T16:49:13.057Z",
          "__v": 0
        };
        setNotes(notes.concat(jewellery))
      }

      // Delete a jewellery
      const deleteJewellery = (id)=>{
        console.log("delete jewellery "+ id);
        const newJewellery = notes.filter((jewellery)=>{return jewellery._id!==id})
        setNotes(newJewellery)
      }

      // Edit a Jewellery
      const editJewellery = ()=>{
        
      }

    return(
        <NoteContext.Provider value={{notes, addJewellery,deleteJewellery,editJewellery}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;