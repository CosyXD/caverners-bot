const { CommandKit } = require("commandkit");
const client = require("./client");
const {
  startMinecraftServerStatusPolling,
} = require("./minecraftServerHandler");

const dotenv = require("dotenv");
dotenv.config();

const botToken = process.env.TOKEN ?? process.env.token;

startMinecraftServerStatusPolling();

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "getrole") {
    const role = interaction.guild.roles.cache.get("1516473444806426745");

    if (!role) {
      return interaction.reply({
        content: "Role not found.",
        ephemeral: true,
      });
    }

    try {
      await interaction.member.roles.add(role);

      await interaction.reply({
        content: `You were given the ${role.name} role!`,
        ephemeral: true,
      });
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: "Couldn't give you the role.",
        ephemeral: true,
      });
    }
  }
});

client.login(botToken);
