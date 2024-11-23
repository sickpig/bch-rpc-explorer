var Decimal = require("decimal.js");
Decimal8 = Decimal.clone({ precision:8, rounding:8 });

var currencyUnits = [
	{
		type:"native",
		name:"BCH",
		multiplier:1,
		default:true,
		values:["", "bch", "BCH"],
		decimalPlaces:8
	},
	{
		type:"native",
		name:"mBCH",
		multiplier:1000,
		values:["mbch"],
		decimalPlaces:5
	},
	{
		type:"native",
		name:"bits",
		multiplier:1000000,
		values:["bits"],
		decimalPlaces:2
	},
	{
		type:"native",
		name:"sat",
		multiplier:100000000,
		values:["sat", "satoshi"],
		decimalPlaces:0
	},
	{
		type:"exchanged",
		name:"USD",
		multiplier:"usd",
		values:["usd"],
		decimalPlaces:2,
		symbol:"$"
	},
	{
		type:"exchanged",
		name:"EUR",
		multiplier:"eur",
		values:["eur"],
		decimalPlaces:2,
		symbol:"€"
	},
	{
		type:"exchanged",
		name:"ARS",
		multiplier:"ars",
		values:["ars"],
		decimalPlaces:2,
		symbol:"$",
		isExtendedRate: true
	},
];

