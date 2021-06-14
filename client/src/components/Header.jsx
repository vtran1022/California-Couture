import React from 'react';
import lightLogo from '../imgs/lightLogo.png';
import darkLogo from '../imgs/darkLogo.png';

const Header = ({ highlight, theme, toggleTheme }) => {
  return (
    <div>
        {theme === 'lightTheme.css'
          ? <nav className='navbar'>
              <img id='logo' src={lightLogo} alt='Company Logo'></img>
              <button id='toggleButton' onClick={toggleTheme}>🌞</button>
              </nav>
          : <nav className='navbar'>
              <img id='logo' src={darkLogo} alt='Company Logo'></img>
              <button id='toggleButton' onClick={toggleTheme}>🌛</button>
            </nav>
        }
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

export default Header;