module.exports = {
  name: "commands",
  description: "Lists commands",
  execute(message, commandList) {
    const commands = commandList.map(
      command => `${command.name} - ${command.description}`
    );
    message.channel.send("```\n" + commands.join("\n") + "```");
  }
};
