import { Client, GatewayIntentBits } from "discord.js";
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

client.on("ready", (client) => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

client.login(getEnv("TOKEN"));
