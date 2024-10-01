import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import API_BASE_URL from './config';

const RegisterComponent = () => {
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleRegister = async (e) => {
        e.preventDefault();

        // Basic validation
        if (password !== passwordConfirmation) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    mobile_number: mobileNumber,
                    password,
                    password_confirmation: passwordConfirmation,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Registered successfully');
                navigate('/login'); // Redirect to login page
            } else {
                setMessage(data.message || 'Error registering user');
            }
        } catch (error) {
            setMessage('Error registering user');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Register</h2>
            <form onSubmit={handleRegister} style={styles.form}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
            <p>
                Already have an account? <a href="/login">Login</a>
            </p>
        </div>
    );
};

// Styles for centering the form
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px', // Space between input fields
        width: '300px', // Fixed width for the form
    },
};

export default RegisterComponent;
