import React from 'react';
import './App.css';

import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import About from './About';
import Error from './Error';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/profile/">Profile</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile/:username" element={<Profile />}/>
        <Route path="/about" element={<About/>}/>
        {/* Error */}
        <Route path="*" element={<Error/>} />
      </Routes>
      {/* Things not changing with navigation */}
    </Router>
  );
}

export default App;
