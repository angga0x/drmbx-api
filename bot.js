require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply('Welcome! Use the /getkey command to generate a new API key, or /viewkey to see your current key.');
});

bot.command('getkey', async (ctx) => {
    const username = ctx.from.username;
    if (!username) {
        return ctx.reply('Please set a username in your Telegram settings to generate an API key.');
    }

    try {
        const response = await axios.get(`http://localhost:3000/v1/keys/${username}`);
        const { apiKey } = response.data;
        ctx.reply(`Your API Key is: \`${apiKey}\`\n\nUse /regeneratekey to get a new one, or /viewkey to see your key details.`, { parse_mode: 'Markdown' });
    } catch (error) {
        console.error('Error getting API key:', error.message);
        ctx.reply('Failed to get API key. Please try again.');
    }
});

bot.command('regeneratekey', async (ctx) => {
    const username = ctx.from.username;
    if (!username) {
        return ctx.reply('Please set a username in your Telegram settings to regenerate an API key.');
    }

    try {
        const response = await axios.post(`http://localhost:3000/v1/keys/${username}/regenerate`);
        const { apiKey } = response.data;
        ctx.reply(`Your new API Key is: \`${apiKey}\`\n\nPlease store it securely.`, { parse_mode: 'Markdown' });
    } catch (error) {
        console.error('Error regenerating API key:', error.message);
        ctx.reply('Failed to regenerate API key. Please try again.');
    }
});

bot.command('viewkey', async (ctx) => {
    const username = ctx.from.username;
    if (!username) {
        return ctx.reply('Please set a username in your Telegram settings to view your API key.');
    }

    try {
        const response = await axios.get(`http://localhost:3000/v1/keys/${username}/view`);
        const { data } = response.data;
        const message = `
*API Key Details*
-----------------
*API Key:* \`${data.api_key}\`
*Created At:* ${data.created_at}
*Updated At:* ${data.updated_at}
*Last Used At:* ${data.last_used_at || 'Not used yet'}
        `;
        ctx.replyWithMarkdown(message);
    } catch (error) {
        console.error('Error viewing API key:', error.message);
        if (error.response && error.response.status === 404) {
            ctx.reply('You do not have an API key yet. Use /getkey to generate one.');
        } else {
            ctx.reply('Failed to view API key. Please try again.');
        }
    }
});

bot.launch();

console.log('Telegram bot is running...');
