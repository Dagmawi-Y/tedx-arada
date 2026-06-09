export interface Speaker {
  id: string;
  name: string;
  role: string;
  topic: string;
  image: string;
  bio: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  type: "break" | "session";
}

export interface Sponsor {
  name: string;
  logo: string;
}

export interface TedxEvent {
  id: string;
  name: string;
  status: "upcoming" | "past";
  hero: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    dateDisplay: string;
    venue: string;
  };
  theme: {
    label: string;
    title: string;
    titleAccent: string;
    description: string;
    extendedDescription: string;
  };
  date: {
    display: string;
    timeDisplay: string;
    schemaStart: string;
    schemaEnd: string;
  };
  venue: {
    name: string;
    display: string;
    city: string;
    country: string;
  };
  registrationUrl: string;
  speakers: Speaker[];
  schedule: ScheduleItem[];
  sponsors: Sponsor[];
  seo: {
    title: string;
    description: string;
    eventName: string;
  };
}
