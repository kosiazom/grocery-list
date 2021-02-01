import React, { useEffect } from 'react'

const Alert = ({type, msg, removeAlert}) => {

useEffect(() => {
  //we want this to happen when we render the page so we use useEffect
  const timeout = setTimeout(() => {
    removeAlert()
  }, 3000);
  return () => clearTimeout(timeout)
}, [])

  return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert
