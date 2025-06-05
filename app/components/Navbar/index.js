import { reactIcons } from '@/utils/icons';
import React, { useState } from 'react';
import { Sidebar } from '..';
import { isLoggedIn } from '@/utils/apiHandlers';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const isLogin = isLoggedIn();
  const toggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  return (
    <>
      <nav className="flex items-center justify-between px-5 py-3 bg-[#2874f0] ">
        <div className="flex items-center gap-2 ">
          {isLogin && (
            <button
              onClick={toggleSidebar}
              className="text-2xl cursor-pointer z-10 text-white rounded-full"
            >
              {reactIcons.menu}
            </button>
          )}
          <Link to={'/'}>
            <img
              className=" w-[150px] object-cover"
              src="/images/flipLogo.png"
              alt="logo"
            />
          </Link>
        </div>

        <div></div>
      </nav>

      <Sidebar openSidebar={openSidebar} toggleDrawer={toggleSidebar} />
    </>
  );
};

export default Navbar;
