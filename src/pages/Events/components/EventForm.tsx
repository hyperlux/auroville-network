import React, { FC, useState } from 'react';
import { CalendarEvent } from '../../../lib/calendar';

interface EventFormProps {
  event?: Partial<CalendarEvent>;
  onSubmit: (event: Partial<CalendarEvent>) => void;
}

export const EventForm: FC<EventFormProps> = ({ event = {}, onSubmit }) => {
  const [formData, setFormData] = useState<Partial<CalendarEvent>>({
    title: '',
    date: '',
    time: '',
    endTime: '',
    description: '',
    location: '',
    category: '',
    maxSpots: 0,
    ...event
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}; 