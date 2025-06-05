const request = require('./https-request');

const gen_string = (length) => {
  return [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join('');
}

module.exports = async ({public_key, referrer}) => {
  const install_id = gen_string(11);
  const json = await request(
    'https://api.cloudflareclient.com/v0a977/reg',
    'POST',
    {
      'User-Agent': 'okhttp/3.12.1',
      'Content-Type': 'application/json; charset=UTF-8'
    },
    JSON.stringify({
      key: public_key || `${gen_string(43)}=`,
      install_id,
      fcm_token: `${install_id}:APA91b${gen_string(134)}`,
      referrer: referrer || '',
      warp_enabled: true,
      tos: new Date().toISOString().replace('Z', '+08:00'),
      model: 'Xiaomi POCO X2',
      type: 'Android',
      locale: 'en_US'
    })
  );

  return JSON.parse(json);
};
