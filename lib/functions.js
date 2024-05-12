const axios = require("axios");

function escapeRegExp(string) {
    return string.replace(/[.*=+:\-?^${}()|[\]\\]|\s/g, '\\$&')
}

module.exports = {
    escapeRegExp
}