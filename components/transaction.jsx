import PropTypes from 'prop-types';
import * as React from 'react';
import take from 'lodash/take';
import get from 'lodash/get';
import sum from 'lodash/sum';
import bindAll from 'lodash/bindAll';
import Button from './button';
import { normalizeDate } from '../services/utils';

const MAX_SHOWN_HASHES = 4;

export default class Transaction extends React.Component {
  static getValueString(value) {
    return `${get(value, 'value') || 'No value provided in'} BTC`;
  }

  static getTotalValueString(out) {
    return `Total transaction value - ${out.reduce((acc, cur) => sum([acc, (get(cur, 'value') || 0)]), 0)} BTC`;
  }

  static generateKey(value, idx) {
    return `${value} ${idx}`;
  }

  constructor(props) {
    super(props);
    this.state = {
      wrapped: true,
    };
    bindAll(this, ['toggleWrap']);
  }

  toggleWrap() {
    const { wrapped } = this.state;
    this.setState({
      wrapped: !wrapped,
    });
  }

  render() {
    const { data } = this.props;
    const { wrapped } = this.state;
    const showToggle = data.inputs.length > MAX_SHOWN_HASHES || data.out.length > MAX_SHOWN_HASHES;
    const inputs = wrapped ? take(data.inputs, MAX_SHOWN_HASHES) : data.inputs;
    const out = wrapped ? take(data.out, MAX_SHOWN_HASHES) : data.out;
    const date = normalizeDate(data.time);
    return (
      <article>
        <header>
          <h5>{data.hash}</h5>
          <time dateTime={date}>{date}</time>
        </header>
        <section className="inputs">
          <h6>Inputs</h6>
          {inputs.map((entry, idx) => (
            <div key={Transaction.generateKey(get(entry, 'prev_out.addr'), idx)} className="address-block">
              <p>{get(entry, 'prev_out.addr') || 'No address provided'}</p>
            </div>
          ))}
        </section>
        <span role="img" aria-label="right arrow emoji" className="arrow">➡️</span>
        <section className="out">
          <h6>Outputs</h6>
          {out.map((entry, idx) => (
            <div key={Transaction.generateKey(get(entry, 'addr'), idx)} className="address-block">
              <p>{get(entry, 'addr') || 'No address provided'}</p>
              <p>{Transaction.getValueString(entry)}</p>
            </div>
          ))}
        </section>
        <div className="button-block">
          <div className="total-value">{Transaction.getTotalValueString(out)}</div>
          {showToggle && (
            <Button onClick={this.toggleWrap}>
              {`Show${wrapped ? ' more' : ' less'}`}
            </Button>
          )}
        </div>
        {/* language=CSS */}
        <style jsx>
          {`
            article {
              display: grid;
              border: black 2px solid;
              margin-bottom: .5rem;
              padding: 1rem;
              grid-template-rows: 1fr minmax(1fr, 4fr) 1fr;
              grid-template-columns: 1fr min-content 2fr;
              grid-template-areas: 
              "a a a" 
              "b c d" 
              "e e e";
              grid-gap: .5rem;
              width: 100%;
            }
            header {
              padding: .5rem 1rem;
              font-weight: bolder;
              grid-area: a;
            }
            p {
              padding: 0 1rem;
              word-break: break-word;
            }
            p + p {
              padding-bottom: .5rem;
            }
            span {
              align-self: center;
            }
            h6 {
              margin-left: 1rem;
            }
            .inputs, .out {
              border: darkslategray 1px dashed;
            }
            .inputs {
              grid-area: b;
            }
            .out {
              grid-area: d;
            }
            .arrow {
              grid-area: c;
            }
            .button-block {
              grid-area: e;
              display: flex;
              flex-direction: row-reverse;
              justify-content: space-between;
            }
            .total-value {
              margin-right: 1rem;
              font-weight: bolder;
              align-self: center;
            }
            .address-block {
             display: flex;
             justify-content: space-between;
            }
          `}
        </style>
      </article>
    );
  }
}

Transaction.propTypes = {
  data: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    inputs: PropTypes.array.isRequired,
    out: PropTypes.array.isRequired,
    time: PropTypes.number.isRequired,
  }).isRequired,
};
