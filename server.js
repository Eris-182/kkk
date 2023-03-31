require('dotenv').config();

const express = require('express');
const initWebhook = require('./routers/web');
const path = require('path')
let app = express();

console.log(path.join(__dirname))
app.use(express.static(path.join(__filename, '..', '..', '..','public')));
app.set("view engine", "ejs");
app.set("views", path.join(__filename, '..', '..', '..', 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initWebhook(app);

let port = process.env.PORT || 30;

app.listen(port, () => {
    console.log(`App is running at the port ${port}`);
})