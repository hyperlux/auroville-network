import express from 'express';
import { prisma } from '../lib/prisma.js';

const router = express.Router();

router.get('/profile', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        events: true,
        posts: true
      }
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/active', async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        role: true,
        _count: {
          select: {
            posts: true,
            events: true
          }
        }
      },
      orderBy: {
        posts: {
          _count: 'desc'
        }
      },
      take: 10
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

export const usersRouter = router;