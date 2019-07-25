module.exports = {
  name: 'members',
  description: 'Show the amount of members in the channel',
  execute(message) {
    message.channel.send(`There are ${message.guild.memberCount} people in ${message.guild.name}`);
  },
};
