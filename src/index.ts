import dotenv from "dotenv";
import schedule from "node-schedule";
import { Client, GatewayIntentBits, TextChannel } from "discord.js";
import { getLessonsToday } from "./helper/LessonsHelper";
import { buildLessonsEmbed } from "./helper/EmbedHelper";

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
  client.user?.setActivity(process.env.DISCORD_BOT_GAME!);
});

schedule.scheduleJob(process.env.EXECUTE_INTERVAL!, async function () {
  processTimeTable("kursa", client);
  processTimeTable("kursb", client);
});

client.login(process.env.DISCORD_BOT_TOKEN);

async function processTimeTable(course: string, client: Client): Promise<void> {
  var lessons = await getLessonsToday(course);

  if (lessons.length == 0) {
    return;
  }

  const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID!);

  const embed = buildLessonsEmbed(lessons, course);
  (channel as any).send({ embeds: [embed] });
}
