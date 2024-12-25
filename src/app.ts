'use strict';

require('dotenv').config()
import * as BootBot from '@stefancfuchs/bootbot'

console.log(`
    accessToken: ${process.env.ACCESS_TOKEN},
    verifyToken: ${process.env.VERIFY_TOKEN},
    appSecret: ${process.env.APP_SECRET}, 
`)

const bot = new BootBot({
    accessToken: process.env.ACCESS_TOKEN,
    verifyToken: process.env.VERIFY_TOKEN,
    appSecret: process.env.APP_SECRET,
});

bot.on('message', (payload, chat) => {
    const text = payload.message.text;
    console.log(`The user said: ${text}`);
});

bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {
    chat.say('Hello, human friend!').then(() => {
        chat.say('How are you today?');
    });
});

// bot.start();

const express = require('express')
const app = express()
const port = process.env.PORT || 3002

app.get('/', (req, res) => {
    res.send(`Hello World! ${port}`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})