const client = require("./client");
const dotenv = require("dotenv");
dotenv.config();

// https://api.mcstatus.io/v2/status/java/<address>
let CavernersSMP = process.env.SERVER_IP;

async function getStatus(ip) {
  console.log("Getting mc server status...");
  const req = await fetch(`https://api.mcstatus.io/v2/status/java/${ip}`, {
    headers: { "Content-Type": "application/json" },
  });

  const response = await req.json();
  let playerListData = response.players.list;

  if (playerListData == null) {
    console.log("No one is on :(");
    return 0;
  } else {
    console.log(`There are currently ${playerListData.length} players online!`);
    return playerListData.length;
  }
}

function startMinecraftServerStatusPolling() {
  client.once("ready", async () => {
    console.log("Bot is online!");
    const channel = await client.channels.fetch(process.env.CHANNEL_ID);
    let lastCounted = await getStatus(CavernersSMP);
    channel.send(
      `There are ${lastCounted} players online! <@&${process.env.ROLE_ID}>`,
    );

    setInterval(
      async () => {
        const newCounted = await getStatus(CavernersSMP);
        if (newCounted > lastCounted) {
          channel.send(
            `There are ${newCounted} players online! <@&${process.env.ROLE_ID}>`,
          );
        } else if (newCounted !== 0) {
          channel.send(`There are ${newCounted} players online!`);
        }
        lastCounted = newCounted;
      },
      5 * 60 * 1000,
    );
  });
}

module.exports = {
  startMinecraftServerStatusPolling,
};
