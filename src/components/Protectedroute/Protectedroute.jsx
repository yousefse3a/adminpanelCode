import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function Protectedroute({AdminToken}) {
  return (
    <>
    {AdminToken ? <Outlet/> : <Navigate to='/Login'/>}
    </>
  )
}
