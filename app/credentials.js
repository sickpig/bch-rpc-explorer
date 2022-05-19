var os = require('os');
var path = require('path');
var url = require('url');

var btcUri = process.env.NEXEXP_NEXAD_URI ? url.parse(process.env.NEXEXP_NEXAD_URI, true) : { query: { } };
var btcAuth = btcUri.auth ? btcUri.auth.split(':') : [];

module.exports = {
	rpc: {
		host: btcUri.hostname || process.env.NEXEXP_NEXAD_HOST || "127.0.0.1",
		port: btcUri.port || process.env.NEXEXP_NEXAD_PORT || 7239,
		username: btcAuth[0] || process.env.NEXEXP_NEXAD_USER,
		password: btcAuth[1] || process.env.NEXEXP_NEXAD_PASS,
		cookie: btcUri.query.cookie || process.env.NEXEXP_NEXAD_COOKIE || path.join(os.homedir(), '.nexa', '.cookie'),
		timeout: parseInt(btcUri.query.timeout || process.env.NEXEXP_NEXAD_RPC_TIMEOUT || 5000),
	},

	// optional: enter your api access key from ipstack.com below
	// to include a map of the estimated locations of your node's
	// peers
	// format: "ID_FROM_IPSTACK"
	ipStackComApiAccessKey: process.env.NEXEXP_IPSTACK_APIKEY,

	// optional: GA tracking code
	// format: "UA-..."
	googleAnalyticsTrackingId: process.env.NEXEXP_GANALYTICS_TRACKING,

	// optional: sentry.io error-tracking url
	// format: "SENTRY_IO_URL"
	sentryUrl: process.env.NEXEXP_SENTRY_URL,
};
