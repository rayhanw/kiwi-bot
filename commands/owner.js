module.exports = {
	name: "owner",
	description: "Gets the owner's name",
	execute(message) {
		message.channel.send("Homosaurus is the owner of the channel.");
	}
};
