import {
  AuditLogEvent,
  CacheType,
  Client,
  GatewayIntentBits,
  Interaction,
} from "discord.js";
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

import * as dotenv from "dotenv";
dotenv.config();

import { Db, MongoClient } from "mongodb";

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

const clientDb = new MongoClient(getEnv("MONGODB_URL"));
let db: Db = clientDb.db(getEnv("DB_NAME"));

client.on("ready", (client) => {
  console.log(`Logged in as ${client.user.tag}!`);
});

async function getRoles(interaction: Interaction<CacheType>) {
  const roles = interaction.guild?.roles.cache.map((role) => role);

  const above = "826150208329089106";
  const pos = await interaction.guild?.roles.fetch(above).then((role) => {
    return role?.position;
  });
  if (pos == undefined) return;

  const filteredRoles: any[] = [];
  roles?.forEach(async (role) => {
    if (role.position >= pos) {
      filteredRoles.push({
        role,
        members: role.members,
      });
    }
  });

  const converted = [];

  for (const i in filteredRoles) {
    const role = filteredRoles[i];

    const color =
      role.role.color.toString(16) == 0
        ? "99aab5"
        : role.role.color.toString(16);

    const id = role.role.id;
    const name = role.role.name;
    const position = role.role.rawPosition;

    const members = role.members.map((value: any, key: any) => key);

    converted.push({ id, name, position, members, color });
  }
  db.collection("roles").deleteMany({});
  db.collection("roles").insertMany(converted);
  console.log(await db.collection("roles").find({}).toArray());
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await getRoles(interaction);
    await interaction.reply("Pong!");
  }
});

client.login(getEnv("TOKEN"));
