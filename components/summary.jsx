import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';
import startCase from 'lodash/startCase';
import { normalizeDate } from '../services/utils';

const Summary = ({ summary }) => (
  <details>
    <summary>Show block summary</summary>
    {summary.hash && (
      <dl>
        {map(summary, (value, key) => (
          <React.Fragment key={key}>
            <dt>{startCase(key)}</dt>
            <dd>{value}</dd>
          </React.Fragment>
        ))}
      </dl>
    )}
    {/* language=CSS */}
    <style jsx>
      {`
      details {
        display: ${summary.hash ? 'block' : 'none'};
      }
      summary {
        cursor: pointer;
      }
      dt {
        font-weight: bolder;
      }
    `}
    </style>
  </details>
);
const mapStateToProps = state => ({
  summary: {
    hash: state.hash,
    version: state.ver,
    previousBlock: state.prev_block,
    merkleRoot: state.mrkl_root,
    time: normalizeDate(state.time),
    bits: state.bits,
    size: `${state.size} bytes`,
    nextBlock: state.next_block,
    numberOfTransactions: state.n_tx,
    fee: state.fee,
    height: state.height,
    receivedTime: normalizeDate(state.received_time),
  },
});
export default connect(mapStateToProps)(Summary);

Summary.propTypes = {
  summary: PropTypes.exact({
    hash: PropTypes.string.isRequired,
    version: PropTypes.number.isRequired,
    previousBlock: PropTypes.string.isRequired,
    merkleRoot: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    bits: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired,
    nextBlock: PropTypes.string.isRequired,
    numberOfTransactions: PropTypes.number.isRequired,
    fee: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    receivedTime: PropTypes.string.isRequired,
  }).isRequired,
};
