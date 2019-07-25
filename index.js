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

// Import modules (functions) from commands folder
commandFiles.forEach((commandFile) => {
  const command = require(`./commands/${commandFile}`);
  client.commands.set(command.name, command);
});

// Function to get a random number between 0 up to `max`
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const sendMessage = (args, command, message) => {
  if (command === 'ping') {
    client.commands.get('ping').execute(message, args);
  } else if (command === 'beep') {
    client.commands.get('beep').execute(message, args);
  } else if (command === 'server') {
    message.channel.send(`Server: ${message.guild.name}`);
  } else if (command === 'members') {
    message.channel.send(`There are ${message.guild.memberCount} people in ${message.guild.name}`);
  } else if (command === 'about-me') {
    message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
  } else if (command.match(/\d+/)) {
    const num = command.match(/\d+/)[0];
    message.channel.send(`Your random number is: ${getRandomInt(parseInt(num, 10))}`);
  }
};

client.once('ready', () => {
  console.log('Beep Boop. I am ready!');
});

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  sendMessage(args, commandName, message);
});

// Supplying Discord bot token
client.login(process.env.DISCORD_CLIENT);
