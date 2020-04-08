const Discord = require("discord.js");

module.exports = {
  name: "bot-info",
  description: "Shows the bot information",
  execute(message) {
    const exampleEmbed = new Discord.RichEmbed()
      .setColor("#fff")
      .setTitle("Kiwi bot")
      .setURL(
        "https://discordapp.com/oauth2/authorize?client_id=603952919536074777&scope=bot"
      )
      .setAuthor(
        "Rayhan A",
        "https://rayhanw.com/images/profile.jpg",
        "https://rayhanw.com"
      )
      .setDescription("A simple 'ole bot that does fuck all")
      .setThumbnail("https://i.imgur.com/BX1HZTr.jpg")
      .addField("hmm", "I can do fuck all")
      .addBlankField()
      .setImage("https://i.imgur.com/BX1HZTr.jpg")
      .setTimestamp()
      .setFooter("I do fuckall", "https://i.imgur.com/BX1HZTr.jpg");

    message.channel.send(exampleEmbed);
  }
};
