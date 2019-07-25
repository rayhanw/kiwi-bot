module.exports = {
  name: 'about-me',
  description: 'Show your username along with user id',
  execute(message) {
    message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
  },
};
