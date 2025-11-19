// pages/Creations.js
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Creations = () => {
    const { user } = useAuth();

    return (
        <div className="min-vh-100 text-light p-5" style={{ backgroundColor: '#1a1a1a' }}>
            <div className="container">
                <h1 className="text-warning mb-4">My Quiz Creations</h1>
                {user ? (
                    <p className="fs-5">Welcome back, {user.name}! Manage your quiz creations here.</p>
                ) : (
                    <div className="alert alert-info">
                        <p className="fs-5">Please login to create and manage your quizzes.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Creations;