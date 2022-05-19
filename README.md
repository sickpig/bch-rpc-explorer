# NEXA RPC Explorer

[![npm version][npm-ver-img]][npm-ver-url] [![NPM downloads][npm-dl-img]][npm-dl-url]


Simple, database-free Bitcoin Cash blockchain explorer, via RPC. Built with Node.js, express, bootstrap-v4.

This tool is intended to be a simple, self-hosted explorer for the Bitcoin blockchain, driven by RPC calls to your own bitcoind node. This tool is easy to run but currently lacks features compared to database-backed explorers.

Whatever reasons one might have for running a full node (trustlessness, technical curiosity, supporting the network, etc) it's helpful to appreciate the "fullness" of your node. With this explorer, you can not only explore the blockchain (in the traditional sense of the term "explorer"), but also explore the functional capabilities of your own node.

Live demo available at: [https://explorer.bitcoinunlimited.info](https://explorer.bitcoinunlimited.info)

# Features

* Network Summary "dashboard"
* View details of blocks, transactions, and addresses
* Analysis tools for viewing stats on blocks, transactions, and miner activity
* View JSON content used to generate most pages
* Search by transaction ID, block hash/height, and address
* Optional transaction history for addresses by querying from ElectrumX and blockchair.com
* Txpool summary, with fee, size, and age breakdowns
* RPC command browser and terminal

# Changelog / Release notes

See [CHANGELOG.md](/CHANGELOG.md).

# Getting started

The below instructions are geared toward NEX, but can be adapted easily to other coins.

## Prerequisites

1. Install and run a full, archiving node - [instructions](https://bitcoinunlimited.info/download). Ensure that your bitcoin node has full transaction indexing enabled (`txindex=1`) and the RPC server enabled (`server=1`) adding the flags into the bitcoind executable.
2. Synchronize your node with the Bitcoin network.
3. Run nex-rpc-explorer passing the cookie route based on the defined path to store files download with BCH-Unlimited. (Check cli arguments section)
3. "Recent" version of Node.js (8+ recommended).
4. You could also run an [ElectrsCash](https://github.com/bitcoinunlimited/ElectrsCash) and configure the explorer to received data from it (optional)
5. You need to use nodejs version 12.9 or higher due to the use of [Promise.allSettled()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) method

## Instructions

```bash
npm install -g nex-rpc-explorer
nex-rpc-explorer
```

If you're running on mainnet with the default datadir and port, this Should Just Work.
Open [http://127.0.0.1:3002/](http://127.0.0.1:3002/) to view the explorer.

You may set configuration options in a `.env` file or using CLI args.
See [configuration](#configuration) for details.

### Configuration

Configuration options may be passed as environment variables
or by creating an env file at `~/.config/nex-rpc-explorer.env`
or at `.env` in the working directory.
See [.env-sample](.env-sample) for a list of the options and details for formatting `.env`.

You may also pass options as CLI arguments, for example:

```bash
UNIX
nex-rpc-explorer --port 8080 --bitcoind-port 18443 --bitcoind-cookie ~/.bitcoin/regtest/.cookie

WINDOWS
nex-rpc-explorer --bitcoind-cookie C:\your-bch-unlimited-path\.cookie
```

See `nex-rpc-explorer --help` for the full list of CLI options.

## Run via Docker

1. `docker build -t nex-rpc-explorer .`
2. `docker run -p 3002:3002 -it nex-rpc-explorer`

# Support

* [bitcoincash:pq6snv5fcx2fp6dlzg7s0m9zs8yqh74335tzvvfcmq](bitcoincash:pq6snv5fcx2fp6dlzg7s0m9zs8yqh74335tzvvfcmq)


[npm-ver-img]: https://img.shields.io/npm/v/nex-rpc-explorer.svg?style=flat
[npm-ver-url]: https://www.npmjs.com/package/nex-rpc-explorer
[npm-dl-img]: http://img.shields.io/npm/dm/nex-rpc-explorer.svg?style=flat
[npm-dl-url]: https://npmcharts.com/compare/nex-rpc-explorer?minimal=true

