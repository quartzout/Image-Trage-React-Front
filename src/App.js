import React, { useEffect, useState } from 'react';
import Login from "./Components/Login"
import Register from "./Components/Register"
import Navbar from "./Layout/Navbar"
import Footer from "./Layout/Footer"
import { Routes, Route } from 'react-router-dom';
import useAuth from './Auth/useAuth';
import Home from './Components/Home';
import Generate from './Components/Generate';
import User from './Components/User';
import Users from './Components/Users';
import Protected from './Components/Protected';

function App() {

  const { fetchUser } = useAuth();

  const [lastBalanceChangeTimestamp, setLastBalanceChangeTimestamp] = useState(0)

  //При загрузке приложения вызывается fetchUser, и если у браузера была сохранена Cookie сессии сервера, то фетч выполняется удачно,
  //и в дальнейшем все дочерние компоненты, использующие хук useAuth, будут иметь доступ к обьекту пользователя.
  //Фетч также происходит заново как только изменяется lastBalanceChangeTimestamp, что означает, что произшло какое то действие, изменяющее 
  //баланс пользователя в бд, и пользователя нужно зафетчить заново.
  useEffect(() => {
    fetchUser();
  }, [lastBalanceChangeTimestamp, fetchUser])

  

  return ( 
    <>
      <Navbar/>
      <div className="m-5">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/generate" element={<><Protected><Generate setLastBalanceChangeTimestamp={setLastBalanceChangeTimestamp}/></Protected></>}/>
          <Route path="/users/" element={<Users/>}/>
          <Route path="/users/:email" element={<User setLastBalanceChangeTimestamp={setLastBalanceChangeTimestamp}/>  }/>
        </Routes>
      </div>
    </>
  );
}

export default App;
