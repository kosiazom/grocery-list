import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'


const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  //getItem( ) will return the keys value or null if the key does not exist
  if(list) {
    return JSON.parse(localStorage.getItem('list'))
  }
  else {
    return []
  }
}

function App() {
  const [name, setName] = useState("");
  // const [list, setList] = useState([]);
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
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
    setList(list.map((item) => {
      if(item.id === editID) {
        return {...item, title:name}
      }
      return item
    }))
    //reset everything back to default
    setName("");
    setEditId(null);
    setIsEditing(false);
    showAlert(true, 'success', "value changed!")
   } //if there is something in the value and isEditting is true then display alerts
   else {
     showAlert(true, 'success', 'item added to the list!')
     const newItem = {id: new Date().getTime().toString(), title: name};
     setList([...list, newItem]);
     setName('') // this clears the form
    
   }
  }
// this function below is ES6 and th arguments can take p
  const showAlert = (show=false, type="", msg="") => {
    setAlert({ show, type, msg })

  }

  const clearList = () => {
    showAlert(true, 'danger', 'empty list')
    setList([])
  }

  const removeItem =(id) => {
    showAlert(true, 'danger', 'item removed')
    setList(list.filter(item => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id );
    console.log(specificItem.title)
    setIsEditing(true);
    setEditId(id)
    setName(specificItem.title) //this is paste the name into the input form 
  }


  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list)) //setitem is a method for localStorage takes a key and value pair
     // return () => {
     //   cleanup
     // }
   }, [list])

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
      <List  items={list} 
             removeItem={removeItem}
             editItem={editItem}/>
      <button className="clear-btn" 
              onClick={() => clearList()} 
              >
        clear items
      </button>
    </div>
    )}
  </section>
}

export default App
