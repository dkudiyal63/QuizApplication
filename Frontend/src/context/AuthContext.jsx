// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // Check for existing token on app start
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            // Simulate API call to verify token
            setTimeout(() => {
                // Mock user data - replace with actual API response
                const mockUser = {
                    id: 1,
                    name: 'John Doe',
                    email: 'john@example.com'
                };
                setUser(mockUser);
                setLoading(false);
            }, 500);
        } else {
            setLoading(false);
        }
    }, []);

    const login = (userData, token) => {
        localStorage.setItem('jwtToken', token);
        setUser(userData);
        setIsLoginOpen(false);
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        setUser(null);
    };

    const openLogin = () => setIsLoginOpen(true);
    const closeLogin = () => setIsLoginOpen(false);

    const value = {
        user,
        login,
        logout,
        isLoginOpen,
        openLogin,
        closeLogin,
        loading
    };

    return (
        <AuthContext.Provider value={value}>``
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};