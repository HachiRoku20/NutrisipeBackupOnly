import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client'
import { Navbar, Feed, PinDetail, CreatePin, Search, CreateIngredient } from '../components';

const Pins = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [socket, setSocket] =useState(null);

  // useEffect (() => {
  //   setSocket(io("http://localhost:5000"));
  // }, [])
  
  // useEffect (() => {
  //   socket?.emit("newUser", )
  // }, [socket, user])
  
  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user && user} socket={socket} />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed user={user && user} socket={socket}/>} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route path="/pin-detail/:pinId" element={<PinDetail user={user && user} socket={socket}/>} />
          <Route path="/create-pin" element={<CreatePin user={user && user} />} />
          <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
          <Route path="/create-ingredient" element={<CreateIngredient user={user && user}  />} />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;
