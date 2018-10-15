import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, onClick }) => (
  <button type="button" onClick={onClick}>
    {children}
    {/* language=CSS */}
    <style jsx>
      {`
      button {
        appearance: none;
        font-size: inherit;
        padding: .5rem;
        cursor: pointer;
        border: 2px solid black;
        min-width: 8rem;
      }   
    `}
    </style>
  </button>
);


export default Button;

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
