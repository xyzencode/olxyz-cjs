/**  
 *  Created By: Muhammad Adriansyah
 *  Description: This is the main file for handling message event
 *  Created At: 12/05/2024
 *  Last Modified: 12/05/2024
 * 
*/

const axios = require("axios");

function escapeRegExp(string) {
    return string.replace(/[.*=+:\-?^${}()|[\]\\]|\s/g, '\\$&')
}

module.exports = {
    escapeRegExp
}