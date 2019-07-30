const fetch = require('node-fetch');

module.exports = {
  name: 'ud',
  description: 'Gets the definition of a word from urban-dictionary',
  args: true,
  execute(message, args) {
    const url = `https://api.urbandictionary.com/v0/define?term=${args[0]}`;
    const definitions = [];
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        data.list.forEach(set => definitions.push(set.definition));

        message.channel.send(`UrbanDictionary's definiton(s) of ${args[0]} are:`);

        for (let i = 0; i <= 2; i += 1) {
          message.channel.send(`${i + 1}. ${definitions[i]}`);
        }
      });
  },
};
