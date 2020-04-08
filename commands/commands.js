module.exports = {
  name: "commands",
  description: "Lists commands",
  execute(message, commandList) {
    commandList.forEach((value, command) => {
      message.channel.send(`\`\`\`!${command} ➡️ ${value.description}\`\`\``);
    });
  }
};
