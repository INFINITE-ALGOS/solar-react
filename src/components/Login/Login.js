import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure to install axios if not already installed
import './Login.css';

function Login() {
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showForgotPasswordDialog, setShowForgotPasswordDialog] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState(null); // Define error state here

    const handleLogin = async (e) => {
        e.preventDefault();
        
         setError(null); // Clear any previous errors
        
        try {
            const response = await axios.post('http://localhost:5000/api/login', { // /login
                email,
                password
            });
//entry into anothers endpoint must not be allowed  
            if (response.data) {//this should be if the login PERSON IS SUPPLIER, TRAVERSE TO SUPPLIERPAGE, ETC.
                localStorage.setItem('token', response.data.token); // Store token locally
                if (response.data.type==='supplier')
                {navigate('/SuppliersPage');}
                else
                {navigate('/');}
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            setError(error.message || 'Invalid credentials');
        }
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleForgotPassword = () => {
        setShowForgotPasswordDialog(true);
    };

    const closeDialog = () => {
        setShowForgotPasswordDialog(false);
    };

    const sendPasswordChangeRequest = () => {
        // Simulate sending password change request
        setTimeout(() => {
            alert('Password change request sent successfully!');
            setShowForgotPasswordDialog(false);
        }, 1000);
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin
            }>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={email}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Login</button>
                    <span className="forgot-password" onClick={handleForgotPassword}>Forgot Password?</span>
                    <button className="signup-button" onClick={handleSignUp}>Sign Up</button>
                </div>
            </form>
            {/* Forgot Password Dialog */}
            <div id="forgot-password-dialog" style={{
                display: showForgotPasswordDialog ? 'block' : 'none',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxShadow: '0 0 10px rgba(0,0,0,0.2)'
            }}>
                <h3>Enter Your Email</h3>
                <input type="email" placeholder="Email Address" />
                <button onClick={sendPasswordChangeRequest} style={{
                    backgroundColor: '#3498db',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease'
                }}>Send Request</button>
                <div className="close-button" onClick={closeDialog}>cancel</div>
            </div>
        </div>
    );
}

export default Login;
