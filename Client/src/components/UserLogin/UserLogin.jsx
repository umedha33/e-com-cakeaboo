import React, { useState } from 'react'
import './UserLogin.css'
import googleIcon from './../Assets/google_logo-google_icongoogle-512.png'

const UserLogin = () => {
    const [formData, setFormData] = useState({
        username: "",
        userpassword: "",
        useremail: ""
    })

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const login = async () => {
        console.log("Login Executed...", formData);
        let responseData;
        await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }).then((response) => response.json())
            .then((data) => responseData = data)

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/userdashboard");
        } else {
            alert(responseData.error)
        }
    }

    const register = async () => {
        console.log("Register Executed...", formData);
        let responseData;
        await fetch('http://localhost:4000/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }).then((response) => response.json())
            .then((data) => responseData = data)

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/userdashboard");
        } else {
            alert(responseData.error)
        }
    }

    const forgotFunc = () => {
        window.location.replace("/forgotpassword");
    }

    return (
        <div className='userlogin-container'>
            <div className="login-register-container">
                <div className="login-sec">
                    <h1 id='already-regged-lbl'>Already Registered? <br /> Sign In,</h1>
                    <div className="login-form">
                        <label htmlFor="loginEmail">Email:</label>
                        <input type="email"
                            name="useremail"
                            value={formData.useremail}
                            onChange={changeHandler}
                            id="loginEmail"
                            placeholder='Enter your email address' />
                        <label htmlFor="loginPassword">Password:</label>
                        <input type="password"
                            name="userpassword"
                            value={formData.userpassword}
                            onChange={changeHandler}
                            id="loginPassword"
                            placeholder='Enter your password' />
                    </div>
                    <div className="login-btns">
                        <button onClick={() => { login() }} id='signInBtn'>Sign In</button>
                        {/* <button id='googleBtn'>
                            <img src={googleIcon} alt="Google Icon" />
                            Sign In with Google</button> */}
                    </div>
                    <p id='forgot-pass-lbl'>Forgot Password? <span onClick={() => forgotFunc()}>Click Here</span></p>
                </div>
                <div className="register-sec">
                    <h1 id='donthave-account-lbl'>Don't have an account? <br /> Register Here!</h1>
                    <div className="register-form">
                        <label htmlFor="registerName">Name:</label>
                        <input type="text"
                            name="username"
                            value={formData.username}
                            onChange={changeHandler}
                            id="registerName"
                            placeholder='Enter your name' />
                        <label htmlFor="registerEmail">Email:</label>
                        <input type="email"
                            name="useremail"
                            value={formData.useremail}
                            onChange={changeHandler}
                            id="registerEmail"
                            placeholder='Enter an email address' />
                        <label htmlFor="registerPassword">Password:</label>
                        <input type="password"
                            name="userpassword"
                            value={formData.userpassword}
                            onChange={changeHandler}
                            id="registerPassword"
                            placeholder='Enter a password' />
                    </div>
                    <div className="register-btns">
                        <button onClick={() => { register() }} id='registerBtn'>Sign Up</button>
                        {/* <button id='googleRegBtn'>
                            <img src={googleIcon} alt="Google Icon" />
                            Sign Up with Google</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLogin
