/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { IoMdAdd, IoMdSearch, IoIosNotifications } from 'react-icons/io';
import { BiFoodMenu } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ searchTerm, setSearchTerm, user, socket }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

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
          <div className="relative flex gap-2">

            <button className="bg-nGreen opacity-70 hover:opacity-100 text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center" aria-label="Add Button" onClick={toggleDropdown}>
              <IoMdAdd />
            </button>
            <div className="relative pt-10">

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 ">
                  <Link to="/create-pin" className="block px-4 py-2 text-gray-800 hover:bg-nGreen hover:text-white" alt="Click this to create recipe" aria-label="Proceed to create recipe when clicked" onClick={toggleDropdown}>
                    <IoMdAdd className="inline-block mr-2" />
                    Add Recipe
                  </Link>
                  {user.isAdmin && (
                    <Link to="/create-ingredient" className="block px-4 py-2 text-gray-800 hover:bg-nGreen hover:text-white" aria-label="Input ingredient here" alt="Input Ingredient here" onClick={toggleDropdown}>
                      <IconContext.Provider value={{ color: '#FF9F1C', className: 'global-class-name', background: '#008083' }}>
                        <BiFoodMenu className="inline-block mr-2" />
                        Add Ingredient
                      </IconContext.Provider>
                    </Link>
                  )}
                </div>
              )}
            </div>




          </div>
        </div>

      </div>
    );
  }

  return null;
};

export default Navbar;
