const path = require('path');

module.exports = (server) => {
	require(path.resolve('./config/lib/express/express'))(server);
	require(path.resolve('./config/lib/routes/routes'))(server);
}
