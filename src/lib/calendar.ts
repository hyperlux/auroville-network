import { useState, useEffect, useCallback } from 'react';

interface Comment {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
  user?: {
    name: string;
    avatar?: string;
  };
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  endTime: string;
  description: string;
  location: string;
  category: string;
  attendees: string[];
  maxSpots: number;
  image?: string;
  isJoined?: boolean;
  comments?: Comment[];
  organizerId: string;
  organizer: {
    name: string;
    avatar?: string;
  };
}

export interface CalendarState {
  events: CalendarEvent[];
  loading: boolean;
  error: Error | null;
  fetchEvents: () => Promise<void>;
  joinEvent: (eventId: string, userId: string) => Promise<void>;
  leaveEvent: (eventId: string, userId: string) => Promise<void>;
  addComment: (eventId: string, comment: { userId: string; text: string }) => Promise<void>;
}

export const useCalendar = (): CalendarState => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const joinEvent = useCallback(async (eventId: string, userId: string) => {
    try {
      await fetch(`/api/events/${eventId}/join`, {
        method: 'POST',
        body: JSON.stringify({ userId })
      });
      setEvents(prevEvents => 
        prevEvents.map(event =>
          event.id === eventId
            ? { ...event, attendees: [...event.attendees, userId], isJoined: true }
            : event
        )
      );
    } catch (err) {
      console.error('Failed to join event:', err);
    }
  }, []);

  const leaveEvent = useCallback(async (eventId: string, userId: string) => {
    try {
      await fetch(`/api/events/${eventId}/leave`, {
        method: 'POST',
        body: JSON.stringify({ userId })
      });
      setEvents(prevEvents =>
        prevEvents.map(event =>
          event.id === eventId
            ? { ...event, attendees: event.attendees.filter(id => id !== userId), isJoined: false }
            : event
        )
      );
    } catch (err) {
      console.error('Failed to leave event:', err);
    }
  }, []);

  const addComment = useCallback(async (eventId: string, commentData: { userId: string; text: string }) => {
    try {
      const response = await fetch(`/api/events/${eventId}/comments`, {
        method: 'POST',
        body: JSON.stringify(commentData)
      });
      const newComment: Comment = {
        id: Date.now().toString(), // Temporary ID until server responds
        userId: commentData.userId,
        text: commentData.text,
        createdAt: new Date().toISOString(),
        user: { name: 'User' } // Temporary user info until server responds
      };
      
      setEvents(prevEvents =>
        prevEvents.map(event =>
          event.id === eventId
            ? {
                ...event,
                comments: [...(event.comments || []), newComment]
              }
            : event
        )
      );
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    loading,
    error,
    fetchEvents,
    joinEvent,
    leaveEvent,
    addComment
  };
}; 