import type { TedxEvent } from "./types";
import salon2026 from "./salon-2026.json";
import play2026 from "./play-2026.json";

/**
 * Switch this ID when promoting a new event to the homepage.
 * Past events remain in src/data/events/ — nothing is deleted.
 */
export const CURRENT_EVENT_ID = "play-2026";

const events: Record<string, TedxEvent> = {
  [salon2026.id]: salon2026 as TedxEvent,
  [play2026.id]: play2026 as TedxEvent,
};

export function getEvent(id: string): TedxEvent {
  const event = events[id];
  if (!event) {
    throw new Error(`Unknown event id: ${id}`);
  }
  return event;
}

export function getCurrentEvent(): TedxEvent {
  return getEvent(CURRENT_EVENT_ID);
}

export function getAllEvents(): TedxEvent[] {
  return Object.values(events);
}

export type { TedxEvent, Speaker, ScheduleItem, Sponsor } from "./types";
