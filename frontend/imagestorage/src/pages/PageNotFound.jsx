import React from 'react'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {
    const navigate = useNavigate()
  return (
   <>
    <h1>page not found</h1>
    <p className='text-blue-900 cursor-pointer' onClick={() => navigate("/login")} >go to login</p>
   </>
  )
}

export default PageNotFound