import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from './axios';
import { format, addDays } from 'date-fns';

export interface EventComment {
  id: string;
  text: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  category: string;
  attendees: number;
  maxSpots: number;
}

// Mock data for development
const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Community Clean-up Drive",
    description: "Join us for our monthly community clean-up initiative.",
    date: format(new Date(), 'yyyy-MM-dd'),
    time: "09:00",
    endTime: "12:00",
    location: "Central Park",
    category: "Community",
    image: "https://images.unsplash.com/photo-1558008258-3256797b43f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    attendees: 156,
    maxSpots: 200,
    organizerId: "1",
    organizer: {
      id: "1",
      name: "John Doe"
    },
    comments: [
      {
        id: "1",
        text: "Looking forward to this event!",
        createdAt: "2024-03-10T10:00:00Z",
        author: {
          id: "2",
          name: "Jane Smith"
        }
      }
    ],
    isJoined: false
  },
  {
    id: "2",
    title: "Local Business Fair",
    description: "Showcase of local businesses and networking opportunity.",
    date: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
    time: "10:00",
    endTime: "13:00",
    location: "City Convention Center",
    category: "Business",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    attendees: 230,
    maxSpots: 300,
    organizerId: "2",
    organizer: {
      id: "2",
      name: "Jane Smith"
    },
    comments: [],
    isJoined: false
  }
];

export interface CalendarState {
  events: CalendarEvent[];
  selectedDate: Date;
  viewMode: 'month' | 'week' | 'day';
  searchQuery: string;
  sidebarSearchQuery: string;
  selectedCategory: string;
  isLoading: boolean;
  error: string | null;
  fetchEvents: (month?: number, year?: number) => Promise<void>;
  createEvent: (event: Partial<CalendarEvent>) => Promise<void>;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  setSelectedDate: (date: Date) => void;
  setViewMode: (mode: 'month' | 'week' | 'day') => void;
  setSearchQuery: (query: string) => void;
  setSidebarSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
  events: [],
  selectedDate: new Date(),
  viewMode: 'month',
  searchQuery: '',
  sidebarSearchQuery: '',
  selectedCategory: '',
  isLoading: false,
  error: null,
  fetchEvents: async (month?: number, year?: number) => {
    try {
      set({ isLoading: true, error: null });
      const currentDate = new Date(get().selectedDate);
      
      try {
        const response = await axios.get('/events', {
          params: {
            month: month ?? currentDate.getMonth() + 1,
            year: year ?? currentDate.getFullYear()
          }
        });
        set({ events: response.data, isLoading: false });
      } catch (apiError) {
        console.log('Using stored data:', apiError);
        const storedEvents = get().events;
        if (month || year) {
          const filteredEvents = storedEvents.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getMonth() + 1 === (month ?? currentDate.getMonth() + 1) &&
                   eventDate.getFullYear() === (year ?? currentDate.getFullYear());
          });
          set({ events: filteredEvents, isLoading: false });
        } else {
          set({ events: storedEvents, isLoading: false });
        }
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  createEvent: async (event) => {
    try {
      set({ isLoading: true, error: null });
      try {
        await axios.post('/events', event);
        await get().fetchEvents();
      } catch (apiError) {
        console.log('Storing event locally:', apiError);
        const newEvent: CalendarEvent = {
          ...event as CalendarEvent,
          id: String(Date.now()),
          comments: [],
          isJoined: false,
          attendees: 0
        };
        set(state => ({ 
          events: [...state.events, newEvent],
          isLoading: false
        }));
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
  updateEvent: async (id, event) => {
    try {
      set({ isLoading: true, error: null });
      try {
        await axios.put(`/events/${id}`, event);
        await get().fetchEvents();
      } catch (apiError) {
        console.log('Updating event locally:', apiError);
        set(state => ({
          events: state.events.map(e => e.id === id ? { ...e, ...event } : e),
          isLoading: false
        }));
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
  deleteEvent: async (id) => {
    try {
      set({ isLoading: true, error: null });
      try {
        await axios.delete(`/events/${id}`);
        await get().fetchEvents();
      } catch (apiError) {
        console.log('Deleting event locally:', apiError);
        set(state => ({
          events: state.events.filter(e => e.id !== id),
          isLoading: false
        }));
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
  setSelectedDate: (date) => set({ selectedDate: date }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSidebarSearchQuery: (query) => set({ sidebarSearchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category })
}));