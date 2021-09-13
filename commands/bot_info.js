const Discord = require("discord.js");

module.exports = {
  name: "bot-info",
  description: "Shows the bot information",
  execute(message) {
    const embed = new Discord.MessageEmbed({
      color: "#fff",
      title: "Kiwi bot",
      url: "https://discordapp.com/oauth2/authorize?client_id=603952919536074777&scope=bot",
      author: {
        name: "Domosaurus",
        url: "https://domosaurus.me",
        iconURL: "https://www.domosaurus.me/img/canopus_lux.4940a7a8.png"
      },
      description: "A simple 'ole bot that does fuck all",
      fields: [
        {
          name: "Hmm",
          value: "I can do fuck all"
        }
      ],
      image: {
        url: "https://i.imgur.com/BX1HZTr.jpg"
      },
      footer: {
        text: "I do fuckall",
        iconURL: "https://i.imgur.com/BX1HZTr.jpg"
      }
    });

    message.channel.send({ embeds: [embed] });
  }
};
