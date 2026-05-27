import { Router, Request, Response } from 'express';
import { pool } from '../config/database';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, message, service } = req.body;

    if (!email || !message) {
      return res.status(400).json({ error: 'Email and message are required' });
    }

    await pool.query(
      `INSERT INTO contacts (name, email, phone, message, service)
       VALUES ($1, $2, $3, $4, $5)`,
      [name || null, email, phone || null, message, service || null]
    );

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router;