const express = require('express');
const morgan = require('morgan');
const proxy = require('http-proxy-middleware');
const cors = require('cors');

app = express();
app.use(morgan('dev'));
app.use(cors());

const staticPath = `${__dirname}/../public`;

app.use('/books/:id', express.static(staticPath));

// MainInfo
app.use (
  '/books/:id/info',
  proxy({ target: 'http://bookshelfmain-env.6s37i4udh3.ap-northeast-1.elasticbeanstalk.com', changeOrigin: true }),
);

// Details
app.use (
  '/books/:id/details',
  proxy({ target: 'http://deploy-server.sni72ccyr7.us-east-1.elasticbeanstalk.com', changeOrigin: true }),
);

// Reviews
app.use (
  '/books/:id/reviews',
  proxy({ target: 'http://localhost:3003', changeOrigin: true }),
);

// AuthorInfo
app.use (
  '/books/:id/authors',
  proxy({ target: 'http://localhost:3000', changeOrigin: true }),
);

module.exports = app;