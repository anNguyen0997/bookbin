import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { auth } from '../../../config/firebase'
import Home from '../home/Home'
import UserDashBoard from './UserDashboard/UserDashBoard'

const Dashboard = () => {

    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
      auth.onAuthStateChanged(user => {
        if (user) {
          setLoggedIn(true)
        } else {
          setLoggedIn(false)
        }
      })
    })

  return (
    <div className='bg-gray-500 w-full h-screen flex items-center justify-center'>

      {
        loggedIn
        ?
        <UserDashBoard />
        :
        <Home />
      }

    </div>
  )
}

export default Dashboard