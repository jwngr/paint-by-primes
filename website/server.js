const next = require('next');
const express = require('express');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('/p/:id', (req, res) => {
      console.log('IMAGES MATCHED:', req.url, req.params);
      const actualPage = '/result';
      const queryParams = {id: req.params.id};
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      console.log('URL:', req.url);
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
