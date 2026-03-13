import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV();

// Build custom storage wrapper for Zustand
const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    storage.remove(name);
  },
};

export type AttendeeStatus = 'applied' | 'selected' | 'checked_in';

export interface Attendee {
  id: string;
  name: string;
  email: string;
  status: AttendeeStatus;
}

interface CheckInState {
  attendees: Attendee[];
  setAttendees: (attendees: Attendee[]) => void;
  checkIn: (id: string) => { success: boolean; message: string; attendee?: Attendee };
  reset: () => void;
}

import attendeesData from '@/constants/attendees.json';

// Initial data from the parsed CSV
const INITIAL_DATA: Attendee[] = attendeesData as Attendee[];

export const useCheckInStore = create<CheckInState>()(
  persist(
    (set, get) => ({
      attendees: INITIAL_DATA,
      setAttendees: (attendees) => set({ attendees }),
      checkIn: (id) => {
        const { attendees } = get();
        const attendee = attendees.find((a) => a.id === id);

        if (!attendee) {
          return { success: false, message: 'Invalid QR Code. Attendee not found.' };
        }

        if (attendee.status === 'applied') {
          return { success: false, message: 'Attendee not selected for this event.', attendee };
        }

        if (attendee.status === 'checked_in') {
          return { success: false, message: 'Attendee has already checked in.', attendee };
        }

        // Mark as checked in
        const updatedAttendees = attendees.map((a) =>
          a.id === id ? { ...a, status: 'checked_in' as AttendeeStatus } : a
        );

        set({ attendees: updatedAttendees });
        return { success: true, message: 'Check-in successful!', attendee: { ...attendee, status: 'checked_in' } };
      },
      reset: () => set({ attendees: INITIAL_DATA }),
    }),
    {
      name: 'check-in-mmkv-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
