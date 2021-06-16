import React from 'react';
import lightLogo from '../imgs/lightLogo.png';
import darkLogo from '../imgs/darkLogo.png';

const Header = ({ highlight, theme, toggleTheme }) => {
  return (
    <header className='header'>
        {theme === 'lightTheme.css'
          ? <span className='logo-container'>
              <img className='logo' src={lightLogo} alt='Company Logo'></img>
              <button className='toggleButton' onClick={toggleTheme}>🌞</button>
              </span>
          : <span className='logo-container'>
              <img className='logo' src={darkLogo} alt='Company Logo'></img>
              <button className='toggleButton' onClick={toggleTheme}>🌛</button>
            </span>
        }
      <nav className='announcement-container'>
        <p className='announcement'>
          SITE-WIDE ANNOUNCEMENT MESSAGE! &nbsp;
          ─	&nbsp;
          SALE / DISCOUNT <b>OFFER</b> &nbsp;
          ─ &nbsp;
          <u id='product-highlight' onClick={highlight}>NEW PRODUCT HIGHLIGHT</u>
        </p>
      </nav>
    </header>
  );
};

export default Header;