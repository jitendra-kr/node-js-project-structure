const path 		 = require('path');

module.exports = (server, ENV) => {
	require(path.resolve('./config/lib/guard/jwt.guard'))(server, ENV);
	require(path.resolve('./config/lib/guard/xss.guard'))(server, ENV);
}