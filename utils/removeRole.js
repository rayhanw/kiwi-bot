const { ROLES, EMOJIS } = require("./constants");

const removeRole = async (reaction, user) => {
  console.log("Executing removing role");

  if (reaction.emoji.id === EMOJIS.genshin) {
    reaction.message.member.roles.remove(ROLES.genshin);
    console.log(`Genshin role was removed from ${user.username}`);
  } else if (reaction.emoji.id === EMOJIS.ffxiv) {
    reaction.message.member.roles.remove(ROLES.ffxiv);
    console.log(`FFXIV role was removed from ${user.username}`);
  } else if (reaction.emoji.id === EMOJIS.phasmophobia) {
    reaction.message.member.roles.remove(ROLES.phasmophobia);
    console.log(`Phasmophobia role was removed from ${user.username}`);
  }
};

module.exports = removeRole;
