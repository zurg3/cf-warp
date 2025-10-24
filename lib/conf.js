module.exports = ({private_key, public_key, config}, mode) => {
  let conf = [];

  const junk = {
    awg_full: {c: 120, min: 23, max: 911},
    awg_lite: {c: 4, min: 8, max: 32},
    awg_min: {c: 4, min: 2, max: 10}
  };

  conf.push(
    `[Interface]`,
    `PrivateKey = ${private_key}`,
    `# PublicKey = ${public_key}`
  );
  if (['awg_full', 'awg_lite', 'awg_min'].includes(mode)) {
    conf.push(
      `Jc = ${junk[mode].c}`,
      `Jmin = ${junk[mode].min}`,
      `Jmax = ${junk[mode].max}`
    );
  }
  if (['awg_full'].includes(mode)) {
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
