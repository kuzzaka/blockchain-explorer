import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadData } from '../redux/actions';

const SearchBar = ({ error, searchHash, query }) => (
  <div className="search-container">
    <span role="img" className="icon" aria-label="search emoji">🔎</span>
    <input type="search" onChange={searchHash} value={query} placeholder="Look up block by hash, index ..." />
    {error && (
    <p className="error-block">
      The block is not found
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
        margin-bottom: ${error ? '1.4rem' : '2rem'};
      }
      .icon {
        display: inline-block;
        position: absolute;
        left: .5rem;
        top: .1rem;
      }
      .error-block {
        color: red;
        margin-top: 2rem;
        margin-bottom: 0;
        font-style: italic;
      }
    `}
    </style>
  </div>
);
const mapStateToProps = state => ({
  query: state.query,
  error: state.error,
});
const mapDispatchToProps = dispatch => ({
  searchHash: event => dispatch(loadData(event.target.value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

SearchBar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  error: PropTypes.any.isRequired,
  query: PropTypes.string.isRequired,
  searchHash: PropTypes.func.isRequired,
};
