import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Transaction from './transaction';
import { paginate } from '../redux/actions';
import Button from './button';

const getPageDescription = (currentPage, paginated) => `Current page - ${currentPage} from ${paginated.length}`;

const TransactionList = ({ paginated, currentPage, paginateTo }) => (
  <section>
    <h2>Transactions</h2>
    <div>
      {Boolean(paginated.length) && paginated[currentPage - 1].map(transaction => (
        <Transaction key={transaction.hash} data={transaction} />
      ))}
    </div>
    {Boolean(paginated.length) && (
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
      `}
    </style>
  </section>
);

const mapStateToProps = state => ({
  paginated: state.paginated,
  currentPage: state.currentPage,
});

const mapDispatchToProps = dispatch => ({
  paginateTo: newPage => dispatch(paginate(newPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);

TransactionList.propTypes = {
  currentPage: PropTypes.number.isRequired,
  paginateTo: PropTypes.func.isRequired,
  paginated: PropTypes.arrayOf(PropTypes.array).isRequired,
};
