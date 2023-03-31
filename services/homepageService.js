const request = require("request");
const chatBotService = require("../services/chatBotService");

require("dotenv").config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let setUpMessengerPlatform = (PAGE_ACCESS_TOKEN) => {
    return new Promise((resolve, reject) => {
        try {
            let data = {
                "get_started": {
                    "payload": "GET_STARTED"
                },
                "persistent_menu": [
                    {
                        "locale": "default",
                        "composer_input_disabled": false,
                        "call_to_actions": [
                            {
                                "type": "postback",
                                "title": "Kết nối Sumi",
                                "payload": "VIEW_MEOW",
                            },
                            {
                                "type": "postback",
                                "title": "Ngắt kết nối Sumi",
                                "payload": "VIEW_MEOW",
                            },
                            {
                                "type": "postback",
                                "title": "Xem ảnh mèo",
                                "payload": "VIEW_MEOW",
                            },
                            {
                                "type": "postback",
                                "title": "Xem ảnh cún",
                                "payload": "VIEW_MEOW",
                            },
                            {
                                "type": "postback",
                                "title": "Nghe nhạc",
                                "payload": "VIEW_MEOW",
                            },
                            {
                                "type": "postback",
                                "title": "Thông tin của bạn",
                                "payload": "VIEW_MEOW",
                            }
                        ]
                    }
                ],

                "whitelisted_domains": [process.env.SERVER_URL]
            };

            request({
                "uri": "https://graph.facebook.com/v6.0/me/messenger_profile",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": data
            }, (err, res, body) => {
                if (!err) {
                    resolve("setup done!");
                } else {
                    reject(err);
                }
            });

        } catch (e) {
            reject(e);
        }
    });
};

let sendGuideToUseBot = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response1 = {
                "text" : "Hi there! I'm a chatbot building with Node.js platform.\nSo, What can I do? 😎" +
                    "\n\nFirst, I can show you the restaurant's menu: lunch, dinner and pub menu, etc. " +
                    "\n\nThen, you can make a reservation. No worry, it isn't a 'real' restaurant. Feel free to test me. 😊"
            };
            let response2 = {
                text: "Second, I can understand the sentences with meaning 'greetings', 'thanks' and 'bye'." +
                    "\n\nE.g: If you say 'What's up 🇺🇸' or 'hola 🇪🇸' or 'hallo 🇩🇪', I know that it's a 'greetings' sentence. The same thing with 'thanks' and 'bye' sentences." +
                    "\n\nTry to say: hello, bye, thanks a lot, Bonjour 🇫🇷, etc. you will understand what I mean. 😗"
            };
            let response3 = {
                text:  "Finally, remember I'm just a bot. So, That 's what can do for you today. 🤠" +
                    "\n\nBuild this bot from scratch with Node.js:👇" +
                    "\nYoutube: \n👉 https://bit.ly/tutorialBuildAwesomeBot"
            };
            let response5 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Back to main menu or make a reservation ?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "SHOW MAIN MENU",
                                "payload": "MAIN_MENU"
                            },
                            {
                                "type": "postback",
                                "title": "RESERVE A TABLE",
                                "payload": "RESERVE_TABLE",
                            }
                        ]
                    }
                }
            };

            await chatBotService.sendTypingOn(sender_psid);
            await chatBotService.sendMessage(sender_psid, response1);
            await chatBotService.sendTypingOn(sender_psid);
            await chatBotService.sendMessage(sender_psid, response2);
            await chatBotService.sendTypingOn(sender_psid);
            await chatBotService.sendMessage(sender_psid, response3);
            await chatBotService.sendTypingOn(sender_psid);
            await chatBotService.sendMessage(sender_psid, response5);

            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    setUpMessengerPlatform: setUpMessengerPlatform,
    sendResponseGreetings: sendResponseGreetings,
    sendResponseThanks: sendResponseThanks,
    sendResponseBye: sendResponseBye,
    sendGuideToUseBot: sendGuideToUseBot
};