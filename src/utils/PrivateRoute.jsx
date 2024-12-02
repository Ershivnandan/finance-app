import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = ({children}) => {
    const {user} = useAuth();
    const accessToken = localStorage.getItem("accessToken")
  
    return user || accessToken ? children : <Navigate to={'/login'}/>
}

export default PrivateRoute
