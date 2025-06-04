const express = require('express');
const app = express();

const path = require('path');

const generate = require('cf-warp/lib/generate');
const register = require('cf-warp/lib/register');
const info = require('cf-warp/lib/info');
const ref = require('cf-warp/lib/ref');

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

  let conf = [];

  conf.push(
    `[Interface]`,
    `PrivateKey = ${combined.privateKey}`,
    `# PublicKey = ${combined.publicKey}`
  );
  if (req.query.mode === 'awg_full') {
    conf.push(
      `Jc = 120`,
      `Jmin = 23`,
      `Jmax = 911`,
      `S1 = 0`,
      `S2 = 0`,
      `H1 = 1`,
      `H2 = 2`,
      `H3 = 3`,
      `H4 = 4`
    );
  }
  else if (req.query.mode === 'awg_lite') {
    conf.push(
      `Jc = 4`,
      `Jmin = 8`,
      `Jmax = 32`
    );
  }
  else if (req.query.mode === 'awg_min') {
    conf.push(
      `Jc = 4`,
      `Jmin = 2`,
      `Jmax = 10`
    );
  }
  conf.push(
    `Address = ${combined.config.interface.addresses.v4}, ${combined.config.interface.addresses.v6}`,
    `DNS = 1.1.1.1, 1.0.0.1, 2606:4700:4700::1111, 2606:4700:4700::1001`,
    `MTU = 1280`,
    ``,
    `[Peer]`,
    `PublicKey = ${combined.config.peers[0].public_key}`,
    `Endpoint = ${combined.config.peers[0].endpoint.host}`,
    `# Endpoint = ${combined.config.peers[0].endpoint.v4}`,
    `# Endpoint = ${combined.config.peers[0].endpoint.v6}`,
    `AllowedIPs = 0.0.0.0/0, ::/0`
  );

  conf = conf.join('\n');

  if (req.query.dl === 'true') res.set('Content-Disposition', 'attachment; filename="warp.conf"');
  res.set('Content-Type', 'text/plain');
  res.send(conf);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
