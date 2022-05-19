var debug = require('debug');

var debugLog = debug("nexexp:rpc");

var async = require("async");
var semver = require("semver");

var utils = require("../utils.js");
var config = require("../config.js");
var coins = require("../coins.js");

var activeQueueTasks = 0;

var rpcQueue = async.queue(function(task, callback) {
	activeQueueTasks++;

	task.rpcCall(function() {
		callback();

		activeQueueTasks--;
	});

}, config.rpcConcurrency);

global.rpcStats = {};



function getBlockchainInfo() {
	return getRpcData("getblockchaininfo");
}

function getNetworkInfo() {
	return getRpcData("getnetworkinfo");
}

function getNetTotals() {
	return getRpcData("getnettotals");
}

function getTxpoolInfo() {
	return getRpcData("gettxpoolinfo");
}

function getMiningInfo() {
	return getRpcData("getmininginfo");
}

function getUptimeSeconds() {
	return getRpcData("uptime");
}

function getPeerInfo() {
	return getRpcData("getpeerinfo");
}

function getTxpoolTxids() {
	return getRpcDataWithParams({method:"getrawtxpool", parameters:[false]});
}

function getNetworkHashrate(blockCount=144) {
	return getRpcDataWithParams({method:"getnetworkhashps", parameters:[blockCount]});
}

function getBlockStats(hash_or_height) {
	if ((hash_or_height == coinConfig.genesisBlockHashesByNetwork[global.activeBlockchain] || hash_or_height == 0) && coinConfig.genesisBlockStatsByNetwork[global.activeBlockchain]) {
		return new Promise(function(resolve, reject) {
			resolve(coinConfig.genesisBlockStatsByNetwork[global.activeBlockchain]);
		});
	} else {
		return getRpcDataWithParams({method:"getblockstats", parameters:[hash_or_height]});
	}
}

function decodeScript(hex) {
	return getRpcDataWithParams({method:"decodescript", parameters:[hex]});
}

function decodeRawTransaction(hex) {
	return getRpcDataWithParams({method:"decoderawtransaction", parameters:[hex]});
}


function getUtxoSetSummary() {
	return getRpcData("gettxoutsetinfo");
}

function getRawTxpool() {
	return new Promise(function(resolve, reject) {
		getRpcDataWithParams({method:"getrawtxpool", parameters:[false]}).then(function(txids) {
			var promises = [];

			for (var i = 0; i < txids.length; i++) {
				var txid = txids[i];

				promises.push(getRawTxpoolEntry(txid));
			}

			Promise.all(promises).then(function(results) {
				var finalResult = {};

				for (var i = 0; i < results.length; i++) {
					if (results[i] != null) {
						finalResult[results[i].txid] = results[i];
					}
				}

				resolve(finalResult);

			}).catch(function(err) {
				reject(err);
			});

		}).catch(function(err) {
			reject(err);
		});
	});
}

function getRawTxpoolEntry(txid) {
	return new Promise(function(resolve, reject) {
		getRpcDataWithParams({method:"gettxpoolentry", parameters:[txid]}).then(function(result) {
			result.txid = txid;

			resolve(result);

		}).catch(function(err) {
			resolve(null);
		});
	});
}

function getChainTxStats(blockCount) {
	return getRpcDataWithParams({method:"getchaintxstats", parameters:[blockCount]});
}

function getBlockHash(blockHeight) {
	return getRpcDataWithParams({method:"getblockhash", parameters:[blockHeight]});
}

function getBlock(hash_or_height) {
	return getRpcDataWithParams({method:"getblock", parameters:[hash_or_height]});
}

function getBlockHeader(hash_or_height) {
	return getRpcDataWithParams({method:"getblockheader", parameters:[hash_or_height]});
}

function getAddress(address) {
	return getRpcDataWithParams({method:"validateaddress", parameters:[address]});
}

function getBlockTemplate(args = {}) {
	return getRpcDataWithParams({method:"getblocktemplate", parameters:[args]});
}

