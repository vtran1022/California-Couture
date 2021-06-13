import React from 'react';
import lightLogo from '../imgs/lightLogo.png';
import darkLogo from '../imgs/darkLogo.png';

const NavBar = ({ highlight, theme }) => {
  return (
    <div>
      <nav className='navbar'>
        {theme === 'light'
          ? <img id='logo' src={lightLogo} alt='Company Logo'></img>
          : <img id='logo' src={darkLogo} alt='Company Logo'></img>
        }
      </nav>
      <div className='announcement-container'>
        <span className='announcement'>
          SITE-WIDE ANNOUNCEMENT MESSAGE! &nbsp;
          ─	&nbsp;
          SALE / DISCOUNT <b>OFFER</b> &nbsp;
          ─ &nbsp;
          <u id='product-highlight' onClick={highlight}>NEW PRODUCT HIGHLIGHT</u>
        </span>
      </div>
    </div>
  );
};

export default NavBar;