import { AuditLogEvent, Client, GatewayIntentBits } from "discord.js";
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

import * as dotenv from "dotenv";
dotenv.config();

export function getEnv(name: string): string {
  const envVar = process.env[name];
  if (envVar == "" || envVar == undefined) {
    return "";
  }
  return envVar;
}

// uncomment this the first time
// const { REST, Routes } = require("discord.js");

// const commands = [
//   {
//     name: "ping",
//     description: "Replies with Pong!",
//   },
// ];

// const rest = new REST({ version: "10" }).setToken(getEnv("TOKEN"));

// (async () => {
//   try {
//     console.log("Started refreshing application (/) commands.");

//     await rest.put(Routes.applicationCommands(getEnv("CLIENT_ID")), {
//       body: commands,
//     });

//     console.log("Successfully reloaded application (/) commands.");
//   } catch (error) {
//     console.error(error);
//   }
// })();

client.on("ready", (client) => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    const roles = interaction.guild?.roles.cache.map((role) => role);

    const above = "826150208329089106";
    let isAbove = false;

    const filteredRoles: any[] = [];
    roles?.forEach(async (role) => {
      if (role.id == above || isAbove) {
        filteredRoles.push(role);
        isAbove = true;
      }
    });

    console.log(filteredRoles);

    await interaction.reply("Pong!");
  }
});

client.login(getEnv("TOKEN"));
