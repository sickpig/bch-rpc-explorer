#!/usr/bin/env node

const args = require('meow')(`
    Usage
      $ nexa-rpc-explorer [options]

    Options
      -p, --port <port>              port to bind http server [default: 3002]
      -i, --host <host>              host to bind http server [default: 127.0.0.1]
      -a, --basic-auth-password <..> protect web interface with a password [default: no password]
      -C, --coin <coin>              crypto-coin to enable [default: NEX]

      -b, --nexad-uri <uri>       connection URI for nexad rpc (overrides the options below)
      -H, --nexad-host <host>     hostname for nexad rpc [default: 127.0.0.1]
      -P, --nexad-port <port>     port for nexad rpc [default: 7227]
      -c, --nexad-cookie <path>   path to nexad cookie file [default: ~/.nexa/.cookie]
      -u, --nexad-user <user>     username for nexad rpc [default: none]
      -w, --nexad-pass <pass>     password for nexad rpc [default: none]

      --address-api <option>         api to use for address queries (options: electrumx, blockchain.com, blockchair.com, blockcypher.com) [default: none]
      -E, --electrumx-servers <..>   comma separated list of electrum servers to use for address queries; only used if --address-api=electrumx [default: none]

      --rpc-allowall                 allow all rpc commands [default: false]
      --rpc-blacklist <methods>      comma separated list of rpc commands to block [default: see in config.js]
      --cookie-secret <secret>       secret key for signed cookie hmac generation [default: hmac derive from nexad pass]
      --demo                         enable demoSite mode [default: disabled]
      --no-rates                     disable fetching of currency exchange rates [default: enabled]
      --slow-device-mode             disable performance-intensive tasks (e.g. UTXO set fetching) [default: enabled]
      --privacy-mode                 enable privacyMode to disable external data requests [default: disabled]
      --max-mem <bytes>              value for max_old_space_size [default: 1024 (1 GB)]

      --ganalytics-tracking <tid>    tracking id for google analytics [default: disabled]
      --sentry-url <sentry-url>      sentry url [default: disabled]

      -e, --node-env <env>           nodejs environment mode [default: production]
      -h, --help                     output usage information
      -v, --version                  output version number

    Examples
      $ nexa-rpc-explorer --port 8080 --nexad-port 18443 --nexad-cookie ~/.nexa/regtest/.cookie
      $ nexa-rpc-explorer -p 8080 -P 18443 -c ~/.nexa/regtest.cookie

    Or using connection URIs
      $ nexa-rpc-explorer -b nexa://bob:myPassword@127.0.0.1:18443/
      $ nexa-rpc-explorer -b nexa://127.0.0.1:18443/?cookie=$HOME/.nexa/regtest/.cookie

    All options may also be specified as environment variables
      $ NEXEXP_PORT=8080 NEXEXP_NEXAD_PORT=18443 NEXEXP_NEXAD_COOKIE=~/.nexa/regtest/.cookie nexa-rpc-explorer


`, { flags: { port: {alias:'p'}, host: {alias:'i'}, basicAuthPassword: {alias:'a'}, coin: {alias:'C'}
            , nexadUri: {alias:'b'}, nexadHost: {alias:'H'}, nexadPort: {alias:'P'}
            , nexadCookie: {alias:'c'}, nexadUser: {alias:'u'}, nexadPass: {alias:'w'}
            , demo: {type:'boolean'}, rpcAllowall: {type:'boolean'}, electrumxServers: {alias:'E'}
            , nodeEnv: {alias:'e', default:'production'}
            , privacyMode: {type:'boolean'}, slowDeviceMode: {type:'boolean'}
            } }
).flags;

const envify = k => k.replace(/([A-Z])/g, '_$1').toUpperCase();

var defaultTrueWithoutNoPrefixVars = [ "SLOW_DEVICE_MODE" ];

Object.keys(args).filter(k => k.length > 1).forEach(k => {
  if (args[k] === false) {
    if (defaultTrueWithoutNoPrefixVars.includes(envify(k))) {
      process.env[`NEXEXP_${envify(k)}`] = false;

    } else {
      process.env[`NEXEXP_NO_${envify(k)}`] = true;
    }
  } else {
    process.env[`NEXEXP_${envify(k)}`] = args[k];
  }
});

require('./www');
