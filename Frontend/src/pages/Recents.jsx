// pages/Recents.js
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Recents = () => {
    const { user } = useAuth();

    return (
        <div className="min-vh-100 text-light p-5" style={{ backgroundColor: '#1a1a1a' }}>
            <div className="container">
                <h1 className="text-warning mb-4">Recent Activity</h1>
                {user ? (
                    <p className="fs-5">View your recent quiz attempts and progress, {user.name}!</p>
                ) : (
                    <div className="alert alert-info">
                        <p className="fs-5">Login to track your quiz history and progress.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Recents;