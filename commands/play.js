module.exports = {
  name: "play",
  description: "Plays a song from Youtube",
  args: true,
  async execute(message, args) {
    console.log({ channel: message.channel, args });
  }
};
