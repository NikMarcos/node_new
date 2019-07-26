function bot () {

  const TelegramBot = require('node-telegram-bot-api');

  // replace the value below with the Telegram token you receive from @BotFather
  const token = '775528132:AAHAdebCe4gCqCYCq3wgIQ22pYNZURN5ftA';
  let chat = '-329079688';
  // Create a bot that uses 'polling' to fetch new updates
  const bot = new TelegramBot(token, {polling: true});
  /* GET users listing. */

  bot.sendMessage(chat, 'msg');
  bot.sendPhoto(chat, '/Users/nikita/Desktop/photo_2018-11-24_17-24-37.jpg');


  // bot.sendPhoto(chatId, '/Users/nikita/Desktop/photo_2018-11-24_17-24-37.jpg')
  bot.on('message', (msg) => {
    let chatId = msg.chat.id;
    console.log(msg);
    bot.sendMessage(chatId, 'Received your message');
  });

  bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
  });
}

module.exports = bot;
