import PropTypes from 'prop-types';
import React from 'react';
/**
 * Global Styles HOC
 * @param children
 * @returns {*}
 * @constructor
 */
const WithLayout = ({ children }) => (
  <div>
    {children}
    {/* language=CSS */}
    <style jsx global>
      {`
        @font-face {
          font-family: system;
          font-style: normal;
          font-weight: 300;
          src: local(".SFNSText-Light"), local(".HelveticaNeueDeskInterface-Light"), local(".LucidaGrandeUI"), local("Ubuntu Light"), local("Segoe UI Light"), local("Roboto-Light"), local("DroidSans"), local("Tahoma");
        }
        body {
          font-family: "system";
          font-size: 18px;
        }
        main {
         margin: 0 4rem;
        }
      `}
    </style>
  </div>
);

export default WithLayout;

WithLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
