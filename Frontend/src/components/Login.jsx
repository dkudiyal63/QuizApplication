// components/Login.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { isLoginOpen, closeLogin, login } = useAuth();
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isLoginOpen) {
            // Reset form when modal closes
            setFormData({ email: '', password: '', name: '' });
            setError('');
            setIsLoginMode(true);
        }
    }, [isLoginOpen]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Simulate API call - replace with actual backend
            setTimeout(() => {
                if (formData.email && formData.password) {
                    // Mock successful login
                    const userData = {
                        id: 1,
                        name: isLoginMode ? 'John Doe' : formData.name,
                        email: formData.email
                    };
                    const token = 'mock-jwt-token';
                    login(userData, token);
                } else {
                    setError('Please fill in all fields');
                }
                setLoading(false);
            }, 1000);
        } catch (error) {
            setError('Something went wrong. Please try again.');
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
        setError('');
        setFormData({ email: '', password: '', name: '' });
    };

    if (!isLoginOpen) return null;

    return (
        <div 
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ zIndex: 1050 }}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    closeLogin();
                }
            }}
        >
            {/* Backdrop */}
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-75"></div>

            {/* Login Form */}
            <div 
                className="position-relative rounded-4 shadow-lg"
                style={{
                    background: "linear-gradient(135deg, rgba(26,26,26,0.95) 0%, rgba(40,40,40,0.98) 100%)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    width: "90%",
                    maxWidth: "400px",
                    animation: "scaleIn 0.3s ease-out"
                }}
            >
                {/* Header */}
                <div className="text-center p-4 border-bottom border-secondary">
                    <h2 className="text-warning fw-bold mb-2">
                        {isLoginMode ? 'Welcome Back!' : 'Create Account'}
                    </h2>
                    <p className="text-light opacity-75 mb-0">
                        {isLoginMode ? 'Sign in to continue your journey' : 'Join us to start learning'}
                    </p>
                </div>

                {/* Form */}
                <div className="p-4">
                    {error && (
                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Name field only for registration */}
                        {!isLoginMode && (
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label text-light">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark border-secondary text-light py-2 px-3 rounded-3"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    required={!isLoginMode}
                                />
                            </div>
                        )}

                        {/* Email Input */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label text-light">Email Address</label>
                            <input
                                type="email"
                                className="form-control bg-dark border-secondary text-light py-2 px-3 rounded-3"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label text-light">Password</label>
                            <input
                                type="password"
                                className="form-control bg-dark border-secondary text-light py-2 px-3 rounded-3"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-warning w-100 py-2 fw-bold text-dark rounded-3 mb-3"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                    {isLoginMode ? 'Signing In...' : 'Creating Account...'}
                                </>
                            ) : (
                                isLoginMode ? 'Sign In' : 'Create Account'
                            )}
                        </button>

                        {/* Toggle between Login/Register */}
                        <div className="text-center">
                            <span className="text-light opacity-75">
                                {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                            </span>
                            <button 
                                type="button" 
                                className="btn btn-link text-warning fw-semibold text-decoration-none p-0"
                                onClick={toggleMode}
                                disabled={loading}
                            >
                                {isLoginMode ? 'Sign up' : 'Sign in'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Close Button */}
                <button
                    type="button"
                    className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
                    onClick={closeLogin}
                    aria-label="Close"
                    disabled={loading}
                ></button>
            </div>

            <style jsx>{`
                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    );
};

export default Login;