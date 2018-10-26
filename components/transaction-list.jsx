import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Transaction from './transaction';
import { paginate } from '../redux/actions';
import Button from './button';

const getPageDescription = (currentPage, paginated) => `Current page - ${currentPage} from ${paginated.length}`;

const TransactionList = ({
  paginated, currentPage, paginateTo, isFetching,
}) => (
  <section>
    <h2>Transactions</h2>
    <div className={isFetching ? 'loader' : ''}>
      {Boolean(paginated.length) && !isFetching && paginated[currentPage - 1].map(transaction => (
        <Transaction key={transaction.hash} data={transaction} />
      ))}
    </div>
    {Boolean(paginated.length) && !isFetching && (
      <div className="pagination-block">
        { currentPage > 1
          ? <Button onClick={() => paginateTo(currentPage - 1)}>Previous Page</Button>
          : null
        }
        <span>{getPageDescription(currentPage, paginated)}</span>
        {currentPage < paginated.length
          ? <Button onClick={() => paginateTo(currentPage + 1)}>Next Page</Button>
          : null
        }
      </div>
    )}
    {/* language=CSS */}
    <style jsx>
      {`
          span {
              align-self: center;
              margin: 0 1rem;
          }

          .pagination-block {
              width: 100%;
              display: flex;
              justify-content: center;
              margin: auto;
              padding: 2rem;
              height: 3rem;
          }
          .loader,
          .loader:before,
          .loader:after {
            background: #1d1d1d;
            -webkit-animation: load1 1s infinite ease-in-out;
            animation: load1 1s infinite ease-in-out;
            width: 1em;
            height: 4em;
          }
          .loader {
            color: #1d1d1d;
            text-indent: -9999em;
            margin: 88px auto;
            position: relative;
            font-size: 11px;
            -webkit-transform: translateZ(0);
            -ms-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-animation-delay: -0.16s;
            animation-delay: -0.16s;
          }
          .loader:before,
          .loader:after {
            position: absolute;
            top: 0;
            content: '';
          }
          .loader:before {
            left: -1.5em;
            -webkit-animation-delay: -0.32s;
            animation-delay: -0.32s;
          }
          .loader:after {
            left: 1.5em;
          }
          @-webkit-keyframes load1 {
            0%,
            80%,
            100% {
              box-shadow: 0 0;
              height: 4em;
            }
            40% {
              box-shadow: 0 -2em;
              height: 5em;
            }
          }
          @keyframes load1 {
            0%,
            80%,
            100% {
              box-shadow: 0 0;
              height: 4em;
            }
            40% {
              box-shadow: 0 -2em;
              height: 5em;
            }
          }
      `}
    </style>
  </section>
);

const mapStateToProps = state => ({
  paginated: state.paginated,
  currentPage: state.currentPage,
  isFetching: state.isFetching,
});

const mapDispatchToProps = dispatch => ({
  paginateTo: newPage => dispatch(paginate(newPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);

TransactionList.propTypes = {
  currentPage: PropTypes.number.isRequired,
  paginateTo: PropTypes.func.isRequired,
  paginated: PropTypes.arrayOf(PropTypes.array).isRequired,
  isFetching: PropTypes.bool.isRequired,
};
