import React from 'react'
import './UserLogin.css'
import googleIcon from './../Assets/google_logo-google_icongoogle-512.png'

const UserLogin = () => {
    return (
        <div className='userlogin-container'>
            <div className="login-sec">
                <h1 id='already-regged-lbl'>Already Registered? <br /> Sign In,</h1>
                <div className="login-form">
                    <label htmlFor="loginEmail">Email:</label>
                    <input type="email" name="loginEmail" id="loginEmail" placeholder='Enter your email address' />
                    <label htmlFor="loginPassword">Password:</label>
                    <input type="password" name="loginPassword" id="loginPassword" placeholder='Enter your password' />
                </div>
                <div className="login-btns">
                    <button id='signInBtn'>Sign In</button>
                    <button id='googleBtn'>
                        <img src={googleIcon} alt="Google Icon" />
                        Sign In with Google</button>
                </div>
                <p id='forgot-pass-lbl'>Forgot Password? <span>Click Here</span></p>
            </div>
            <div className="register-sec">
                <h1 id='donthave-account-lbl'>Don't have an account? <br /> Register Here!</h1>
                <div className="register-form">
                    <label htmlFor="registerName">Name:</label>
                    <input type="text" name="registerName" id="registerName" placeholder='Enter your name' />
                    <label htmlFor="registerEmail">Email:</label>
                    <input type="email" name="registerEmail" id="registerEmail" placeholder='Enter an email address' />
                    <label htmlFor="registerPassword">Password:</label>
                    <input type="password" name="registerPassword" id="registerPassword" placeholder='Enter a password' />
                </div>
                <div className="register-btns">
                    <button id='registerBtn'>Sign Up</button>
                    <button id='googleRegBtn'>
                        <img src={googleIcon} alt="Google Icon" />
                        Sign Up with Google</button>
                </div>
            </div>
        </div>
    )
}

export default UserLogin
