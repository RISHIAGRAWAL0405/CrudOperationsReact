import React, { useEffect } from 'react'
import { useState } from 'react';
export default function Child(props) {
  useEffect(() => {

    setUserInput((prev) => ({ ...prev, GuestName: props.rishi.GuestName, Mobile: props.rishi.Mobile, Email: props.rishi.Email, Mode: "", ProfileSerNo: props.rishi.ProfileSerNo }))
    setDeleteinput((prev) => ({ ...prev, GuestName: props.rishi.GuestName, Mobile: props.rishi.Mobile, Email: props.rishi.Email, Mode: "Delete", ProfileSerNo: props.rishi.ProfileSerNo }))
    getData();
  }, [props.rishi]);

  const [addEditButton, setAddEditButton] = useState({ addb: false, editb: true, editb: true, saveb: true, cancelb: true })
  const [inputb, setInputb] = useState(true)
  const [userInput, setUserInput] = useState({})
  const [guestDetails, setGuestDetails] = useState({ Name: "", Mobile: "", Email: "" })
  const [deleteinput, setDeleteinput] = useState({})

  const handlechangeemail = (e) => {
    setGuestDetails((prev) => ({ ...prev, Email: e.target.value }))
    setUserInput((prev) => ({ ...prev, Email: e.target.value }))
  }
  const handlechangemob = (e) => {
    setGuestDetails((prev) => ({ ...prev, Mobile: e.target.value }))
    setUserInput((prev) => ({ ...prev, Mobile: e.target.value }))
  }

  const handleChangegname = (e) => {
    setGuestDetails((prev) => ({ ...prev, Name: e.target.value }))
    setUserInput((prev) => ({ ...prev, GuestName: e.target.value }))
  }
  const getData = () => {
    setInputb(true)
    setAddEditButton((prev) => ({ ...prev, addb: false, editb: false, saveb: true, cancelb: true, deleteb: false }))
    setGuestDetails((prev) => ({ ...prev, Name: props.rishi.GuestName, Email: props.rishi.Email, Mobile: props.rishi.Mobile }))

  }

  const handleAdd = () => {
    setAddEditButton((prev) => ({ ...prev, deleteb: true, addb: true, editb: true, saveb: false, cancelb: false }))
    setInputb(false)
    setGuestDetails((prev) => ({ ...prev, Name: "", Email: "", Mobile: "" }))
    setUserInput((prev) => ({ ...prev, Mode: "Add" }))
  }
  const handleDelete = () => {
    setAddEditButton((prev) => ({ ...prev, deleteb: true, editb: true }))
    setAddEditButton((prev) => ({ ...prev, editb: true }))

    setGuestDetails((prev) => ({ ...prev, Name: "", Mobile: "", Email: "" }))
    console.log("handle delete is clicked")
    setUserInput((prev) => ({ ...prev, Mode: "Delete" }))
    props.onSubmit(deleteinput)
  }
  const handleSave = () => {

    if (userInput.GuestName == "") {
      alert("Please Enter name")
      return
    }
    else {
      console.log("Correct Name")
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userInput.Email)) {
      console.log("Valid email address!");

    }
    else {
      alert("wrong email")
      return
    }
    if (/^\d{10}$/.test(userInput.Mobile)) {
      console.log("correct mobile number")

    }
    else {
      alert("wrong mobile number")
      return
    }
    setAddEditButton((prev) => ({ ...prev, addb: false, editb: false, saveb: true, cancelb: true, deleteb: false }))
    setInputb(true)
    console.log("hi this is user input", userInput);
    props.onSubmit(userInput)
  };
  const handleCancel = () => {
    setGuestDetails((prev) => ({ ...prev, Mobile: userInput.Mobile, Name: userInput.GuestName, Email: userInput.Email }))
    setAddEditButton((prev) => ({ ...prev, addb: false, editb: false, saveb: true, cancelb: true, deleteb: false }))
    setInputb(true)
  }
  const handleEdit = () => {
    setAddEditButton((prev) => ({ ...prev, deleteb: false, addb: true, editb: true, saveb: false, cancelb: false }))
    setInputb(false)
    setUserInput((prev) => ({ ...prev, Mode: "Edit" }))
  }
  return (
    <span>CHILD
      <table style={{ position: "fixed", top: 150, left: 180 }}>
        <tr>
          <th>Guest Details</th>
        </tr>
        <tr >
          <td>
            <label for="fname">Name:</label>
            <input type="text" value={guestDetails.Name} onChange={handleChangegname} disabled={inputb} /></td>
        </tr>
        <tr>
          <td>
            <label for="fname">Mobile number:</label>
            <input value={guestDetails.Mobile} onChange={handlechangemob} disabled={inputb} /></td>
        </tr>
        <tr>
          <td>
            <label for="fname">Email:</label>
            <input type="email" id="email" name="email" value={guestDetails.Email} onChange={handlechangeemail} disabled={inputb} />
            <br></br>
            <button onClick={() => { handleAdd() }} disabled={addEditButton.addb} >ADD</button>
            <button onClick={() => { handleSave() }} type="submit" disabled={addEditButton.saveb}>Save</button>
            <button onClick={() => { handleEdit() }} disabled={addEditButton.editb}>Edit</button>
            <button onClick={() => { handleCancel() }} disabled={addEditButton.cancelb}>Cancel</button>
            <button onClick={() => { handleDelete() }} type="submit" disabled={addEditButton.deleteb}>Delete</button>
          </td>
        </tr>
      </table>
    </span>
  )
}