module.exports = {
	name:"Bitcoin Cash",
	ticker:"BCH",
	logoUrl:"/img/logo/bch.svg",
	faviconUrl:"/img/logo/bch.ico",
	siteTitle:"Bitcoin Cash Explorer",
	siteTitleHtml:"Bitcoin Cash Explorer",
	siteDescriptionHtml:"<b>BCH Explorer</b> is <a href='https://github.com/sickpig/bch-rpc-explorer). If you run your own [Bitcoin Cash Full Node](https://www.bitcoincash.org/nodes.html), **BCH Explorer** can easily run alongside it, communicating via RPC calls. See the project [ReadMe](https://github.com/sickpig/bch-rpc-explorer) for a list of features and instructions for running.",
	nodeTitle:"Bitcoin Cash Full Node",
	nodeUrl:"https://www.bitcoinunlimited.info/download",
	demoSiteUrl: "https://explorer.bitcoinunlimited.info",
	miningPoolsConfigUrls:[
		"https://raw.githubusercontent.com/btccom/Blockchain-Known-Pools/master/pools.json",
		"https://raw.githubusercontent.com/blockchain/Blockchain-Known-Pools/master/pools.json"
	],
	maxBlockSizeByNetwork: {
		"main":   32000000,
		"test":   32000000,
		"chip":    2000000,
		"test4":   2000000,
		"scale": 256000000
	},
	difficultyAdjustmentBlockOffset: 1008,
	difficultyAdjustmentBlockCount: 4,
	maxSupplyByNetwork: {
		"main": new Decimal(20999817.31308491), // ref: https://bitcoin.stackexchange.com/a/38998
		"test": new Decimal(21000000),
		"chip": new Decimal(21000000),
		"test4": new Decimal(21000000),
		"scale": new Decimal(21000000),
		"regtest": new Decimal(21000000)
	},
	targetBlockTimeSeconds: 600,
	targetBlockTimeMinutes: 10,
	currencyUnits:currencyUnits,
	currencyUnitsByName:{"BCH":currencyUnits[0], "mBCH":currencyUnits[1], "bits":currencyUnits[2], "sat":currencyUnits[3]},
	baseCurrencyUnit:currencyUnits[3],
	defaultCurrencyUnit:currencyUnits[0],
	feeSatoshiPerByteBucketMaxima: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50, 75, 100, 150],
	genesisBlockHashesByNetwork:{
		"main":    "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
		"test":    "000000000933ea01ad0ee984209779baaec3ced90fa3f408719526f8d77f4943",
		"chip":    "000000001dd410c49a788668ce26751718cc797474d3152a5fc073dd44fd9f7b",
		"test4":   "000000001dd410c49a788668ce26751718cc797474d3152a5fc073dd44fd9f7b",
		"scale":   "00000000e6453dc2dfe1ffa19023f86002eb11dbb8e87d0291a4599f0430be52",
		"regtest": "0f9188f13cb7b2c71f2a335e3a4fc328bf5beb436012afca590b1a11466e2206"
	},
	genesisCoinbaseTransactionIdsByNetwork: {
		"main":    "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
		"test":    "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
		"chip":   "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
		"test4":   "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
		"scale":   "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
		"regtest": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b"
	},
	genesisCoinbaseTransactionsByNetwork:{
		"main": {
			"hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0804ffff001d02fd04ffffffff0100f2052a01000000434104f5eeb2b10c944c6b9fbcfff94c35bdeecd93df977882babc7f3a2cf7f5c81d3b09a68db7f0e04f21de5d4230e75e6dbe7ad16eefe0d4325a62067dc6f369446aac00000000",
			"txid": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
			"hash": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
			"size": 204,
			"version": 1,
			"confirmations":618235,
			"vin": [
				{
					"coinbase": "04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73",
					"sequence": 4294967295
				}
			],
			"vout": [
				{
					"value": 50,
					"n": 0,
					"scriptPubKey": {
						"asm": "04f5eeb2b10c944c6b9fbcfff94c35bdeecd93df977882babc7f3a2cf7f5c81d3b09a68db7f0e04f21de5d4230e75e6dbe7ad16eefe0d4325a62067dc6f369446a OP_CHECKSIG",
						"hex": "4104f5eeb2b10c944c6b9fbcfff94c35bdeecd93df977882babc7f3a2cf7f5c81d3b09a68db7f0e04f21de5d4230e75e6dbe7ad16eefe0d4325a62067dc6f369446aac",
						"reqSigs": 1,
						"type": "pubkey",
						"addresses": [
							"1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
						]
					}
				}
			],
			"blockhash": "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
			"time": 1230988505,
			"blocktime": 1230988505
		},
		"test": {
			"hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000",
			"txid": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
			"hash": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
			"version": 1,
			"size": 204,
			"locktime": 0,
			"vin": [
				{
					"coinbase": "04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73",
					"sequence": 4294967295
				}
			],
			"vout": [
				{
					"value": 50.00000000,
					"n": 0,
					"scriptPubKey": {
						"asm": "04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f OP_CHECKSIG",
						"hex": "4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac",
						"reqSigs": 1,
						"type": "pubkey",
						"addresses": [
							"mpXwg4jMtRhuSpVq4xS3HFHmCmWp9NyGKt"
						]
					}
				}
			],
			"blockhash": "000000000933ea01ad0ee984209779baaec3ced90fa3f408719526f8d77f4943",
			"time": 1296688602,
			"blocktime": 1296688602
		},
		"chip": {
			"hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000",
			"txid": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
			"hash": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
			"version": 1,
			"size": 204,
			"locktime": 0,
			"vin": [
				{
					"coinbase": "04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73",
					"sequence": 4294967295
				}
			],
			"vout": [
				{
					"value": 50.00000000,
					"n": 0,
					"scriptPubKey": {
						"asm": "04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f OP_CHECKSIG",
						"hex": "4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac",
						"reqSigs": 1,
						"type": "pubkey",
						"addresses": [
							"mpXwg4jMtRhuSpVq4xS3HFHmCmWp9NyGKt"
						]
					}
				}
			],
			"blockhash": "000000001dd410c49a788668ce26751718cc797474d3152a5fc073dd44fd9f7b",
			"time": 1597811185,
			"blocktime": 1597811185
		},
		"test4": {
			"hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000",
			"txid": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
			"hash": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
			"version": 1,
			"size": 204,
			"locktime": 0,
			"vin": [
				{
					"coinbase": "04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73",
					"sequence": 4294967295
				}
			],
			"vout": [
				{
					"value": 50.00000000,
					"n": 0,
					"scriptPubKey": {
						"asm": "04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f OP_CHECKSIG",
						"hex": "4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac",
						"reqSigs": 1,
						"type": "pubkey",
						"addresses": [
							"mpXwg4jMtRhuSpVq4xS3HFHmCmWp9NyGKt"
						]
					}
				}
			],
			"blockhash": "000000001dd410c49a788668ce26751718cc797474d3152a5fc073dd44fd9f7b",
			"time": 1597811185,
			"blocktime": 1597811185
		},
		"scale": {
			"hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000",
			"txid": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
			"hash": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
			"version": 1,
			"size": 204,
			"locktime": 0,
			"vin": [
				{
					"coinbase": "04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73",
					"sequence": 4294967295
				}
			],
			"vout": [
				{
					"value": 50.00000000,
					"n": 0,
					"scriptPubKey": {
						"asm": "04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f OP_CHECKSIG",
						"hex": "4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac",
						"reqSigs": 1,
						"type": "pubkey",
						"addresses": [
							"mpXwg4jMtRhuSpVq4xS3HFHmCmWp9NyGKt"
						]
					}
				}
			],
			"blockhash": "00000000e6453dc2dfe1ffa19023f86002eb11dbb8e87d0291a4599f0430be52",
			"time": 1598282438,
			"blocktime": 1598282438
		},
		"regtest": {
			"hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000",
			"txid": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
			"hash": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
			"version": 1,
			"size": 204,
			"locktime": 0,
			"vin": [
				{
					"coinbase": "04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73",
					"sequence": 4294967295
				}
			],
			"vout": [
				{
					"value": 50.00000000,
					"n": 0,
					"scriptPubKey": {
						"asm": "04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f OP_CHECKSIG",
						"hex": "4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac",
						"type": "pubkey"
					}
				}
			],
			"blockhash": "0f9188f13cb7b2c71f2a335e3a4fc328bf5beb436012afca590b1a11466e2206",
			"time": 1296688602,
			"blocktime": 1296688602
		}
	},
	genesisBlockStatsByNetwork:{
		"main": {
			"avgfee": 0,
			"avgfeerate": 0,
			"avgtxsize": 0,
			"blockhash": "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
			"feerate_percentiles": [
				0,
				0,
				0,
				0,
				0
			],
			"height": 0,
			"ins": 0,
			"maxfee": 0,
			"maxfeerate": 0,
			"maxtxsize": 0,
			"medianfee": 0,
			"mediantime": 1231006505,
			"mediantxsize": 0,
			"minfee": 0,
			"minfeerate": 0,
			"mintxsize": 0,
			"outs": 1,
			"subsidy": 50,
			"time": 1231006505,
			"total_out": 0,
			"total_size": 0,
			"totalfee": 0,
			"txs": 1,
			"utxo_increase": 1,
			"utxo_size_inc": 117
		},
		"test": {
			"avgfee": 0,
			"avgfeerate": 0,
			"avgtxsize": 0,
			"blockhash": "000000000933ea01ad0ee984209779baaec3ced90fa3f408719526f8d77f4943",
			"feerate_percentiles": [
				0,
				0,
				0,
				0,
				0
			],
			"height": 0,
			"ins": 0,
			"maxfee": 0,
			"maxfeerate": 0,
			"maxtxsize": 0,
			"medianfee": 0,
			"mediantime": 1296688602,
			"mediantxsize": 0,
			"minfee": 0,
			"minfeerate": 0,
			"mintxsize": 0,
			"outs": 1,
			"subsidy": 50,
			"time": 1296688602,
			"total_out": 0,
			"total_size": 0,
			"totalfee": 0,
			"txs": 1,
			"utxo_increase": 1,
			"utxo_size_inc": 117
		},
		"chip": {
			"avgfee": 0,
			"avgfeerate": 0,
			"avgtxsize": 0,
			"blockhash": "000000001dd410c49a788668ce26751718cc797474d3152a5fc073dd44fd9f7b",
			"feerate_percentiles": [
				0,
				0,
				0,
				0,
				0
			],
			"height": 0,
			"ins": 0,
			"maxfee": 0,
			"maxfeerate": 0,
			"maxtxsize": 0,
			"medianfee": 0,
			"mediantime": 1296688602,
			"mediantxsize": 0,
			"minfee": 0,
			"minfeerate": 0,
			"mintxsize": 0,
			"outs": 1,
			"subsidy": 50,
			"time": 1296688602,
			"total_out": 0,
			"total_size": 0,
			"totalfee": 0,
			"txs": 1,
			"utxo_increase": 1,
			"utxo_size_inc": 117
		},
		"test4": {
			"avgfee": 0,
			"avgfeerate": 0,
			"avgtxsize": 0,
			"blockhash": "000000001dd410c49a788668ce26751718cc797474d3152a5fc073dd44fd9f7b",
			"feerate_percentiles": [
				0,
				0,
				0,
				0,
				0
			],
			"height": 0,
			"ins": 0,
			"maxfee": 0,
			"maxfeerate": 0,
			"maxtxsize": 0,
			"medianfee": 0,
			"mediantime": 1296688602,
			"mediantxsize": 0,
			"minfee": 0,
			"minfeerate": 0,
			"mintxsize": 0,
			"outs": 1,
			"subsidy": 50,
			"time": 1296688602,
			"total_out": 0,
			"total_size": 0,
			"totalfee": 0,
			"txs": 1,
			"utxo_increase": 1,
			"utxo_size_inc": 117
		},
		"scale": {
			"avgfee": 0,
			"avgfeerate": 0,
			"avgtxsize": 0,
			"blockhash": "00000000e6453dc2dfe1ffa19023f86002eb11dbb8e87d0291a4599f0430be52",
			"feerate_percentiles": [
				0,
				0,
				0,
				0,
				0
			],
			"height": 0,
			"ins": 0,
			"maxfee": 0,
			"maxfeerate": 0,
			"maxtxsize": 0,
			"medianfee": 0,
			"mediantime": 1296688602,
			"mediantxsize": 0,
			"minfee": 0,
			"minfeerate": 0,
			"mintxsize": 0,
			"outs": 1,
			"subsidy": 50,
			"time": 1296688602,
			"total_out": 0,
			"total_size": 0,
			"totalfee": 0,
			"txs": 1,
			"utxo_increase": 1,
			"utxo_size_inc": 117
		}
	},
	genesisCoinbaseOutputAddressScripthash:"8b01df4e368ea28f8dc0423bcf7a4923e3a12d307c875e47a0cfbf90b5c39161",
	historicalData: [
		{
			type: "blockheight",
			date: "2009-01-03",
			chain: "main",
			blockHeight: 0,
			blockHash: "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
			summary: "The Bitcoin Cash Genesis Block.",
			alertBodyHtml: "This is the first block in the Bitcoin blockchain, known as the 'Genesis Block'. This block was mined by Bitcoin's creator Satoshi Nakamoto. You can read more about <a href='https://en.bitcoin.it/wiki/Genesis_block'>the genesis block</a>.",
			referenceUrl: "https://en.bitcoin.it/wiki/Genesis_block"
		},
		{
			type: "tx",
			date: "2009-01-03",
			chain: "main",
			txid: "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
			summary: "The coinbase transaction of the Genesis Block.",
			alertBodyHtml: "This transaction doesn't really exist! This is the coinbase transaction of the <a href='/block/000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f'>Bitcoin Genesis Block</a>. For more background about this special-case transaction, you can read <a href='https://github.com/bitcoin/bitcoin/issues/3303'>this brief discussion</a> among some of the <a href='https://bitcoin.org'>Bitcoin</a> developers.",
			referenceUrl: "https://github.com/bitcoin/bitcoin/issues/3303"
		},
		{
			type: "tx",
			date: "2009-10-12",
			chain: "main",
			txid: "7dff938918f07619abd38e4510890396b1cef4fbeca154fb7aafba8843295ea2",
			summary: "First bitcoin traded for fiat currency.",
			alertBodyHtml: "In this first-known BTC-to-fiat transaction, 5,050 BTC were exchanged for 5.02 USD, at an effective exchange rate of ~0.001 USD/BTC.",
			referenceUrl: "https://twitter.com/marttimalmi/status/423455561703624704"
		},
		{
			type: "blockheight",
			date: "2017-08-01",
			chain: "main",
			blockHeight: 478559,
			blockHash: "000000000000000000651ef99cb9fcbe0dadde1d424bd9f15ff20136191a5eec",
			summary: "First block after UAHF.",
			referenceUrl: "https://twitter.com/btcfork/status/892449023893831680"
		},
		{
			type: "blockheight",
			date: "2012-11-28",
			chain: "main",
			blockHeight: 210000,
			blockHash: "000000000000048b95347e83192f69cf0366076336c639f9b7228e9ba171342e",
			summary: "First block of subsidy era #2 (25 BTC).",
			referenceUrl: "https://github.com/BitcoinUnlimited/BitcoinUnlimited/blob/dev/src/validation/validation.cpp#L1258"
		},
		{
			type: "blockheight",
			date: "2016-07-09",
			chain: "main",
			blockHeight: 420000,
			blockHash: "000000000000000002cce816c0ab2c5c269cb081896b7dcb34b8422d6b74ffa1",
			summary: "First block of subsidy era #3 (12.5 BTC).",
			referenceUrl: "https://github.com/BitcoinUnlimited/BitcoinUnlimited/blob/dev/src/validation/validation.cpp#L1258"
		},
		{
			type: "blockheight",
			date: "2020-04-08",
			chain: "main",
			blockHeight: 630000,
			blockHash: "00000000000000000169a496bfafa84ad8d3ef8039fc9e391a8eada67996b9c8",
			summary: "First block of subsidy era #4 (6.25 BTC).",
			referenceUrl: "https://github.com/BitcoinUnlimited/BitcoinUnlimited/blob/dev/src/validation/validation.cpp#L1258"
		},
		{
			type: "tx",
			date: "2014-06-16",
			chain: "main",
			txid: "143a3d7e7599557f9d63e7f224f34d33e9251b2c23c38f95631b3a54de53f024",
			summary: "Star Wars: A New Hope",
			referenceUrl: ""
		},
		{
			type: "tx",
			date: "2010-05-22",
			chain: "main",
			txid: "a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d",
			summary: "The 'Bitcoin Pizza' transaction.",
			alertBodyHtml: "This is the famous 'Bitcoin Pizza' transaction, one of the earliest 'real-world' transactions, in which 10,000 BTC was paid for 2 large pizzas worth ~41 USD (at an effective exchange rate of ~$0.04/BTC).",
			referenceUrl: "https://bitcointalk.org/index.php?topic=137.0"
		},
		{
			type: "tx",
			date: "2011-05-18",
			chain: "main",
			txid: "5d80a29be1609db91658b401f85921a86ab4755969729b65257651bb9fd2c10d",
			summary: "Destroyed bitcoin.",
			referenceUrl: "https://bitcointalk.org/index.php?topic=7253.msg184414#msg184414",
			referenceUrl2: "https://www.reddit.com/r/Bitcoin/comments/7mhoks/til_in_2011_a_user_running_a_modified_mining/"
		},
		{
			type: "blockheight",
			date: "2009-01-12",
			chain: "main",
			blockHeight: 170,
			blockHash: "00000000d1145790a8694403d4063f323d499e655c83426834d4ce2f8dd4a2ee",
			summary: "First block containing a (non-coinbase) transaction.",
			alertBodyHtml: "This block comes 9 days after the genesis block and is the first to contain a transfer of bitcoin. Before this block all blocks contained only coinbase transactions which mint new bitcoin. <br/>See transaction #1 (f4184fc…) below for more info.",
			referenceUrl: "https://bitcointalk.org/index.php?topic=91806.msg1012234#msg1012234"
		},
		{
			type: "tx",
			date: "2009-01-12",
			chain: "main",
			txid: "f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16",
			summary: "The first transfer of bitcoin.",
			alertBodyHtml: "This transaction represents the first ever transfer of bitcoin from one person to another. It also has the added distinction of being (one of?) the only known transfers of bitcoin from Satoshi Nakamoto, in this case sending bitcoin to Hal Finney as a test."
		},
		{
			type:"address",
			date:"2011-12-03",
			chain: "main",
			address:"1JryTePceSiWVpoNBU8SbwiT7J4ghzijzW",
			summary:"Brainwallet address for 'Satoshi Nakamoto'",
			referenceUrl:"https://twitter.com/MrHodl/status/1041448002005741568",
			alertBodyHtml:"This address was generated from the SHA256 hash of 'Satoshi Nakamoto' as example of the 'brainwallet' concept."
		},
		{
			type: "tx",
			date: "2010-11-14",
			chain: "main",
			txid: "e3bf3d07d4b0375638d5f1db5255fe07ba2c4cb067cd81b84ee974b6585fb468",
			summary: "Duplicated coinbase transaction #1",
			referenceUrl: "https://bitcoin.stackexchange.com/questions/38994/will-there-be-21-million-bitcoins-eventually/38998#38998",
			alertBodyHtml: "This is one of 2 'duplicate coinbase' transactions. An early bitcoin bug (fixed by <a href='https://github.com/bitcoin/bips/blob/master/bip-0030.mediawiki'>BIP30</a>) allowed identical coinbase transactions - a newer duplicate would overwrite older copies. This transaction was the coinbase transaction for <a href='/block-height/91722'>Block #91,722</a> and, ~16 hours later, <a href='/block-height/91880'>Block #91,880</a>. The 50 BTC claimed as the coinbase for block 91,722 were also overwritten and lost."
		},
		{
			type: "tx",
			date: "2010-11-14",
			chain: "main",
			txid: "d5d27987d2a3dfc724e359870c6644b40e497bdc0589a033220fe15429d88599",
			summary: "Duplicated coinbase transaction #2",
			referenceUrl: "https://bitcoin.stackexchange.com/questions/38994/will-there-be-21-million-bitcoins-eventually/38998#38998",
			alertBodyHtml: "This is one of 2 'duplicate coinbase' transactions. An early bitcoin bug (fixed by <a href='https://github.com/bitcoin/bips/blob/master/bip-0030.mediawiki'>BIP30</a>) allowed identical coinbase transactions - a newer duplicate would overwrite older copies. This transaction was the coinbase transaction for <a href='/block-height/91812'>Block #91,812</a> and, ~3 hours later, <a href='/block-height/91842'>Block #91,842</a>. The 50 BTC claimed as the coinbase for block 91,812 were also overwritten and lost."
		},

		// testnet
		{
			type: "blockheight",
			date: "2011-02-02",
			chain: "test",
			blockHeight: 0,
			blockHash: "000000000933ea01ad0ee984209779baaec3ced90fa3f408719526f8d77f4943",
			summary: "The Bitcoin (regtest) Genesis Block.",
			alertBodyHtml: "This is the first block in the Bitcoin blockchain, known as the 'Genesis Block'. You can read more about <a href='https://en.bitcoin.it/wiki/Genesis_block'>the genesis block</a>.",
			referenceUrl: "https://en.bitcoin.it/wiki/Genesis_block"
		},
		{
			type: "tx",
			date: "2011-02-02",
			chain: "test",
			txid: "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
			summary: "The coinbase transaction of the Genesis Block.",
			alertBodyHtml: "This transaction doesn't really exist! This is the coinbase transaction of the <a href='/block/000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f'>Bitcoin Genesis Block</a>. For more background about this special-case transaction, you can read <a href='https://github.com/bitcoin/bitcoin/issues/3303'>this brief discussion</a> among some of the <a href='https://bitcoin.org'>Bitcoin</a> developers.",
			referenceUrl: "https://github.com/bitcoin/bitcoin/issues/3303"
		},

		// regtest
		{
			type: "blockheight",
			date: "2011-02-02",
			chain: "regtest",
			blockHeight: 0,
			blockHash: "0f9188f13cb7b2c71f2a335e3a4fc328bf5beb436012afca590b1a11466e2206",
			summary: "The Bitcoin (regtest) Genesis Block.",
			alertBodyHtml: "This is the first block in the Bitcoin blockchain, known as the 'Genesis Block'. You can read more about <a href='https://en.bitcoin.it/wiki/Genesis_block'>the genesis block</a>.",
			referenceUrl: "https://en.bitcoin.it/wiki/Genesis_block"
		},
		{
			type: "tx",
			date: "2011-02-02",
			chain: "regtest",
			txid: "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
			summary: "The coinbase transaction of the Genesis Block.",
			alertBodyHtml: "This transaction doesn't really exist! This is the coinbase transaction of the <a href='/block/000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f'>Bitcoin Genesis Block</a>. For more background about this special-case transaction, you can read <a href='https://github.com/bitcoin/bitcoin/issues/3303'>this brief discussion</a> among some of the <a href='https://bitcoin.org'>Bitcoin</a> developers.",
			referenceUrl: "https://github.com/bitcoin/bitcoin/issues/3303"
		},

		// chipnet
		{
			type: "blockheight",
			date: "2022-11-15",
			chain: "chip",
			blockHeight: 121957,
			blockHash:
				"0000000056087dee73fb66178ca70da89dfd0be098b1a63cf6fe93934cd04c78",
			summary: "May 2023 Upgrade Chipnet Activation",
			alertBodyHtml:
				"The May 2023 Upgrade for Bitcoin Cash activated on chipnet shortly after 12 UTC, November 15, 2022. Chipnet activates upgrades 6 months early, giving developers months to build with new upgrades before they're active on the main network. Chipnet offers more certainty, wider testing, and stronger launches. 🚀",
			referenceUrl: "https://blog.bitjson.com/bitcoin-cash-upgrade-2023/",
		},
		{
			type: "tx",
			date: "2022-11-15",
			chain: "chip",
			txid: "856c7b8a7607b7302cbe21a03944ead936e4486bd1f3e030b7f1b53af0338f0f",
			summary: "An 87-byte transaction",
			alertBodyHtml:
				"Before the May 2023 Upgrade activated, transactions were required to be at least 100 bytes, wasting space in some contract applications. This is the first transaction smaller than 100 bytes mined on chipnet.",
			referenceUrl: "https://twitter.com/bitjson/status/1592576796205387776",
		},
		{
			type: "tx",
			date: "2022-11-15",
			chain: "chip",
			txid: "a0152b142c7acafbc2af757754797dfde62582db3ed0edd380a0e977cae0f777",
			summary: "CashTokens Demo: Double-Category Genesis",
			alertBodyHtml:
				"A two-category token genesis transaction: every output type, every token amount encoding length, one minting and one immutable non-fungible token (NFT). Note, this transaction can also be located using the chipnet CashAccount: <code>CashTokens#121957</code>.",
			referenceUrl: "https://twitter.com/bitjson/status/1592576797467893760",
		},
		{
			type: "tx",
			date: "2022-11-15",
			chain: "chip",
			txid: "b84debf788680257285e8a67e3a52592bc17089f1dce997c0f8255b4e9608c41",
			summary: "CashTokens Demo: NFT Minting",
			alertBodyHtml:
				'Genesis for a third category; merges all fungible tokens from the first CashTokens Demo transaction, placing the max amount in an NFT-locked covenant marked with "reserved supply" (using a mutable token); mints a variety of NFTs.',
			referenceUrl: "https://twitter.com/bitjson/status/1592576798675546112",
		},
		{
			type: "tx",
			date: "2022-11-15",
			chain: "chip",
			txid: "670a0402bd50af7fee349511221e5b92eb90dcc4e1d3dce451e228fc1c6aa39a",
			summary: "First NFT Spend",
			alertBodyHtml:
				'The first spend of an NFT on chipnet. A minimal transaction moving an immutable NFT (capability: "none") from one address to another. The NFT has a commitment of <code>0xf09f8c8e</code> (utf8: <code>🌎</code>).',
			referenceUrl: "https://twitter.com/bitjson/status/1592576800340574208",
		},
		{
			type: "tx",
			date: "2022-11-15",
			chain: "chip",
			txid: "142e5adef124019b4929e7656fc20b7a061987e6d340d47a3753cee17eb6049e",
			summary: "NFT-unlocked Covenant Spend",
			alertBodyHtml:
				"An NFT-locked covenant is unlocked using an NFT. The NFTs commitment is <code>0x68656c6c6f</code> (utf8: <code>hello</code>) which only enables the release of 1000 FTs per block. (Inspect the contract to see that the <code>🌎</code> NFT unconditionally unlocks the vault.)",
			referenceUrl: "https://twitter.com/bitjson/status/1592576802118959104",
		},
	],
	exchangeRateData:{
		// see https://www.kraken.com/features/api#get-ticker-info for doc on that API
		// endoint. What we need in "jq" syntax is:
		// jq ."result"."BCHUSD"."c"[0] and jq ."result"."BCHEUR"."c"[0]
		// the above will return back the last trade closed at the time the url
		// has been fetched
		jsonUrl:"https://api.kraken.com/0/public/Ticker?pair=BCHUSD,BCHEUR",
		responseBodySelectorFunction:function(responseBody) {
			//console.log("Exchange Rate Response: " + JSON.stringify(responseBody));

			var exchangedCurrencies = ["BCHUSD", "BCHEUR"];

			if (responseBody.result) {
				var exchangeRates = {};

				for (var i = 0; i < exchangedCurrencies.length; i++) {
					if (responseBody.result[exchangedCurrencies[i]]) {
						var key = exchangedCurrencies[i].replace("BCH", "");
						exchangeRates[key.toLowerCase()] = responseBody.result[exchangedCurrencies[i]]["c"][0];
					}
				}

				return exchangeRates;
			}

			return null;
		}
	},
	exchangeRateDataExtension:[
		{
			jsonUrl:"https://api.yadio.io/exrates",
			responseBodySelectorFunction:function(responseBody) {
				//console.log("Exchange Rate Response: " + JSON.stringify(responseBody));

				var exchangedCurrencies = ["ARS"];
				
				if (responseBody.base) {
					var exchangeRates = {};
					
					for (var i = 0; i < exchangedCurrencies.length; i++) {
						var key = exchangedCurrencies[i];
						if (responseBody['USD']) {
							// If found duped currency units for the same api source then skip all instead of retrieve wrong rates.
							var applicableUnit = currencyUnits.filter(x => x.name === key).length == 1 ? currencyUnits.find(x => x.name === key) : undefined;
							if (applicableUnit) {
								exchangeRates[key.toLowerCase()] = parseFloat(responseBody['USD'][key]).toString();
							}
						}
					}
					return exchangeRates;
				}
	
				return null;
			}
		}
	],
	blockRewardFunction:function(blockHeight, chain) {
		var eras = [ new Decimal8(50) ];
		for (var i = 1; i < 34; i++) {
			var previous = eras[i - 1];
			eras.push(new Decimal8(previous).dividedBy(2));
		}

		var halvingBlockInterval = (chain == "regtest" ? 150 : 210000);
		var index = Math.floor(blockHeight / halvingBlockInterval);

		return eras[index];
	}
};
