module.exports = {
    name: "hello",
    description: "Discord server says hello",
    execute(message) {
      if (!message.mentions.users.size) {
        return message.channel.send(`Hello whatsup: @${message.author.username}`);
      }
      
      const assCompliment = message.mentions.users.map(
        user => `Hello <@${user.id}>`
      );
  
      message.channel.send(assCompliment);
    }
  };
  