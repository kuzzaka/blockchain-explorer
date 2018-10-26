import padStart from 'lodash/padStart';
import escape from 'lodash/escape';
import trimEnd from 'lodash/trimEnd';
/**
 * Normalizes date from UNIX timestamp.
 * @param date
 * @returns {string}
 */
export const normalizeDate = date => new Date(date * 1000).toDateString();
/**
 * Formats BTC values.
 * @param value
 * @returns {number}
 */
export const formatBTCValue = value => parseFloat(
  String(padStart(String(value), 9, '0') * 0.00000001)
    .split('.')
    .map((part, index) => (index > 0 ? trimEnd(part.substring(0, 10), '0') : part))
    .join('.'),
);
/**
 * Validates query.
 * @param query
 * @returns {*}
 */
export const validateQuery = query => escape(query);
