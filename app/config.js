var fs = require('fs');
var crypto = require('crypto');
var url = require('url');

var coins = require("./coins.js");
var credentials = require("./credentials.js");

var currentCoin = process.env.BTCEXP_COIN || "BCH";

var rpcCred = credentials.rpc;

if (rpcCred.cookie && !rpcCred.username && !rpcCred.password && fs.existsSync(rpcCred.cookie)) {
  console.log(`Loading RPC cookie file: ${rpcCred.cookie}`);

  [ rpcCred.username, rpcCred.password ] = fs.readFileSync(rpcCred.cookie).toString().split(':', 2);

  if (!rpcCred.password) {
    throw new Error(`Cookie file ${rpcCred.cookie} in unexpected format`);
  }
}

var cookieSecret = process.env.BTCEXP_COOKIE_SECRET
 || (rpcCred.password && crypto.createHmac('sha256', JSON.stringify(rpcCred))
                               .update('btc-rpc-explorer-cookie-secret').digest('hex'))
 || "0x000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f";


var electrumXServerUriStrings = (process.env.BTCEXP_ELECTRUMX_SERVERS || "").split(',').filter(Boolean);
var electrumXServers = [];
for (var i = 0; i < electrumXServerUriStrings.length; i++) {
  var uri = url.parse(electrumXServerUriStrings[i]);

  electrumXServers.push({protocol:uri.protocol.substring(0, uri.protocol.length - 1), host:uri.hostname, port:parseInt(uri.port)});
}

["BTCEXP_DEMO", "BTCEXP_PRIVACY_MODE", "BTCEXP_NO_INMEMORY_RPC_CACHE", "BTCEXP_UI_SHOW_RPC", "BTCEXP_HEADER_BY_HEIGHT_SUPPORT", "BTCEXP_BLOCK_BY_HEIGHT_SUPPORT"].forEach(function(item) {
  if (process.env[item] === undefined) {
    process.env[item] = "false";
  }
});

["BTCEXP_NO_RATES", "BTCEXP_UI_SHOW_TOOLS_SUBHEADER", "BTCEXP_SLOW_DEVICE_MODE", "BTCEXP_HIDE_IP"].forEach(function(item) {
  if (process.env[item] === undefined) {
    process.env[item] = "true";
  }
});

var siteToolsJSON = [
  { "name": "Node Status", "url": "/node-status", "desc": "Summary of this node: version, network, uptime, etc.", "fontawesome": "fas fa-broadcast-tower" },
  { "name": "Peers", "url": "/peers", "desc": "Detailed info about the peers connected to this node.", "fontawesome": "fas fa-sitemap" },
  { "name": "Browse Blocks", "url": "/blocks", "desc": "Browse all blocks in the blockchain.", "fontawesome": "fas fa-cubes" },
  { "name": "Transaction Stats", "url": "/tx-stats", "desc": "See graphs of total transaction volume and transaction rates.", "fontawesome": "fas fa-chart-bar" },
  { "name": "Mempool Summary", "url": "/mempool-summary", "desc": "Detailed summary of the current mempool for this node.", "fontawesome": "fas fa-clipboard-list" },
  { "name": "Unconfirmed Txs", "url": "/unconfirmed-tx", "desc": "Browse unconfirmed/pending transactions.", "fontawesome": "fas fa-unlock-alt" },
  { "name": `${coins[currentCoin].name} Fun`, "url": "/fun", "desc": "See fun/interesting historical blockchain data.", "fontawesome": "fas fa-certificate" },
  { "name": "Mining Summary", "url": "/mining-summary", "desc": "Summary of recent data about miners.", "fontawesome": "fas fa-chart-pie" },
  { "name": "Block Stats", "url": "/block-stats", "desc": "Summary data for blocks in configurable range.", "fontawesome": "fas fa-layer-group" },
  { "name": "Block Analysis", "url": "/block-analysis", "desc": "Summary analysis for all transactions in a block.", "fontawesome": "fas fa-angle-double-down" },
  { "name": "Difficulty History", "url": "/difficulty-history", "desc": "Graph of difficulty changes over time.", "fontawesome": "fas fa-chart-line" },
  { "name": "Decoder", "url": "/decoder", "desc": "Transaction/script decoder.", "fontawesome": "fas fa-flask" }
];

if (process.env.BTCEXP_UI_SHOW_RPC.toLowerCase() === "true") {
  siteToolsJSON.push({ "name": "RPC Browser", "url": "/rpc-browser", "desc": "Browse the RPC functionality of this node. See docs and execute commands.", "fontawesome": "fas fa-book" })
  siteToolsJSON.push({ "name": "RPC Terminal", "url": "/rpc-terminal", "desc": "Directly execute RPCs against this node.", "fontawesome": "fas fa-terminal" })
}

