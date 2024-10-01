import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import LoginComponent from './loginComponent';
import RegisterComponent from './registerComponent';
import './App.css';
import Home from './Home';
import PrivateRoute from './PrivateRoute';


//{<Navigate to="/home" replace />}

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          
          {/* Redirect from root to /home */}
          <Route path="/" element={<PrivateRoute element={<Home />} />}/>  
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
