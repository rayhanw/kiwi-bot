const { ROLES, EMOJIS } = require("./constants");

const addRole = (reaction, user) => {
  console.log("Executing adding role");

  if (reaction.emoji.id === EMOJIS.genshin) {
    reaction.message.member.roles.add(ROLES.genshin);
    console.log(`${user.username} was given the Genshin role`);
  } else if (reaction.emoji.id === EMOJIS.ffxiv) {
    reaction.message.member.roles.add(ROLES.ffxiv);
    console.log(`${user.username} was given the FFXIV role`);
  } else if (reaction.emoji.id === EMOJIS.phasmophobia) {
    reaction.message.member.roles.add(ROLES.phasmophobia);
    console.log(`${user.username} was given the Phasmophobia role`);
  }
};

module.exports = addRole;
