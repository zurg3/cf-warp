const cps = require('./cps');

module.exports = ({private_key, public_key, config}, preset) => {
  const conf = [];

  const alt_endpoint = `${config.peers[0].endpoint.v4.split(':')[0]}:${config.peers[0].endpoint.ports[0]}`;

  const junk = {
    awg: {c: 4, min: 8, max: 32},
    awg_lite: {c: 4, min: 2, max: 10},
    awg_15: {c: 4, min: 8, max: 32},
    awg_15_lite: {c: 4, min: 2, max: 10}
  };

  conf.push(
    `[Interface]`,
    `PrivateKey = ${private_key}`,
    `# PublicKey = ${public_key}`
  );
  if (Object.keys(junk).includes(preset)) {
    conf.push(
      `Jc = ${junk[preset].c}`,
      `Jmin = ${junk[preset].min}`,
      `Jmax = ${junk[preset].max}`
    );
  }
  if (['awg', 'awg_15'].includes(preset)) {
    conf.push(
      `S1 = 0`,
      `S2 = 0`,
      `H1 = 1`,
      `H2 = 2`,
      `H3 = 3`,
      `H4 = 4`
    );
  }
  if (['awg_15', 'awg_15_lite'].includes(preset)) {
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

  return conf.join('\n');
};
