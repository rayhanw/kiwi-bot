// Dynamically reading command files
const fs = require("fs");
// Init discord.js
const Discord = require("discord.js");
// Bot configurations
const config = require("./config.json");
const reactionRoleListener = require("./utils/reactionRoleListener");
// Dotenv file link
require("dotenv").config();
// Instance of Discord client
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
// List of commands (start with empty)
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

// Prefix
const { prefix } = config;

// Cooldowns
const cooldowns = new Discord.Collection();

let commandsList = [];

// Import modules (functions) from commands folder
commandFiles.forEach(commandFile => {
  // eslint-disable-next-line import/no-dynamic-require
  const command = require(`./commands/${commandFile}`);
  commandsList.push(command.name);
  client.commands.set(command.name, command);
});

client.on("ready", () => {
  console.log("Beep Boop. I am ready!");
  client.user.setPresence({ game: { name: "??commands", type: "LISTENING" } });
});

client.on("messageCreate", message => {
  // If message does not start with prefix, don't do anything (return early)
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const messageWithArgs = message.content.split(" ");

  if (messageWithArgs.length >= 2) {
    const commandName = messageWithArgs[0].replace("??", "");

    if (!commandsList.includes(commandName)) {
      return;
    }
  } else {
    if (!commandsList.includes(message.content.replace("??", ""))) {
      return;
    }
  }

  // Seperate prefix with command
  const args = message.content.slice(prefix.length).split(/ +/);
  // Get the command (after prefix)
  const commandName = args.shift().toLowerCase();

  // Find what the command is depending on user input (works with aliases)
  // eslint-disable-next-line max-len
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (command.name === "commands") {
    console.log(`Running ??${commandName}`);
    command.execute(message, client.commands);
  }

  // If command does not exist, don't do anything (return early)
  if (!command) return;

  // If command is a guild based command, print the return message
  if (command.guildOnly && message.channel.type !== "text") {
    // eslint-disable-next-line consistent-return
    return message.reply("I can't execute that command inside DMs!");
  }

  // If command not found in command list, don't do anything (return early)
  if (!client.commands.has(commandName)) return;

  if (command.args && !args.length) {
    // eslint-disable-next-line consistent-return
    return message.channel.send(
      `You didn't provide any arguments, ${message.author}!`
    );
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

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now(); // Here creates right now
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      // eslint-disable-next-line consistent-return
      return message.reply(
        `Please wait ${timeLeft.toFixed(
          1
        )} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    // Second try at running command
    console.log(`Running ??${commandName}`);
    command.execute(message, args);
  } catch (error) {
    // If error, print error message
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

client.on("messageReactionAdd", async (reaction, user) =>
  reactionRoleListener(reaction, user, "ADD")
);

client.on("messageReactionRemove", async (reaction, user) => {
  reactionRoleListener(reaction, user, "REMOVE");
});

// Supplying Discord bot token
client.login(process.env.DISCORD_CLIENT);
