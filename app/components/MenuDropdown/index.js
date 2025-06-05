import { reactIcons } from '@/utils/icons';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const MenuDropdown = ({ title, items = [], className = '', toggleDrawer }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${className} dropdown-wr`}>
      <div
        className="flex px-[14px] gap-3 items-center justify-between cursor-pointer"
        onClick={toggleMenu}
      >
        <span className="text-16 font-bold font-comfortaa">{title}</span>
        <span
          className={`text-20 cursor-pointer ${isOpen ? 'rotate-180' : ''}`}
        >
          {reactIcons.dropdown}
        </span>
      </div>
      {isOpen && (
        <div className="mt-5">
          {items.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              onClick={toggleDrawer}
              className={({ isActive }) =>
                `flex items-center gap-3 2xl:p-4 p-3 px-[14px] rounded-8 ${
                  isActive ? 'bg-primary-700' : ''
                }`
              }
              // activeClassName="isActive"
            >
              <img className="size-6 object-contain" src={link.icon} alt="" />
              <span className="2xl:text-16 text-14">{link.text}</span>{' '}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

MenuDropdown.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  items: PropTypes.any,
  toggleDrawer: PropTypes.func,
};

export default MenuDropdown;