function getRawTransaction(txid) {
	return new Promise(function(resolve, reject) {
		if (coins[config.coin].genesisCoinbaseTransactionIdsByNetwork[global.activeBlockchain] && txid == coins[config.coin].genesisCoinbaseTransactionIdsByNetwork[global.activeBlockchain]) {
			// copy the "confirmations" field from genesis block to the genesis-coinbase tx
			getBlockchainInfo().then(function(blockchainInfoResult) {
				var result = coins[config.coin].genesisCoinbaseTransactionsByNetwork[global.activeBlockchain];
				result.confirmations = blockchainInfoResult.blocks;

				// hack: default regtest node returns "0" for number of blocks, despite including a genesis block;
				// to display this block without errors, tag it with 1 confirmation
				if (global.activeBlockchain == "regtest" && result.confirmations == 0) {
					result.confirmations = 1;
				}

				resolve(result);

			}).catch(function(err) {
				reject(err);
			});

		} else {
			getRpcDataWithParams({method:"getrawtransaction", parameters:[txid, 1]}).then(function(result) {
				if (result == null || result.code && result.code < 0) {
					reject(result);

					return;
				}

				// ABC & BCHN do not set the confirmations property on unconfirmed TXs
				if (result.confirmations === undefined)
					result.confirmations = 0;

				resolve(result);

			}).catch(function(err) {
				debugLog(err);
				reject(err);
			});
		}
	});
}

function getUtxo(txid, outputIndex) {
	debugLog("getUtxo: %s (%d)", txid, outputIndex);

	return new Promise(function(resolve, reject) {
		getRpcDataWithParams({method:"gettxout", parameters:[txid, outputIndex]}).then(function(result) {
			if (result == null) {
				resolve("0");

				return;
			}

			if (result.code && result.code < 0) {
				reject(result);

				return;
			}

			resolve(result);

		}).catch(function(err) {
			reject(err);
		});
	});
}

function getTxpoolTxDetails(txid, includeAncDec=true) {
	debugLog("getTxpoolTxDetails: %s", txid);

	var promises = [];

	var txpoolDetails = {};

	promises.push(new Promise(function(resolve, reject) {
		getRpcDataWithParams({method:"getxpoolentry", parameters:[txid]}).then(function(result) {
			txpoolDetails.entry = result;

			resolve();

		}).catch(function(err) {
		debugLog(err);
			reject(err);
		});
	}));

	if (includeAncDec) {
		promises.push(new Promise(function(resolve, reject) {
			getRpcDataWithParams({method:"gettxpoolancestors", parameters:[txid]}).then(function(result) {
				txpoolDetails.ancestors = result;

				resolve();

			}).catch(function(err) {
				reject(err);
			});
		}));

		promises.push(new Promise(function(resolve, reject) {
			getRpcDataWithParams({method:"gettxpooldescendants", parameters:[txid]}).then(function(result) {
				txpoolDetails.descendants = result;

				resolve();

			}).catch(function(err) {
				reject(err);
			});
		}));
	}

	return new Promise(function(resolve, reject) {
		Promise.all(promises).then(function() {
			resolve(txpoolDetails);

		}).catch(function(err) {
			reject(err);
		});
	});
}

function getHelp() {
	return getRpcData("help");
}

function getRpcMethodHelp(methodName) {
	return getRpcDataWithParams({method:"help", parameters:[methodName]});
}



