const { ROLES, EMOJIS } = require("./constants");

const removeRole = async (reaction, user) => {
  const discordUser = await reaction.message.guild.members.cache.get(user.id);

  if (reaction.emoji.id === EMOJIS.genshin) {
    discordUser.roles.remove(ROLES.genshin);
    console.log(`Genshin role was removed from ${user.username}`);
  } else if (reaction.emoji.id === EMOJIS.ffxiv) {
    discordUser.roles.remove(ROLES.ffxiv);
    console.log(`FFXIV role was removed from ${user.username}`);
  } else if (reaction.emoji.id === EMOJIS.phasmophobia) {
    discordUser.roles.remove(ROLES.phasmophobia);
    console.log(`Phasmophobia role was removed from ${user.username}`);
  }
};

module.exports = removeRole;
