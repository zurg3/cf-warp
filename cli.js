const path = require('path');
const fs = require('fs-extra');

const generate = require('./lib/generate');
const register = require('./lib/register');
const info = require('./lib/info');
const ref = require('./lib/ref');
const conf = require('./lib/conf');

const args = process.argv.slice(2);

const base_dir = process.pkg ? path.dirname(process.execPath) : __dirname;
const resovle = (file) => path.join(base_dir, file);
const write = (file, content) => fs.writeFile(resovle(file), content, 'utf8');

async function get_config() {
  const mode = args[0];

  const keys = await generate();
  const data = await register(keys);
  const combined = Object.assign({}, keys, data, await info(data));

  await write('warp.conf', conf(combined, mode));
}

get_config();
