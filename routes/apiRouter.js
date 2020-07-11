var debug = require("debug");
var debugLog = debug("bchexp:router");

var express = require('express');
var csurf = require('csurf');
var router = express.Router();
var util = require('util');
var moment = require('moment');
var bitcoinCore = require("bitcoin-core");
var qrcode = require('qrcode');
var bitcoinjs = require('bitcoinjs-lib');
var sha256 = require("crypto-js/sha256");
var hexEnc = require("crypto-js/enc-hex");
var Decimal = require("decimal.js");
var marked = require("marked");

var utils = require('./../app/utils.js');
var coins = require("./../app/coins.js");
var config = require("./../app/config.js");
var coreApi = require("./../app/api/coreApi.js");
var addressApi = require("./../app/api/addressApi.js");

const forceCsrf = csurf({ ignoreMethods: [] });





router.get("/blocks-by-height/:blockHeights", function(req, res, next) {
	var blockHeightStrs = req.params.blockHeights.split(",");
	
	var blockHeights = [];
	for (var i = 0; i < blockHeightStrs.length; i++) {
		blockHeights.push(parseInt(blockHeightStrs[i]));
	}

	coreApi.getBlocksByHeight(blockHeights).then(function(result) {
		res.json(result);
	});
});

router.get("/block-headers-by-height/:blockHeights", function(req, res, next) {
	var blockHeightStrs = req.params.blockHeights.split(",");
	
	var blockHeights = [];
	for (var i = 0; i < blockHeightStrs.length; i++) {
		blockHeights.push(parseInt(blockHeightStrs[i]));
	}

	coreApi.getBlockHeadersByHeight(blockHeights).then(function(result) {
		res.json(result);
	});
});

router.get("/block-stats-by-height/:blockHeights", function(req, res, next) {
	var blockHeightStrs = req.params.blockHeights.split(",");
	
	var blockHeights = [];
	for (var i = 0; i < blockHeightStrs.length; i++) {
		blockHeights.push(parseInt(blockHeightStrs[i]));
	}

	coreApi.getBlocksStatsByHeight(blockHeights).then(function(result) {
		res.json(result);
	});
});

router.get("/mempool-txs/:txids", function(req, res, next) {
	var txids = req.params.txids.split(",");

	var promises = [];

	for (var i = 0; i < txids.length; i++) {
		promises.push(coreApi.getMempoolTxDetails(txids[i], false));
	}

	Promise.all(promises).then(function(results) {
		res.json(results);

	}).catch(function(err) {
		res.json({success:false, error:err});
	});
});

router.get("/raw-tx-with-inputs/:txid", function(req, res, next) {
	var txid = req.params.txid;

	var promises = [];

	promises.push(coreApi.getRawTransactionsWithInputs([txid]));

	Promise.all(promises).then(function(results) {
		res.json(results);
	}).catch(function(err) {
		res.json({success:false, error:err});
	});
});

router.get("/block-tx-summaries/:blockHeight/:txids", function(req, res, next) {
	var blockHeight = parseInt(req.params.blockHeight);
	var txids = req.params.txids.split(",");

	var promises = [];

	var results = [];

	promises.push(new Promise(function(resolve, reject) {
		coreApi.buildBlockAnalysisData(blockHeight, txids, 0, results, resolve);
	}));

	Promise.all(promises).then(function() {
		res.json(results);
	}).catch(function(err) {
		res.json({success:false, error:err});
	});
});

router.get("/utils/:func/:params", function(req, res, next) {
	var func = req.params.func;
	var params = req.params.params;

	var data = null;

	if (func == "formatLargeNumber") {
		if (params.indexOf(",") > -1) {
			var parts = params.split(",");

			data = utils.formatLargeNumber(parseInt(parts[0]), parseInt(parts[1]));

		} else {
			data = utils.formatLargeNumber(parseInt(params));
		}
	} else if (func == "formatCurrencyAmountInSmallestUnits") {
		var parts = params.split(",");

		data = utils.formatCurrencyAmountInSmallestUnits(new Decimal(parts[0]), parseInt(parts[1]));

	} else {
		data = {success:false, error:`Unknown function: ${func}`};
	}

	res.json(data);
});



module.exports = router;
