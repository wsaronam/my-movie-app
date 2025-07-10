import React, { useState } from 'react';
import axios from 'axios';

const AuthPage = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.valoue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? '/api/auth/login' : '/api.auth/register';

        try {
            const res = await axios.post('http://localhost:8080${endpoint}', form);
            setMessage(res.data);
            if (isLogin && res.data === "Login successful") {
                alert("log in")
            }
        }
        catch (err) {
            setMessage(err.response?.data || 'Something went wrong');
        }
    };


    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>
            <p>
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Sign up' : 'Log in'}
                </button>
            </p>
            {message && <p>{message}</p>}
        </div>
  );


};


export default AuthPage;