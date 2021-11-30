const sodOff = message => {
  const { content } = message;

  if (/<@!\d+>/.test(content)) {
    const userId = content.match(/<@!\d+>/);
    if (userId && userId[0]) {
      message.channel.send(`Yea, fuck you ${userId}`);
    }
  } else {
    message.channel.send("Yea, fuck you");
  }
};

module.exports = sodOff;
