const cps = require('./cps');

module.exports = ({private_key, public_key, config}, mode) => {
  let conf = [];

  const alt_endpoint = `${config.peers[0].endpoint.v4.split(':')[0]}:${config.peers[0].endpoint.ports[0]}`;

  const junk = {
    awg_full: {c: 120, min: 23, max: 911},
    awg_lite: {c: 4, min: 8, max: 32},
    awg_min: {c: 4, min: 2, max: 10},
    awg_15: {c: 4, min: 8, max: 32}
  };

  conf.push(
    `[Interface]`,
    `PrivateKey = ${private_key}`,
    `# PublicKey = ${public_key}`
  );
  if (['awg_full', 'awg_lite', 'awg_min', 'awg_15'].includes(mode)) {
    conf.push(
      `Jc = ${junk[mode].c}`,
      `Jmin = ${junk[mode].min}`,
      `Jmax = ${junk[mode].max}`
    );
  }
  if (['awg_full', 'awg_15'].includes(mode)) {
    conf.push(
      `S1 = 0`,
      `S2 = 0`,
      `H1 = 1`,
      `H2 = 2`,
      `H3 = 3`,
      `H4 = 4`
    );
  }
  if (['awg_15'].includes(mode)) {
    conf.push(
      `I1 = ${cps.signature_packet}`
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
    `# Endpoint = ${alt_endpoint}`,
    `AllowedIPs = 0.0.0.0/0, ::/0`
  );

  conf = conf.join('\n');

  return conf;
};
