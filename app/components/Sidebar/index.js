import React from 'react';
import { MenuDropdown } from '..';
import Drawer from '@mui/material/Drawer';
import PropTypes from 'prop-types';
import { removeAuthCookie } from '@/utils/apiHandlers';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { reactIcons } from '@/utils/icons';

const Sidebar = ({ openSidebar, toggleDrawer }) => {
  const navigate = useNavigate();
  const navLinks = [
    {
      to: '/users',
      icon: '/images/icons/users.png',
      text: 'Users',
    },
  ];
  const handleLogout = async () => {
    // dispatch(clearUser());
    removeAuthCookie();
    navigate('/login');
    localStorage.clear();

    toast.success('Log out successfully');
  };
  return (
    <Drawer open={openSidebar} onClose={toggleDrawer}>
      <div className=" w-[250px]   box-shadow  relative">
        <button
          onClick={toggleDrawer}
          className=" rotate-90 text-xl absolute top-0 right-0 bg-gray-800 text-white rounded-full p-2 "
        >
          {reactIcons.shortdown}
        </button>
        <Link
          to={'/'}
          className="flex items-center justify-center bg-[#2874f0] border-b border-[#CFCFCF] py-5"
        >
          <img
            src="/images/flipLogo.png"
            className="w-[150px] mx-auto"
            alt=""
          />
        </Link>

        <div className="flex justify-between h-[calc(100dvh-100px)] flex-col overflow-auto mt-5 pr-1  py-5 px-4">
          <MenuDropdown
            title="Menu"
            items={navLinks}
            toggleDrawer={toggleDrawer}
          />
          <div
            className="flex items-center gap-3 2xl:p-4 p-3 px-[14px] mt-5 cursor-pointer border-t border-[#CFCFCF]"
            onClick={handleLogout}
          >
            <img
              className="size-6 object-contain"
              src="/images/icons/logout.png"
              alt=""
            />
            <span className="2xl:text-16 text-14">Logout</span>{' '}
          </div>
        </div>
      </div>
    </Drawer>
  );
};
Sidebar.propTypes = {
  openSidebar: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};
export default Sidebar;
