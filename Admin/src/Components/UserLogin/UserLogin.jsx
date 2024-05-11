import React, { useState } from 'react'
import './UserLogin.css'
// import googleIcon from './../Assets/google_logo-google_icongoogle-512.png'

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
            window.location.replace("/admindash");
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

    return (
        <div className='userlogin-container'>
            <div className="login-register-container">
                <div className="login-sec">
                    <h1 id='admin-lbl'>CAKE A BOO ADMIN</h1>
                    <div className="login-form">
                        <input type="email"
                            name="useremail"
                            value={formData.useremail}
                            onChange={changeHandler}
                            id="loginEmail"
                            placeholder='Enter your email address' />
                        <input type="password"
                            name="userpassword"
                            value={formData.userpassword}
                            onChange={changeHandler}
                            id="loginPassword"
                            placeholder='Enter your password' />
                    </div>
                    <div className="login-btns">
                        <button onClick={() => { login() }} id='signInBtn'>SIGN IN</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLogin
