import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, stIsEditing] = useState(false);
  const [editID, setEditId] = useState(null);
  const [alert, setAlert] = useState({
      show: false,
      msg: '', 
      type: ''})

  const handleSubmit = (e) => {
    e.preventDefault();
   if(!name) {
     // display the alert here! change the state here
    //  setAlert({
    //    show:true,
    //    msg: 'please enter value!',
    //    type: "danger"
    //  })
    showAlert(true, "danger", "please enter value")

   } else if( name && isEditing ){

   } //if there is something in the value and isEditting is true then display alerts
   else {
     //show alert
     const newItem = {id: new Date(). getTime().toString(), title: name};
     setList([...list, newItem]);
     setName('') // this clears the form
   }
  }
// this function below is ES6 and th arguments can take p
  const showAlert = (show=false, type="", msg="") => {
    setAlert({ show, type, msg })

  }

  return <section className="section-center">
    <form className="grocery-form" onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} removeAlert={showAlert}/>}
      <h3>grocery bud</h3>
      <div className='form-control'>
        <input type="text" 
               className='grocery' 
               placeholder="e.g. bananas"
               value={name}
               onChange={ (e) => setName(e.target.value) } />
        <button type="submit" className='submit-btn'>
          {isEditing ? "edit"  : "Submit"}
        </button>
      </div>
    </form>
    {list.length > 0 && (

    <div className="grocery-container">
      <List  items={list}/>
      <button className="clear-btn">
        clear items
      </button>
    </div>
    )}
  </section>
}

export default App
