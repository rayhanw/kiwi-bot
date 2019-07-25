/* eslint-disable global-require */
/* eslint-disable no-console */

// Dynamically reading command files
const fs = require('fs');
// Init discord.js
const Discord = require('discord.js');
// Bot configurations
const config = require('./config.json');
// Dotenv file link
require('dotenv').config();
// Instance of Discord client
const client = new Discord.Client();
// List of commands (start with empty)
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const { prefix } = config;

const showEmbed = (message) => {
  const exampleEmbed = new Discord.RichEmbed()
    .setColor('#fff')
    .setTitle('Kiwi bot')
    .setURL('https://discordapp.com/oauth2/authorize?client_id=603952919536074777&scope=bot')
    .setAuthor('Rayhan A', 'https://rayhanw.com/images/profile.jpg', 'https://rayhanw.com')
    .setDescription('A simple \'ole bot that does fuck all')
    .setThumbnail('https://i.imgur.com/BX1HZTr.jpg')
    .addField('hmm', 'I can do fuck all')
    .addBlankField()
    .setImage('https://i.imgur.com/BX1HZTr.jpg')
    .setTimestamp()
    .setFooter('I do fuckall', 'https://i.imgur.com/BX1HZTr.jpg');

  message.channel.send(exampleEmbed);
};

const showCommands = (message, commandsList) => {
  message.channel.send('```!bot-info ➡️ Shows the bot information```');
  message.channel.send('```!commands ➡️ Lists commands```');
  commandsList.forEach((value, command) => {
    message.channel.send(`\`\`\`!${command} ➡️ ${value.description}\`\`\``);
  });
};

// Import modules (functions) from commands folder
commandFiles.forEach((commandFile) => {
  // eslint-disable-next-line import/no-dynamic-require
  const command = require(`./commands/${commandFile}`);
  client.commands.set(command.name, command);
});

client.once('ready', () => {
  console.log('Beep Boop. I am ready!');
  client.user.setPresence({ game: { name: '!commands', type: 'LISTENING' } });
});

client.on('message', (message) => {
  // If message does not start with prefix '!', don't do anything (return early)
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // Seperate prefix with command
  const args = message.content.slice(prefix.length).split(/ +/);
  // Get the command (after prefix)
  const commandName = args.shift().toLowerCase();

  if (commandName === 'bot-info') {
    // Show card info
    showEmbed(message);
  } else if (commandName === 'commands') {
    // Show available commands
    showCommands(message, client.commands);
  }

  // Find what the command is depending on user input (works with aliases)
  // eslint-disable-next-line max-len
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  // If command does not exist, don't do anything (return early)
  if (!command) return;

  // If command is a guild based command, print the return message
  if (command.guildOnly && message.channel.type !== 'text') {
    // eslint-disable-next-line consistent-return
    return message.reply('I can\'t execute that command inside DMs!');
  }

  // If command not found in command list, don't do anything (return early)
  if (!client.commands.has(commandName)) return;

  if (command.args && !args.length) {
    // eslint-disable-next-line consistent-return
    return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
  }

  // If user didn't provide any argument, print reply along with the proper usage
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    // Send the message of reply (var)
    // eslint-disable-next-line consistent-return
    return message.channel.send(reply);
  }

  try {
    // Second try at running command
    command.execute(message, args);
  } catch (error) {
    // If error, print error message
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});

// Supplying Discord bot token
client.login(process.env.DISCORD_CLIENT);
