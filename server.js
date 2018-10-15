/* eslint-disable no-console */
const express = require('express');
const next = require('next');
const fetch = require('isomorphic-unfetch');
const { parse } = require('url');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// abstracted the endpoint getter for easier interchange
// originalEndPoint is `https://webbtc.com/block/${query}.json`
const getApiEndpoint = query => `https://blockchain.info/rawblock/${query}`;

app.prepare()
  .then(() => {
    const server = express();
    // proxy for API calls to evade CORS restrictions
    server.get('/search/', async (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { query } = parsedUrl;
      const data = await fetch(getApiEndpoint(query.q))
        .then(response => response.json()).catch(e => console.error(e));
      res.send(data);
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
