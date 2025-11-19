// components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, openLogin, logout } = useAuth();

    return (
        <div className="container-fluid pt-3 d-flex align-items-center justify-content-between">
            <h1 className="carter-one-regular ms-5 mt-2 text-light">QUIZZIE</h1>
            <nav className="navbar navbar-expand-lg pb-0 mb-0">
                <div className="container-fluid p-0 m-0">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse me-5 pe-5 fw-bold" id="navbarNavAltMarkup">
                        <div className="navbar-nav fs-4 font-monospace align-items-center">
                            <Link className="nav-link me-5 text-light" to="/">Home</Link>
                            <Link className="nav-link me-5 text-light" to="/practice">Practice</Link>
                            <Link className="nav-link me-5 text-light" to="/creations">Creations</Link>
                            <Link className="nav-link me-5 text-light" to="/recents">Recents</Link>
                            
                            {/* Authentication Section */}
                            {user ? (
                                // User is logged in - show user dropdown
                                <div className="nav-item dropdown">
                                    <a 
                                        className="nav-link dropdown-toggle text-warning d-flex align-items-center" 
                                        href="#" 
                                        role="button" 
                                        data-bs-toggle="dropdown" 
                                        aria-expanded="false"
                                    >
                                        <span className="me-2">👋</span>
                                        {user.name}
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-dark">
                                        <li><a className="dropdown-item" href="/profile">Profile</a></li>
                                        <li><a className="dropdown-item" href="/settings">Settings</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <button 
                                                className="dropdown-item text-danger" 
                                                onClick={logout}
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                // User is not logged in - show login button
                                <button 
                                    className="btn btn-warning text-dark fw-bold px-4 py-2 ms-3"
                                    onClick={openLogin}
                                >
                                    Login / Register
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;