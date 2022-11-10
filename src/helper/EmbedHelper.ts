import { APIEmbedField, EmbedBuilder, RestOrArray } from "discord.js";
import { Lesson } from "../dtos/Lesson";

export function buildLessonsEmbed(lessons: Lesson[], course: string) {
  return new EmbedBuilder()
    .setColor("#de1d10")
    .setTitle(`${new Date().toLocaleDateString("de-DE")} - *${course}*`)
    .addFields(getEmbedFields(lessons));
}

function getEmbedFields(lessons: Lesson[]): APIEmbedField[] {
  const fields: RestOrArray<APIEmbedField> = [];

  lessons.forEach((lesson) => {
    fields.push({
      name: `${lesson.name} (${lesson.teacher})`,
      value: `
        Von: ${lesson.start.toLocaleString("de-DE")}
        Bis: ${lesson.end.toLocaleString("de-DE")}
        ${lesson.room}
        `,
    });
  });

  return fields;
}
