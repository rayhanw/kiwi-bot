const fetch = require("node-fetch");

module.exports = {
  name: "weather",
  description: "Gets the weather of a city",
  args: true,
  execute(message, args) {
    const city = args.join(" ");
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OWM_API}&units=metric`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const { weather, main, name } = data;
        message.channel.send(
          `The weather in ${name} is ${weather[0].main} (${weather[0].description}) and with a temperature of ${main.temp}°C`
        );
      });
  }
};
