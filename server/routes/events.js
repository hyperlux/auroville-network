import express from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';

const router = express.Router();

const eventSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  date: z.string().datetime(),
  location: z.string(),
  imageUrl: z.string().url().optional(),
});

router.get('/', async (req, res, next) => {
  try {
    const events = await prisma.event.findMany({
      include: {
        attendees: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      }
    });
    res.json(events);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const eventData = eventSchema.parse(req.body);
    const event = await prisma.event.create({
      data: {
        ...eventData,
        organizerId: req.user.id
      }
    });
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/attend', async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.eventAttendee.create({
      data: {
        eventId: id,
        userId: req.user.id
      }
    });
    res.json({ message: 'Successfully registered for event' });
  } catch (error) {
    next(error);
  }
});

export const eventsRouter = router;