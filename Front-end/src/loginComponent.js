// src/LoginComponent.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import API_BASE_URL from './config';

const LoginComponent = () => {
    const navigate = useNavigate();
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Check if the user is already logged in
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            navigate('/home'); // Redirect to home if logged in
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mobile_number: mobileNumber,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Logged in successfully');
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                localStorage.setItem('userName', data.user.name); // Adjust according to your API response
                localStorage.setItem('userMobile', data.user.mobile_number);
                navigate('/home'); // Redirect to home page
            } else {
                setMessage(data.message || 'Error logging in');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Network error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {message && <p>{message}</p>}
            <p>
                Don't have an account? <a href="/register">Register</a>
            </p>
        </div>
    );
};

export default LoginComponent;
