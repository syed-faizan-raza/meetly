import React, { useState, useEffect } from 'react';
import { PiPencilSimpleLineThin } from "react-icons/pi";
import { ImStack } from "react-icons/im"; 
import TimeBar from './TimeBar'
import Image from 'next/image';
import logo from './logo.png';


const Header = () => {
  return (
    <div className="header-container">
    <Image className="logo" src={logo} alt="Meetly" />
      <TimeBar />
      <div className="buttons-container">
      <ImStack size={25}/> 

        <button className="notes-button">
          <PiPencilSimpleLineThin />
          Today's Notes
        </button>
        <button className="notes-button">
          Yesterday's Notes
        </button>
      </div>
    </div>
  );
};

export default Header;