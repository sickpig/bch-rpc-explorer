var Decimal = require("decimal.js");
Decimal2 = Decimal.clone({ precision:2, rounding:2 });

var currencyUnits = [
	{
		type:"native",
		name:"NEX",
		multiplier:1,
		default:true,
		values:["", "nex", "NEX"],
		decimalPlaces:8
	},
	{
		type:"native",
		name:"mNEX",
		multiplier:1000,
		values:["mnex"],
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
	name:"Nexa",
	ticker:"NEX",
	logoUrl:"/img/logo/nex.svg",
	faviconUrl:"/img/logo/nex.ico",
	siteTitle:"Nexa Explorer",
	siteTitleHtml:"Nexa Explorer",
	siteDescriptionHtml:"<b>NEX Explorer</b> is <a href='https://gitlab.com/nexa/nex-rpc-explorer). If you run your own Nexa Full Node, **NEX Explorer** can easily run alongside it, communicating via RPC calls. See the project [ReadMe](https://gitlab.com/nexa/nex-rpc-explorer/README.md) for a list of features and instructions for running.",
	nodeTitle:"Nexa Full Node",
	nodeUrl:"https://nexa.org/download",
	demoSiteUrl: "https://explorer.nexa.org",
	miningPoolsConfigUrls:[
		"https://raw.githubusercontent.com/btccom/Blockchain-Known-Pools/master/pools.json",
	],
	maxBlockSizeByNetwork: {
		"main":   32000000,
		"test":   32000000,
	},
	difficultyAdjustmentBlockOffset: 1008,
	difficultyAdjustmentBlockCount: 4,
	maxSupplyByNetwork: {
		"main": new Decimal(100), // 1 nex = 100 statoshi, which means 2 decimal digit precision
		"test": new Decimal(100),
		"regtest": new Decimal(100)
	},
	targetBlockTimeSeconds: 120,
	targetBlockTimeMinutes: 2,
	currencyUnits:currencyUnits,
	currencyUnitsByName:{"NEX":currencyUnits[0], "KEX":currencyUnits[1], "MEX":currencyUnits[2], "sat":currencyUnits[3]},
	baseCurrencyUnit:currencyUnits[3],
	defaultCurrencyUnit:currencyUnits[0],
	feeSatoshiPerByteBucketMaxima: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50, 75, 100, 150],
// need to be chainged once we get it lunched
	genesisBlockHashesByNetwork:{ //FIXME: main net data need to be fixed after launch
		"main":    "4664461cc431873fd25559286065680b729be51877afe9657ec61f344eced50e",
		"test":    "508c843a4b98fb25f57cf9ebafb245a5c16468f06519cdd467059a91e7b79d52",
		"regtest": "d71ee431e307d12dfef31a6b21e071f1d5652c0eb6155c04e3222612c9d0b371"
	},
	genesisCoinbaseTransactionIdsByNetwork: {
		"main":    "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
		"test":    "bced5e4146c9b486b468023dd4f33b00d4e62c14a5c8cfc93f4c51f6246325dd",
		"regtest": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b"
	},
	genesisCoinbaseTransactionsByNetwork:{
		"main": {},
		"test": {
			"hex": "00000200000000000000000001510000000000000000001a6a00023b1c1474686973206973206e65786120746573746e657400000000",
			"txid": "bced5e4146c9b486b468023dd4f33b00d4e62c14a5c8cfc93f4c51f6246325dd",
			"hash": "bced5e4146c9b486b468023dd4f33b00d4e62c14a5c8cfc93f4c51f6246325dd",
			"txidem": "d5b2ac385e837833b66835c7b70b509cb8241bf445f83853ebf4abcf30e919c6",
			"version": 0,
			"size": 54,
			"locktime": 0,
			"confirmations": 9560,
			"vin": [
				{
				}
			],
			"vout": [
				{
					"value": 0.00,
					"type": 0,
					"n": 0,
					"scriptPubKey": {
						"asm": "1",
						"hex": "51",
						"type": "nonstandard",
					},
					"outpoint": "9e24ffa1ec51308a1aa5b0d8f68c1d6ad9c7a2e3a2c7eef2002d4928f67fbab9"
				},
				{
					"value": 0.00,
					"type": 0,
					"n": 1,
					"scriptPubKey": {
						"asm": "OP_RETURN 0 7227 74686973206973206e65786120746573746e6574",
						"hex": "6a00023b1c1474686973206973206e65786120746573746e6574",
						"type": "nulldata",
					},
					"outpoint": "c6fa649720f4ac52265c87ff3970add752780e0fc90bd251c2cf403d44734b7"
				}
			],
			"blockhash": "508c843a4b98fb25f57cf9ebafb245a5c16468f06519cdd467059a91e7b79d52",
			"time": 1649953806,
			"blocktime": 1649953806
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
		{},
		{},
	],
	exchangeRateData:{
		// see https://www.kraken.com/features/api#get-ticker-info for doc on that API
		// endoint. What we need in "jq" syntax is:
		// jq ."result"."NEXUSD"."c"[0] and jq ."result"."NEXEUR"."c"[0]
		// the above will return back the last trade closed at the time the url
		// has been fetched
		jsonUrl:"https://api.kraken.com/0/public/Ticker?pair=NEXUSD,NEXEUR",
		responseBodySelectorFunction:function(responseBody) {
			//console.log("Exchange Rate Response: " + JSON.stringify(responseBody));

			var exchangedCurrencies = ["NEXUSD", "NEXEUR"];

			if (responseBody.result) {
				var exchangeRates = {};

				for (var i = 0; i < exchangedCurrencies.length; i++) {
					if (responseBody.result[exchangedCurrencies[i]]) {
						var key = exchangedCurrencies[i].replace("NEX", "");
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
		var eras = [ new Decimal2(10000000) ];
		// since we have 2 decimal precision the last halving with a block reward > 0
		// would be the 30th
		for (var i = 1; i < 31; i++) {
			var previous = eras[i - 1];
			eras.push(new Decimal2(previous).dividedBy(2));
		}

		// 2 minutes bloc, 4 years halving period equals to 1.05 milion blocs
		var halvingBlockInterval = (chain == "regtest" ? 150 : 1050000);
		var index = Math.floor(blockHeight / halvingBlockInterval);

		return eras[index];
	}
};
