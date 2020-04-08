module.exports = {
  name: "is_nsfw?",
  description: "Returns a message saying whether the channel is NSFW",
  execute(message) {
    message.channel.send(
      "Nope. Unless you are in **not-safe-for-jedis** channel"
    );
  }
};
