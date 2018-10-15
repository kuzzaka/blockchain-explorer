/* eslint-disable import/prefer-default-export */
/**
 * Normalizes date from UNIX timestamp.
 * @param date
 * @returns {string}
 */
export const normalizeDate = date => new Date(date * 1000).toDateString();
