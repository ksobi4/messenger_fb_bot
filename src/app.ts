// import * as BootBot from '@stefancfuchs/bootbot'

// const bot = new BootBot({
//     accessToken: 'EAAgLbXlzKLsBOzI2MkkG94d3bYLC2wsZBTXUbSW2piQKRGS7xIioiN63Hv1Vl9N3s9cz3npOQ7tHXiUWtLIHTIoQhWF9RU7sVVZC4THe1UefmL18uIc6XGgKLGEnDMqsRpsubm9VkztZA6ZAU9odPW0OeKONGTJTyZCJA9oKJj7acR3CL6zkNPPPBxh0Uc4H8eSBTBOTHlMVqNQAI',
//     verifyToken: 'FB_VERIFY_TOKEN',
//     appSecret: '92c41480e59891e28a2a73f5c26401d5',

// });

// // bot.on('message', (payload, chat) => {
// //     const text = payload.message.text;
// //     console.log(`The user said: ${text}`);
// // });

// // bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {
// //     chat.say('Hello, human friend!').then(() => {
// //         chat.say('How are you today?');
// //     });
// // });

// bot.start();

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})