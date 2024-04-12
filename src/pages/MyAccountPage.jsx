import React from 'react'
import './CSS/MyAccountPage.css'
import UserLogin from '../components/UserLogin/UserLogin'
import UserDashboard from '../components/UserDashboard/UserDashboard'

const MyAccountPage = () => {
  return (
    <div className='my-account-container'>
      {/* <UserLogin /> */}
      <UserDashboard />
    </div>
  )
}

export default MyAccountPage
