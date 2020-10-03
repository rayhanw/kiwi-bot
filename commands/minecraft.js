module.exports = {
  name: "minecraft",
  description: "Shows the minecraft server",
  execute(message) {
    message.channel.send("IP: `XXX`"); // IP is no longer valid
    message.channel.send("If you want to play vanilla Minecraft, ask admin for an invite!");
  }
};
