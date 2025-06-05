const express = require('express');
const app = express();

const path = require('path');

const generate = require('cf-warp/lib/generate');
const register = require('cf-warp/lib/register');
const info = require('cf-warp/lib/info');
const ref = require('cf-warp/lib/ref');
const conf = require('./lib/conf');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200);
  res.set('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/warp.conf', async(req, res) => {
  const keys = await generate();
  const data = await register(keys);
  const combined = Object.assign({}, keys, data, await info(data));

  if (req.query.dl === 'true') res.set('Content-Disposition', 'attachment; filename="warp.conf"');
  res.set('Content-Type', 'text/plain');
  res.send(conf(combined, req.query.mode));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
