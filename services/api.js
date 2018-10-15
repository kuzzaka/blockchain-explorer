import fetch from 'isomorphic-unfetch';

const fetchBlockData = payload => fetch(`/search/?q=${payload.query}`);

export default fetchBlockData;
