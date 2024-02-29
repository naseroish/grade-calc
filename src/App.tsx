import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import Landing from './pages/Landing';
import { Route, Routes, Navigate } from 'react-router';
import Login from './pages/auth/login';
import { useAuth } from './services/authService';
import Modules from './pages/ModulesPage';
import Grades from './pages/GradesPage';

import './App.css';

function App() {
  const session = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session !== undefined) {
      setLoading(false);
    }
  }, [session]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Routes>
        <Route path="/home" element={session ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/modules' element={session ? <Modules /> : <Navigate to="/login" />} />
        <Route path='grades' element={session ? <Grades /> : <Navigate to="/login" />} />

        <Route path='' element={!session ? <Landing /> : <Navigate to="/home" />}/>
        <Route path='login' element={<Login />} /> 
      </Routes>
    </>
  );
}

export default App;