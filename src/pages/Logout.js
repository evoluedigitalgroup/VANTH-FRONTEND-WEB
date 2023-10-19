import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {

    const Logouts = () =>{
        let navigate=useNavigate()
        localStorage.clear()
        setTimeout(() => {
            navigate('/login')
        }, 400);
    }

  return (
    <>
{Logouts()}
    </>
  )
}

export default Logout
