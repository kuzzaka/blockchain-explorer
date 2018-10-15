import PropTypes from 'prop-types';
import React from 'react';
import SearchBar from './search-bar';

const Header = ({ title }) => (
  <header>
    <h1>{title}</h1>
    <SearchBar />
  </header>
);

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
