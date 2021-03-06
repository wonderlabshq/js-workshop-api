const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const apiV1 = require('./api/v1');
const app = express();

const whitelist = ['http://127.0.0.1:3000', 'http://localhost:3000'];
const corsOptions = {
  origin: (origin, cb) => {
    const originIsWhiteListed = whitelist.indexOf(origin) > -1;

    cb(null, originIsWhiteListed);
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const PORT = 8080;
const apis = [
  {
    version: 'v1',
    app: apiV1,
  },
];

app.get('/', (req, res) => {
  res.json({
    hello: 'world'
  });
});

apis.forEach((api) => {
  app.use(`/api/${api.version}`, api.app);
});

app.listen(PORT, () => {
  console.log(`App run on port ${PORT}!`)
});
