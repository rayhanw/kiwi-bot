module.exports = {
  name: "minecraft",
  description: "Shows the minecraft server",
  execute(message) {
    message.channel.send("IP: `54.254.194.32:25565`");
    message.channel.send("If you want vanilla, ask admin for an invite!");
  }
};
