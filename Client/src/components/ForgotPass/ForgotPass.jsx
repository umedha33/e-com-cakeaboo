import React, { useState } from 'react';
import './ForgotPass.css';

const ForgotPass = () => {
    const [email, setEmail] = useState('');

    const handleReset = () => {
        if (!email) {
            window.alert("Fill Require Fields")
            return
        }
        alert('Check your mail to reset your password');
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div className="forgot-container">
            <div className="forgot-pass-container">
                <h2>RESET PASSWORD</h2>
                <label id='rst-ps-lbl'>Provide your email address here</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleChange}
                />
                <button onClick={handleReset}>Reset</button>
            </div>
        </div>
    );
};

export default ForgotPass;