module.exports = {
  coin: currentCoin,

  cookieSecret: cookieSecret,

  privacyMode: (process.env.BTCEXP_PRIVACY_MODE.toLowerCase() == "true"),
  slowDeviceMode: (process.env.BTCEXP_SLOW_DEVICE_MODE.toLowerCase() == "true"),
  demoSite: (process.env.BTCEXP_DEMO.toLowerCase() == "true"),
  showRpc: (process.env.BTCEXP_UI_SHOW_RPC.toLowerCase() === "true"),
  queryExchangeRates: (process.env.BTCEXP_NO_RATES.toLowerCase() != "true"),
  noInmemoryRpcCache: (process.env.BTCEXP_NO_INMEMORY_RPC_CACHE.toLowerCase() == "true"),
  headerByHeightSupport: (process.env.BTCEXP_HEADER_BY_HEIGHT_SUPPORT.toLowerCase() == "true"),
  blockByHeightSupport: (process.env.BTCEXP_BLOCK_BY_HEIGHT_SUPPORT.toLowerCase() == "true"),
  hideIp: (process.env.BTCEXP_HIDE_IP.toLowerCase() == "true"),

  rpcConcurrency: (process.env.BTCEXP_RPC_CONCURRENCY || 10),

  rpcBlacklist:
    process.env.BTCEXP_RPC_ALLOWALL  ? []
  : process.env.BTCEXP_RPC_BLACKLIST ? process.env.BTCEXP_RPC_BLACKLIST.split(',').filter(Boolean)
  : [
    "addnode",
    "backupwallet",
    "bumpfee",
    "clearbanned",
    "createmultisig",
    "createwallet",
    "disconnectnode",
    "dumpprivkey",
    "dumpwallet",
    "encryptwallet",
    "generate",
    "generatetoaddress",
    "getaccountaddrss",
    "getaddressesbyaccount",
    "getbalance",
    "getnewaddress",
    "getrawchangeaddress",
    "getreceivedbyaccount",
    "getreceivedbyaddress",
    "gettransaction",
    "getunconfirmedbalance",
    "getwalletinfo",
    "importaddress",
    "importmulti",
    "importprivkey",
    "importprunedfunds",
    "importpubkey",
    "importwallet",
    "invalidateblock",
    "keypoolrefill",
    "listaccounts",
    "listaddressgroupings",
    "listlockunspent",
    "listreceivedbyaccount",
    "listreceivedbyaddress",
    "listsinceblock",
    "listtransactions",
    "listunspent",
    "listwallets",
    "lockunspent",
    "logging",
    "move",
    "preciousblock",
    "pruneblockchain",
    "reconsiderblock",
    "removeprunedfunds",
    "rescanblockchain",
    "savemempool",
    "sendfrom",
    "sendmany",
    "sendtoaddress",
    "sendrawtransaction",
    "setaccount",
    "setban",
    "setmocktime",
    "setnetworkactive",
    "signmessage",
    "signmessagewithprivatekey",
    "signrawtransaction",
    "signrawtransactionwithkey",
    "stop",
    "submitblock",
    "syncwithvalidationinterfacequeue",
    "verifychain",
    "waitforblock",
    "waitforblockheight",
    "waitfornewblock",
    "walletlock",
    "walletpassphrase",
    "walletpassphrasechange",
  ],

  addressApi:process.env.BTCEXP_ADDRESS_API,
  electrumXServers:electrumXServers,

  redisUrl:process.env.BTCEXP_REDIS_URL,

  site: {
    homepage:{
      recentBlocksCount:10
    },
    blockTxPageSize:20,
    addressTxPageSize:10,
    txMaxInput:15,
    browseBlocksPageSize:50,
    addressPage:{
      txOutputMaxDefaultDisplay:10
    },
    valueDisplayMaxLargeDigits: 4,
    header:{
      showToolsSubheader:(process.env.BTCEXP_UI_SHOW_TOOLS_SUBHEADER == "true"),
      dropdowns:[
        {
          title:"Related Sites",
          links:[
            // TODO: find better images for this URLs, in the mean time use bch.svg
            {name: "Bitcoin Unlimited", url:"https://www.bitcoinunlimited.info", imgUrl:"/img/logo/bu.png"},
            {name: "Bitcoin Cash Nodes", url:"https://cashnodes.io", imgUrl:"/img/logo/bch.svg"},
            {name: "BCH PoW Monitoring", url:"https://fork.lol", imgUrl:"/img/logo/fork.png"},
            {name: "BCH Specification", url:"https://reference.cash", imgUrl:"/img/logo/refcash.ico"},
            {name: "Bitcoin Cash Node", url:"https://bitcoincashnode.org/", imgUrl:"/img/logo/bchn.png"},
          ]
        }
      ]
    },
    subHeaderToolsList:[0, 1, 4, 7, 8, 9], // indexes in "siteTools" below that are shown in the site "sub menu" (visible on all pages except homepage)
    prioritizedToolIdsList: [0, 1, 4, 7, 8, 9, 3, 2, 5, 10, 11, 6],
  },

  credentials: credentials,

  siteTools: siteToolsJSON,

  donations:{
    addresses:{
      coins:["BCH"],
      sites:{"BCH":"https://www.bitcoinunlimited.info"},

      "BCH":{address:"bitcoincash:pq6snv5fcx2fp6dlzg7s0m9zs8yqh74335tzvvfcmq"}
    }
  }

};
