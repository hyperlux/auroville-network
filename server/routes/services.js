import express from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';

const router = express.Router();

const serviceSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  category: z.string(),
  contactInfo: z.string()
});

router.get('/', async (req, res, next) => {
  try {
    const services = await prisma.cityService.findMany({
      include: {
        provider: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    res.json(services);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const serviceData = serviceSchema.parse(req.body);
    const service = await prisma.cityService.create({
      data: {
        ...serviceData,
        providerId: req.user.id
      }
    });
    res.status(201).json(service);
  } catch (error) {
    next(error);
  }
});

export const servicesRouter = router;