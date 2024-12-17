import React from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import Weather from './components/Weather'
import Dashboard from './components/Dashboard'
import AllReport from './components/AllReport'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/search" element={<Weather />} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/allreports' element={<AllReport/>} />
      </Routes>
 
    </Router>
  )
}

export default App
