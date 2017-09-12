const path = require('path');

module.exports = (server, ENV) => {
	require(path.resolve('./config/lib/express/express'))(server);
	require(path.resolve('./config/lib/routes/routes'))(server);
	require(path.resolve('./config/lib/database/mongodb_connection'))(server, ENV);
}
