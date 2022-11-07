import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { RiHomeFill } from 'react-icons/ri';

import { Link, NavLink } from 'react-router-dom';

import logo from '../assets/logo2s.png';
import { categories } from '../utils/data';

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-nOrange transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize';

const Sidebar = ({ closeToggle, user }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">

          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
            onClick={handleCloseSidebar}
            style={{ color: '#008083', fontWeight: '600' }}
          >
            <RiHomeFill />
            Home
          </NavLink>
{/* 
          <NavLink
            to="/FollowFeed"
            className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
            onClick={handleCloseSidebar}
            style={{ color: '#999093', fontWeight: '600' }}
          >
            <RiUserFollowLine />
            My Following
          </NavLink> */}


          <h3 className="mt-2 px-5 text-base text-gray-500 2xl:text-xl font-semibold">Categories</h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img src={category.image} className="w-8 h-8 rounded-full shadow-sm text-green-300" />
              {category.name}
            </NavLink>
          ))}
        </div>
        
          
       
      </div>
     
        
      {user && (
        
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3 font-semibold"
          onClick={handleCloseSidebar}
        >
          <img src={user.image} className="w-10 h-10 rounded-full" alt="user-profile" />
          <p>{user.userName}</p>
          <IoIosArrowForward />
        </Link>
      )}
      
    </div> 
  );
};

export default Sidebar;
