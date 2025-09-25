// https://github.com/maple3142/cf-warp/pull/36

const https = require('https');

const ssl_compat = () => {
  const open_ssl_major = Number(process.versions.openssl[0]);

  if (open_ssl_major < 3) {
    return {secureProtocol: 'TLSv1_1_method'};
  }

  return {};
};

module.exports = (url, method, headers, body) => new Promise((resolve, reject) => {
  const request = https.request(url, {
    headers,
    method,
    ...ssl_compat()
  });

  request.end(body);

  request.on('response', response => {
    const chunks = [];

    response.on('data', chunk => chunks.push(chunk));

    response.on('end', () => {
      const buf = Buffer.concat(chunks);

      resolve(buf.toString('utf-8'));
    });

    response.on('error', reject);
  });

  request.on('error', reject);
});
