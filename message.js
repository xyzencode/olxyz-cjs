/**  
 *  Created By: Muhammad Adriansyah
 *  Description: This is the main file for handling message event
 *  Created At: 12/05/2024
 *  Last Modified: 12/05/2024
 * 
*/

const { appenTextMessage } = require("./lib/serialize");
const chalk = require("chalk");

async function message(client, store, m, chatUpdate) {
    try {
        (m.type === 'conversation') ? m.message.conversation : (m.type == 'imageMessage') ? m.message.imageMessage.caption : (m.type == 'videoMessage') ? m.message.videoMessage.caption : (m.type == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.type == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.type == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.type == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.type == 'interactiveResponseMessage') ? appenTextMessage(JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id, chatUpdate, m, client) : (m.type == 'templateButtonReplyMessage') ? appenTextMessage(m.msg.selectedId, chatUpdate, m, client) : (m.type === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        let quoted = m.isQuoted ? m.quoted : m
        let Downloaded = async (fileName) => await client.downloadMediaMessage(quoted, fileName)
        let isCommand = (m.prefix && m.body.startsWith(m.prefix)) || false

        if (m.isBot) return;

        if (!m.public) {
            if (!m.key.fromMe || m.isCreator) return;
        }
        if (m.message && !m.isBot) {
            const messageTypeEmoji = m.isGroup ? "👥 Group" : "👤 Private";
            const messageContent = m.body || m.type;
            console.log(
                `${chalk.blue("FROM")}: ${chalk.yellow(m.pushName + " => " + m.sender)}\n` +
                `${chalk.blue("IN")}: ${chalk.magenta(messageTypeEmoji)}\n` +
                `${chalk.blue("MESSAGE")}: ${chalk.green(messageContent)}\n` +
                `🕒 ${new Date().toLocaleTimeString()}`
            );
        }

        switch (isCommand ? m.command.toLowerCase() : false) {
            case "test": {
                m.reply("Test Success")
            }
                break
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = message;