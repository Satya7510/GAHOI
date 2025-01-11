import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axislogo from '../images/A app logo.jpg';

function Login() {
    const [values, setValues] = useState({
        username: "",
        Password: ""
    });

    const navigate = useNavigate();
    axios.defaults.withCredentials=true;


    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/login',values)
            .then(res=>{
                console.log(res.data.Status);
                if(res.data.Status==="Success"){
                    navigate('/gridadmin');
                }
                else{
                    alert(res.data.message);
                    window.location.reload();
                }
            })
            .catch(err=>console.log(err));

    };

    return (
        <div style={styles.loginContainer}>
            <div style={styles.loginForm}>
                <img src={axislogo} alt="Axis My India Logo" style={styles.logo} />
                <h2 style={styles.heading}>Login Form</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        <span style={styles.label}>Username:</span>
                        <input
                            type="text"
                            onChange={e => setValues({ ...values, username: e.target.value })}
                            name="username"
                            autoComplete='off'
                            required
                            style={styles.input}
                        />
                    </label>
                    <label>
                        <span style={styles.label}>Password:</span>
                        <input
                            type="Password"
                            onChange={e => setValues({ ...values, Password: e.target.value })}
                            name="Password"
                            autoComplete='off'
                            required
                            style={styles.input}
                        />
                    </label>
                    <button type="submit" style={styles.loginButton}>Login</button>
                    {/* <p style={styles.createAccount}>Create an account</p> */}
                </form>
            </div>
        </div>
    );
}

const styles = {
    loginContainer: {
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(to bottom,  #fff,#f7f3fa)',
    },
    loginForm: {
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        width: '700px',
        height : '500px',
        marginTop : '200px',
        fontFamily: 'Arial, sans-serif',
    },
    logo: {
        width: '70px',
        marginBottom: '40px',
    },
    heading: {
        color: '#800080',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        textAlign: 'left',
        fontWeight: 'bold',
        color: '#800080',
        marginBottom: '10px',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginTop: '5px',
        marginBottom: '20px',
        border: '1px solid #d3c3db',
        borderRadius: '5px',
        fontSize: '16px',
    },
    loginButton: {
        width: '100%',
        padding: '12px',
        border: 'none',
        borderRadius: '20px',
        backgroundColor: '#800080',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    createAccount: {
        marginTop: '20px',
        color: '#800080',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
};

export default Login;
