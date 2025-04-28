import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import style from './Login.module.scss';
import image from '~/assest/images';
import eyeClose from '~/assest/images/eye-close.png';
import eyeOpen from '~/assest/images/eye-open.png';

const cx = classNames.bind(style);

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordType, setPasswordType] = useState('password');
    const [eyeIcon, setEyeIcon] = useState(eyeClose);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const togglePasswordVisibility = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
            setEyeIcon(eyeOpen);
        } else {
            setPasswordType('password');
            setEyeIcon(eyeClose);
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        const loginData = {
            email,
            password,
        };

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log('Login successful', data);

            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);

            navigate('/admin'); // Use navigate to redirect to the admin page
        } catch (error) {
            console.error('Error during login:', error);
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className={cx('login')}>
            <div className={cx('login-left')}>
                <div className={cx('login-header')}>
                    <h1>Welcome</h1>
                    <p>Please log in as administrator</p>
                </div>
                <form className={cx('login-form')} onSubmit={handleLogin}>
                    <div className={cx('login-content')}>
                        <div className={cx('form-item')}>
                            <label htmlFor="email" className={cx('labelEmail')}>
                                Enter Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className={cx('inputEmail')}
                                placeholder="example@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className={cx('form-item')}>
                            <label htmlFor="password" className={cx('labelPass')}>
                                Enter Password
                            </label>
                            <input
                                type={passwordType}
                                id="password"
                                className={cx('inputPass')}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <img
                                src={eyeIcon}
                                id="eyeicon"
                                className={cx('password-toggle')}
                                onClick={togglePasswordVisibility}
                                alt="Toggle password visibility"
                            />
                        </div>
                        {error && <div className={cx('login-error')}>{error}</div>}
                        <button type="submit" className={cx('btn-login')}>
                            Log In
                        </button>
                    </div>
                </form>
            </div>
            <div className={cx('login-right')}>
                <img src={image.imgAdmin} alt="Admin" />
            </div>
        </div>
    );
}

export default Login;
