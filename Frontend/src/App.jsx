// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Login from './components/Login';
import Homepage from './pages/Homepage';
import Practice from './pages/Practice';
import Creations from './pages/Creations';
import Recents from './pages/Recents';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App" style={{ minHeight: '100vh', backgroundColor: '#1a1a1a' }}>
                    <Header />
                    <Login />
                    
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/practice" element={<Practice />} />
                        <Route path="/creations" element={<Creations />} />
                        <Route path="/recents" element={<Recents />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;