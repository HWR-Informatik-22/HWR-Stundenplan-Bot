import axios from "axios";
import ical from "node-ical";
import { Lesson } from "../dtos/Lesson";
import { isToday } from "../utils/isToday";

export async function getLessonsToday(course: string): Promise<Lesson[]> {
  var data = await getRawIcalData(course);
  return parseData(data);
}

function parseData(data: any[]): Lesson[] {
  const lessons: Lesson[] = [];

  for (let i = 0; i < data.length; i++) {
    const lesson: Lesson = {
      name: splitSummary(data[i].summary)[1],
      room: splitSummary(data[i].summary)[3],
      teacher: splitSummary(data[i].summary)[2],
      start: new Date(data[i].start),
      end: new Date(data[i].end),
    };

    lessons.push(lesson);
  }

  return lessons;
}

function splitSummary(summary: any): string[] {
  return (summary as string).split(";");
}

async function getRawIcalData(course: string): Promise<any[]> {
  var url: string = `${process.env.ICAL_BASE_URL}${course}`;

  const result = await axios.get(url);
  const events = ical.sync.parseICS(result.data);

  return Object.values(events).filter((x) => {
    var date = (x as any).start;
    return isToday(new Date(date));
  });
}
