const express = require("express");
const homepageController = require("../controllers/homepageController");
const chatBotController = require("../controllers/chatbotControllers");
const chatBotService = require("../services/chatBotService");

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homepageController.getHomepage);
    router.get("/webhook", chatBotController.getWebhook);
    router.post("/webhook", chatBotController.postWebhook);
    router.get("/profile", homepageController.getFacebookUserProfile);
    router.post("/set-up-user-fb-profile", homepageController.setUpUserFacebookProfile);
    return app.use("/", router);
};

module.exports = initWebRoutes;