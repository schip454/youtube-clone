import React, { FC, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMobileMenu } from '../../redux/search/slice';

import ytLogo from '../../assets/images/yt-logo.png';
import ytLogoMobile from '../../assets/images/yt-logo-mobile.png';

import { SlMenu } from 'react-icons/sl';
import { IoIosSearch } from 'react-icons/io';
import { RiVideoAddLine } from 'react-icons/ri';
import { FiBell } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';

import SearchInput from '../Search/SearchInput';
import Loader from '../Loader/Loader';

const Header = () => {
  const dispatch = useDispatch();

  const { mobileMenu } = useSelector((state) => state.search);
  const { isLoading } = useSelector((state) => state.video);

  const { pathname } = useLocation();
  const pageName = pathname?.split('/')?.filter(Boolean)?.[0];

  const mobileMenuToggle = () => {
    dispatch(toggleMobileMenu(!mobileMenu));
  };
  return (
    <div className="fixed top-0 z-10 flex flex-row items-center w-full justify-between h-14 px-4 md:px-5 bg-black ">
      {isLoading && <Loader />}

      <div className="flex h-5 items-center">
        {pageName !== 'video' && (
          <div
            className="flex md:hidden md:mr-6 items-center cursor-pointer justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
            onClick={mobileMenuToggle}>
            {mobileMenu ? (
              <CgClose className="text-white text-xl" />
            ) : (
              <SlMenu className="text-white text-xl" />
            )}
          </div>
        )}
        <Link to="/" className="flex h-5 items-center">
          <img src={ytLogo} alt="YouTube" className="h-full hidden md:block" />
          <img src={ytLogoMobile} alt="YouTube" className="h-full  md:hidden" />
        </Link>
      </div>

      <SearchInput />

      <div className="flex items-center">
        <div className="hidden md:flex">
          <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
            <RiVideoAddLine className="text-white text-xl cursor-pointer" />
          </div>
          <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
            <FiBell className="text-white text-xl cursor-pointer" />
          </div>
        </div>
        <div className="flex h-8 w-8 overflow-hidden rounded-full md:ml-4">
          <img
            className="object-cover"
            src="https://i.pinimg.com/originals/69/0b/91/690b91f7eb567aaabb2458b670a37e53.jpg"
            alt="avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