function getRpcData(cmd) {
	var startTime = new Date().getTime();

	return new Promise(function(resolve, reject) {
		debugLog(`RPC: ${cmd}`);

		rpcCall = function(callback) {
			var client = (cmd == "gettxoutsetinfo" ? global.rpcClientNoTimeout : global.rpcClient);

			client.command(cmd, function(err, result, resHeaders) {
				try {
					if (err) {
						logStats(cmd, false, new Date().getTime() - startTime, false);

						throw new Error(`RpcError: type=failure-01`);
					}

					if (Array.isArray(result) && result.length == 1) {
						var result0 = result[0];

						if (result0 && result0.name && result0.name == "RpcError") {
							logStats(cmd, false, new Date().getTime() - startTime, false);

							throw new Error(`RpcError: type=errorResponse-01`);
						}
					}

					if (result.name && result.name == "RpcError") {
						logStats(cmd, false, new Date().getTime() - startTime, false);

						throw new Error(`RpcError: type=errorResponse-02`);
					}

					resolve(result);

					logStats(cmd, false, new Date().getTime() - startTime, true);

					callback();

				} catch (e) {
					e.userData = {error:err, request:cmd, result:result};

					utils.logError("9u4278t5h7rfhgf", e, {error:err, request:cmd, result:result});

					reject(e);

					callback();
				}
			});
		};

		rpcQueue.push({rpcCall:rpcCall});
	});
}

function getRpcDataWithParams(request) {
	var startTime = new Date().getTime();

	return new Promise(function(resolve, reject) {
		debugLog(`RPC: ${JSON.stringify(request)}`);

		rpcCall = function(callback) {
			global.rpcClient.command([request], function(err, result, resHeaders) {
				try {
					if (err != null) {
						logStats(request.method, true, new Date().getTime() - startTime, false);

						throw new Error(`RpcError: type=failure-02`);
					}

					if (Array.isArray(result) && result.length == 1) {
						var result0 = result[0];

						if (result0 && result0.name && result0.name == "RpcError") {
							logStats(request.method, true, new Date().getTime() - startTime, false);

							throw new Error(`RpcError: type=errorResponse-03`);
						}
					}

					if (result.name && result.name == "RpcError") {
						logStats(request.method, true, new Date().getTime() - startTime, false);

						throw new Error(`RpcError: type=errorResponse-04`);
					}

					resolve(result[0]);

					logStats(request.method, true, new Date().getTime() - startTime, true);

					callback();

				} catch (e) {
					e.userData = {error:err, request:request, result:result};

					utils.logError("283h7ewsede", e, {error:err, request:request, result:result});

					reject(e);

					callback();
				}
			});
		};

		rpcQueue.push({rpcCall:rpcCall});
	});
}

function unsupportedPromise(minRpcVersionNeeded) {
	return new Promise(function(resolve, reject) {
		resolve({success:false, error:"Unsupported", minRpcVersionNeeded:minRpcVersionNeeded});
	});
}

function logStats(cmd, hasParams, dt, success) {
	if (!global.rpcStats[cmd]) {
		global.rpcStats[cmd] = {count:0, withParams:0, time:0, successes:0, failures:0};
	}

	global.rpcStats[cmd].count++;
	global.rpcStats[cmd].time += dt;

	if (hasParams) {
		global.rpcStats[cmd].withParams++;
	}

	if (success) {
		global.rpcStats[cmd].successes++;

	} else {
		global.rpcStats[cmd].failures++;
	}
}


module.exports = {
	getBlockchainInfo: getBlockchainInfo,
	getNetworkInfo: getNetworkInfo,
	getNetTotals: getNetTotals,
	getTxpoolInfo: getTxpoolInfo,
	getTxpoolTxids: getTxpoolTxids,
	getMiningInfo: getMiningInfo,
	getBlockHash: getBlockHash,
	getBlock: getBlock,
	getBlockTemplate: getBlockTemplate,
	getRawTransaction: getRawTransaction,
	getUtxo: getUtxo,
	getTxpoolTxDetails: getTxpoolTxDetails,
	getRawTxpool: getRawTxpool,
	getUptimeSeconds: getUptimeSeconds,
	getHelp: getHelp,
	getRpcMethodHelp: getRpcMethodHelp,
	getAddress: getAddress,
	getPeerInfo: getPeerInfo,
	getChainTxStats: getChainTxStats,
	getUtxoSetSummary: getUtxoSetSummary,
	getNetworkHashrate: getNetworkHashrate,
	getBlockStats: getBlockStats,
	getBlockHeader: getBlockHeader,
	decodeScript: decodeScript,
	decodeRawTransaction: decodeRawTransaction
};
