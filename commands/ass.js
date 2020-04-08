module.exports = {
  name: "ass",
  description: "ass compliment",
  execute(message) {
    if (!message.mentions.users.size) {
      return message.channel.send(`Nice ass: @${message.author.username}`);
    }

    const assCompliment = message.mentions.users.map(
      (user) => `Nice ass <@${user.id}>`
    );

    message.channel.send(assCompliment);
  },
};
