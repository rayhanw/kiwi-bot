module.exports = {
  name: 'avatar',
  description: 'Get the avatar URL of the tagged user(s), or your own avatar.',
  aliases: ['icon', 'pfp'],
  // eslint-disable-next-line consistent-return
  execute(message) {
    if (!message.mentions.users.size) {
      return message.channel.send(`Your avatar: <${message.author.displayAvatarURL}>`);
    }

    const avatarList = message.mentions.users.map(user => `${user.username}'s avatar: <${user.displayAvatarURL}>`);

    message.channel.send(avatarList);
  },
};
