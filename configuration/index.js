const path = require("path");

module.exports = {
    getConfig: () => {
        return require(path.resolve(`./configuration/config.${process.env.NODE_ENV}.json`));
    }
}