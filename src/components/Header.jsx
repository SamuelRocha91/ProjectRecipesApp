import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchImg from '../images/searchIcon.svg';
import appContext from '../context/AppContext';
import SearchBar from './SearchBar';
import './header.css';

function Header({ title, enableSearchIcon = true }) {
  const {
    searchIcon,
    setSearchIcon,
    searchBox,
    setSearchBox,
  } = useContext(appContext);

  useEffect(() => {
    setSearchIcon(enableSearchIcon);
  }, [setSearchIcon, enableSearchIcon]);

  return (
    <header>
      <h1 data-testid="page-title">{ title }</h1>
      <Link to="/profile">
        <button
          type="button"
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile-icon"
          />
        </button>
      </Link>

      { searchIcon
        && (
          <button type="button" onClick={ () => setSearchBox(!searchBox) }>
            <img
              src={ searchImg }
              alt="search-icon"
              data-testid="search-top-btn"
            />
          </button>
        )}
      { searchBox
       && <SearchBar /> }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  enableSearchIcon: PropTypes.bool,
};

export default Header;
