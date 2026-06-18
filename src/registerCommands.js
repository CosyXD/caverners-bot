const { REST, Routes, Client } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

const commands = [
  {
    name: "getrole",
    description: "Get the Someone's On Role",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.token);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID,
      ),
      { body: commands },
    );
    console.log("Successfully refreshed application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
