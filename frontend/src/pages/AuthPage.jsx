import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import logo from '../georgia-vagim-movie.jpg';
import Header from '../components/Header'
import "./styles/AuthPage.css";




const AuthPage = () => {

    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
        console.log("form:", form);

        try {
            const res = await axios.post(`http://localhost:8080${endpoint}`, form);
            console.log(res.data);
            if (isLogin && res.data.token) {
                localStorage.setItem('isLogin', true);
                localStorage.setItem("username", form.username);
                localStorage.setItem("token", res.data.token);
                navigate('/home');
            }
            else {
                setMessage(res.data);
            }
        }
        catch (err) {
            setMessage(err.response?.data || 'Something went wrong');
        }
    };


    return (
        <div className="App">
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Movie App
            </p>
            <div className = "auth-container">
                <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                        <button className="toggle-btn" type="submit">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                    </form>
                <p>
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                    <button onClick={() => {
                        setIsLogin(!isLogin);
                        setForm({ username: '', password: '' })
                        setMessage('');
                    }}>
                        {isLogin ? 'Sign up' : 'Log in'}
                    </button>
                </p>
                {message && <p className="auth-error">{message}</p>}
            </div>
            </header>
        </div>
        
  );


};


export default AuthPage;