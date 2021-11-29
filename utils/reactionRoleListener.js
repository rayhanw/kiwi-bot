const addRole = require("./addRole");
const removeRole = require("./removeRole");

const reactionRoleListener = async (reaction, user, type) => {
  // When a reaction is received, check if the structure is partial
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (e) {
      console.error("Something went wrong when fetching the message:", e);
      return;
    }
  }

  if (
    !reaction.message.content.includes(
      "Simply react with the chosen emoji to get the role that you'd like:"
    )
  ) {
    return;
  }

  console.log(reaction.emoji.id);

  if (type === "ADD") {
    addRole(reaction, user);
  } else if (type === "REMOVE") {
    removeRole(reaction, user);
  }
};

module.exports = reactionRoleListener;
