const fetch = require("node-fetch");

module.exports = {
  name: "chuck-norris",
  description: "Get a random Chuck Norris fact",
  execute(message) {
    const url = "https://api.chucknorris.io/jokes/random";
    fetch(url)
      .then(response => response.json())
      .then(data => {
        message.channel.send(
          `Chuck Norris fact of the day is: **${data.value}**\n${data.icon_url}`
        );
      });
  }
};
