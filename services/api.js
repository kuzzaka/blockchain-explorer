import fetch from 'isomorphic-unfetch';

const fetchBlockData = query => fetch(`/search/?q=${query}`);

export default fetchBlockData;
