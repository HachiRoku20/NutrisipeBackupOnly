/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { IconContext } from 'react-icons';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import { BiFoodMenu } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if (user) {
    return (
      <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
        <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
          <IconContext.Provider value={{ color: '#008083', className: 'global-class-name' }}>
            <div>
              <IoMdSearch />
            </div>
          </IconContext.Provider>
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value.replace(/[^\w\s]/gi, ""))}
            placeholder="Search for recipes"
            value={searchTerm}
            onFocus={() => navigate('/search')}
            className="p-2 w-full bg-white outline-none"
          />
        </div>
        <div className="flex gap-3 ">
          <Link to={`user-profile/${user?._id}`} className="hidden md:block">
            <img src={user.image} alt="user-pic" className="w-14 h-12 rounded-lg " />
          </Link>
          {/* add recipe */}
          <Link to="/create-pin" className="text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center" alt="Click this to create recipe" aria-label="Proceed to create recipe when clicked" style={{ backgroundColor: '#008083' }}>
            <IoMdAdd />
          </Link>
          {user.isAdmin
            && (
              // admin
              <Link to="/create-ingredient" className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
                <IconContext.Provider value={{ color: '#FF9F1C', className: 'global-class-name', background: '#008083' }}>
                  <BiFoodMenu />
                </IconContext.Provider>
              </Link>
            )}
        </div>
      </div>
    );
  }

  return null;
};

export default Navbar;
