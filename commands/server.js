module.exports = {
  name: 'server',
  description: 'Display info about the server',
  execute(message) {
    message.channel.send(`Server: ${message.guild.name}`);
  },
};
