const fs = require("fs");
const discordTest = require("./discord");

const commandFiles = fs
	.readdirSync("./commands")
	.filter(file => file.endsWith(".js"));

test("there should be 18 files", () => {
	// Change the argument of toBe the amount of files within the /commands folder
	expect(discordTest(commandFiles)).toBe(18);
});
