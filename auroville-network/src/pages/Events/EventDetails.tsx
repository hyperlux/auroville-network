import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCalendar, CalendarEvent } from '../../lib/calendar';
import { useAuth } from '../../lib/auth';

export const EventDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { events, joinEvent, leaveEvent, addComment } = useCalendar();
  const { user } = useAuth();
  const [commentText, setCommentText] = useState('');

  const event = events.find(e => e.id === id);

  if (!event) {
    return <div>Event not found</div>;
  }

  const handleJoinLeave = async () => {
    if (!user) return;
    if (event.isJoined) {
      await leaveEvent(event.id, user.id);
    } else {
      await joinEvent(event.id, user.id);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !commentText.trim()) return;
    await addComment(event.id, { userId: user.id, text: commentText });
    setCommentText('');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
      <div className="mb-4">
        <p>{event.description}</p>
        <p>Location: {event.location}</p>
        <p>Date: {event.date}</p>
        <p>Time: {event.time} - {event.endTime}</p>
      </div>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Organizer</h2>
        <div className="flex items-center">
          {event.organizer.avatar && (
            <img 
              src={event.organizer.avatar} 
              alt={event.organizer.name} 
              className="w-10 h-10 rounded-full mr-2"
            />
          )}
          <span>{event.organizer.name}</span>
        </div>
      </div>

      <button
        onClick={handleJoinLeave}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {event.isJoined ? 'Leave Event' : 'Join Event'}
      </button>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <form onSubmit={handleAddComment} className="mb-4">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Add a comment..."
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Comment
          </button>
        </form>
        <div className="space-y-4">
          {event.comments?.map((comment, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded">
              <p>{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 