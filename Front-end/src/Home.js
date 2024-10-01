import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userMobile');
        navigate('/login'); // Redirect to login page
    };

    const userName = localStorage.getItem('userName');
    const userMobile = localStorage.getItem('userMobile');

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f0f0f0',
            position: 'relative',
        },
        heading: {
            margin: 0,
        },
        logoutButton: {
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '10px 15px',
            backgroundColor: '#ff4d4d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
    };

    return (
        <div style={styles.container}>
            <button style={styles.logoutButton} onClick={handleLogout}>
                Logout
            </button>
            <h1 style={styles.heading}>Welcome, {userName}!</h1>
            <h2 style={styles.heading}>Mobile Number: {userMobile}</h2>
            <h1 style={styles.heading}>Register & Login using</h1>
            <h2 style={styles.heading}>React and Node JS</h2>
        </div>
    );
};

export default Home;
