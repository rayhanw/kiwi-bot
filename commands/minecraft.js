module.exports = {
  name: "minecraft",
  description: "Shows the minecraft server",
  execute(message) {
    message.channel.send("IP: `51.79.152.235:25577`");
    message.channel.send("If you want to play vanilla Minecraft, ask admin for an invite!");
  }
};
