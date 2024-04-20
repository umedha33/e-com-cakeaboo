import React, { useState } from 'react'
import './CSS/MyAccountPage.css'
import UserLogin from '../components/UserLogin/UserLogin'
import UserDashboard from '../components/UserDashboard/UserDashboard'

const MyAccountPage = () => {
  return (
    <div className='my-account-container'>
      {localStorage.getItem('auth-token') ? <UserDashboard /> : <UserLogin />}
    </div>
  )
}

export default MyAccountPage
