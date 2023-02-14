import './App.css';
import React, { useEffect } from 'react';
import Login from "./Components/Login"
import Register from "./Components/Register"
import Navbar from "./Layout/Navbar"
import Footer from "./Layout/Footer"
import { Routes, Route } from 'react-router-dom';
import useAuth from './Auth/useAuth';
import Home from './Components/Home';

function App() {

  const { user, fetchUser } = useAuth();

  //При загрузке приложения вызывается fetchUser, и если у браузера была сохранена Cookie сессии сервера, то фетч выполняется удачно,
  //и в дальнейшем все дочерние компоненты, использующие хук useAuth, будут иметь доступ к обьекту пользователя.
  useEffect(() => {
    fetchUser();
  }, [])

  return ( 
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
