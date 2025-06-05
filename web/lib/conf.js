module.exports = ({private_key, public_key, config}, mode) => {
  let conf = [];

  conf.push(
    `[Interface]`,
    `PrivateKey = ${private_key}`,
    `# PublicKey = ${public_key}`
  );
  if (mode === 'awg_full') {
    conf.push(
      `Jc = 120`,
      `Jmin = 23`,
      `Jmax = 911`
    );
  }
  else if (mode === 'awg_lite') {
    conf.push(
      `Jc = 4`,
      `Jmin = 8`,
      `Jmax = 32`
    );
  }
  else if (mode === 'awg_min') {
    conf.push(
      `Jc = 4`,
      `Jmin = 2`,
      `Jmax = 10`
    );
  }
  else if (mode === 'awg_max') {
    conf.push(
      `Jc = 128`,
      `Jmin = 1`,
      `Jmax = 1280`
    );
  }
  if (mode === 'awg_full' || mode === 'awg_max') {
    conf.push(
      `S1 = 0`,
      `S2 = 0`,
      `H1 = 1`,
      `H2 = 2`,
      `H3 = 3`,
      `H4 = 4`
    );
  }
  conf.push(
    `Address = ${config.interface.addresses.v4}, ${config.interface.addresses.v6}`,
    `DNS = 1.1.1.1, 1.0.0.1, 2606:4700:4700::1111, 2606:4700:4700::1001`,
    `MTU = 1280`,
    ``,
    `[Peer]`,
    `PublicKey = ${config.peers[0].public_key}`,
    `Endpoint = ${config.peers[0].endpoint.host}`,
    `# Endpoint = ${config.peers[0].endpoint.v4}`,
    `# Endpoint = ${config.peers[0].endpoint.v6}`,
    `AllowedIPs = 0.0.0.0/0, ::/0`
  );

  conf = conf.join('\n');

  return conf;
};
