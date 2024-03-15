import React from 'react';
import Navbar from "./components/NavBar.js";
import Dashboard from './pages/Dashboard.js';
import Profile from './pages/Profile.js';
import LogIn from './pages/LogIn.js';
import SignUp from './pages/SignUp.js';
import AuthProvider from './helper/Authentication.js';
import ProtectedRoute from './helper/ProtectedRoute.js';
import GeneralConst from "./resources/General.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

export const AuthContext = React.createContext(null);

function App() {
  return (
    <div className="App-container">
      <BrowserRouter>      
        <AuthProvider> 
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Navbar 
                 activeNavBar={GeneralConst.DASHBOARD}
                />
                <Dashboard />
              </ProtectedRoute> 
            }/>
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Navbar 
                 activeNavBar={GeneralConst.DASHBOARD}
                />
                <Dashboard />
              </ProtectedRoute> 
            }/>
            <Route path="/profile" element={
              <ProtectedRoute>
                <Navbar 
                 activeNavBar={GeneralConst.PROFILE}
                />
                <Profile />
              </ProtectedRoute> 
            }/>
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
