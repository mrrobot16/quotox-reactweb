const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const getConfig = require('hjs-webpack');
const join  = path.join;
const resolve = path.resolve;
const dotEnvVars = dotenv.config();
const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === 'development';
const root = resolve(__dirname);
const src = join(root, 'public');
const modules = join(root, 'node_modules');
const dest = join(root, 'dist');
const environmentEnv = dotenv.config({
  path: join(root, 'config', `${NODE_ENV}.config.js`),
  silent: true,
});
const envVariables = Object.assign({}, dotEnvVars, environmentEnv);
const defines = Object.keys(envVariables).reduce(
  (memo, key)=>{
    const val = JSON.stringify(envVariables[key]);
    memo[`__${key.toUpperCase()}__`] = val;
    return memo;
  },{
    __NODE_ENV__: JSON.stringify(NODE_ENV)
  });





var config = getConfig({
  isDev: isDev,
  in: join(src, 'app.js'),
  out: dest,
  clearBeforeBuild: true
});

config.postcss = [].concat([
  require('precss')({}),
  require('autoprefixer')({}),
  require('cssnano')({})
]);

config.plugins = [
  new webpack.DefinePlugin(defines)
].concat(config.plugins);


module.exports = config;
