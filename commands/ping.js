module.exports = {
  name: "ping",
  description: "Pong!",
  execute(message) {
    message.channel.send("Pong.");
  }
};
