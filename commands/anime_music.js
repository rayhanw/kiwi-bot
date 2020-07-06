module.exports = {
  name: "anime_music",
  description: "Plays a playlist of anime OSTs",
  execute(message) {
    message.channel.send(
      "_play https://www.youtube.com/watch?v=aZenmeRytEM&list=PLjNlQ2vXx1xbt30X8TcUfNzw_akVISXEu"
    );
  }
};
