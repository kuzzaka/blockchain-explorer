import padStart from 'lodash/padStart';
/**
 * Normalizes date from UNIX timestamp.
 * @param date
 * @returns {string}
 */
export const normalizeDate = date => new Date(date * 1000).toDateString();

export const formatBTCValue = value => padStart(String(value), 9, '0') * 0.00000001;
