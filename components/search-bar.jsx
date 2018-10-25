import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadData } from '../redux/actions';

const SearchBar = ({ error, searchHash, hash }) => (
  <div className="search-container">
    <span role="img" className="icon" aria-label="search emoji">🔎</span>
    <input type="search" onChange={searchHash} value={hash} placeholder="Enter/paste block hash, index ..." />
    {error && (
    <p style={{ color: 'red' }}>
      The hash is not found
    </p>
    )}
    {/* language=CSS */}
    <style jsx>
      {`
      input {
        appearance: none;
        width: 90%;
        padding-left: 2rem;
        padding-right: .2rem;
        height: 2rem;
        font-size: inherit;
      }
      .search-container {
        position: relative;
        margin-bottom: 2rem;
      }
      .icon {
        display: inline-block;
        position: absolute;
        left: .5rem;
        top: .1rem;
      }
    `}
    </style>
  </div>
);
const mapStateToProps = state => ({
  hash: state.hash,
  error: state.error,
});
const mapDispatchToProps = dispatch => ({
  searchHash: event => dispatch(loadData(event.target.value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

SearchBar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  error: PropTypes.any.isRequired,
  hash: PropTypes.string.isRequired,
  searchHash: PropTypes.func.isRequired,
};
