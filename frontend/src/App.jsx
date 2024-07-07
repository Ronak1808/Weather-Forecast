import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signin from './components/Signin'
import Signup from './components/Signup'
import { useState } from 'react';
import { isLogin } from './utils/LocalStorage';
import Homepage from './components/HomePage';
import Navbar from './components/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn]= useState(isLogin());
  const [isFav, setIsFav]= useState(false);
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setIsFav={setIsFav}/>
      <Routes>
        <Route exact path="/signin" element={<Signin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setIsFav={setIsFav} isFav={isFav}/>} />
        <Route exact path="/signup" element={<Signup isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setIsFav={setIsFav} isFav={isFav}/>} />
        <Route exact path="/" element={<Homepage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setIsFav={setIsFav} isFav={isFav}/>} />
      </Routes>
    </div>
  )
}

export default App