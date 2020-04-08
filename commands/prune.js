module.exports = {
  name: "prune",
  description: "Prune up to 99 messages.",
  // eslint-disable-next-line consistent-return
  execute(message, args) {
    const amount = parseInt(args[0], 10) + 1;

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(amount)) {
      return message.reply("that doesn't seem to be a valid number.");
    }
    if (amount <= 1 || amount > 100) {
      return message.reply("you need to input a number between 1 and 99.");
    }

    message.channel.bulkDelete(amount, true).catch(err => {
      // eslint-disable-next-line no-console
      console.error(err);
      message.channel.send(
        "there was an error trying to prune messages in this channel!"
      );
    });
  }
};
