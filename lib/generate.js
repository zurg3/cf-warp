const nacl = require('tweetnacl');

const clamp_secret = (secret) => {
  secret[0] &= 248;
  secret[31] = (secret[31] & 127) | 64;

  return secret;
};

module.exports = async () => {
  const key = clamp_secret(nacl.randomBytes(32));
  const key_pair = nacl.box.keyPair.fromSecretKey(key);
  const pub = key_pair.publicKey;

  return {
    private_key: Buffer.from(key).toString('base64'),
    public_key: Buffer.from(pub).toString('base64')
  };
};
