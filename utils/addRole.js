const { ROLES, EMOJIS } = require("./constants");

const addRole = async (reaction, user) => {
  const discordUser = await reaction.message.guild.members.cache.get(user.id);

  if (reaction.emoji.id === EMOJIS.genshin) {
    discordUser.roles.add(ROLES.genshin);
    console.log(`${user.username} was given the Genshin role`);
  } else if (reaction.emoji.id === EMOJIS.ffxiv) {
    discordUser.roles.add(ROLES.ffxiv);
    console.log(`${user.username} was given the FFXIV role`);
  } else if (reaction.emoji.id === EMOJIS.phasmophobia) {
    discordUser.roles.add(ROLES.phasmophobia);
    console.log(`${user.username} was given the Phasmophobia role`);
  }
};

module.exports = addRole;
