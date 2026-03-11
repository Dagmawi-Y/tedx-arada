import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

// Initial mock data
const INITIAL_DATA: Attendee[] = [
  { id: 'TX-001', name: 'Dagmawi Yohannes', email: 'dag@example.com', status: 'selected' },
  { id: 'TX-002', name: 'Melat Teshome', email: 'melat@example.com', status: 'selected' },
  { id: 'TX-003', name: 'Amadou Diallo', email: 'amadou@example.com', status: 'selected' },
  { id: 'TX-004', name: 'Zewidu Alemu', email: 'zewidu@example.com', status: 'applied' },
  { id: 'TX-005', name: 'Eden Habte', email: 'eden@example.com', status: 'checked_in' },
];

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
      name: 'check-in-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
