import { Router, Response } from 'express';
import { pool } from '../config/database';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { packageType, message, phone } = req.body;
    const userId = req.user?.id;

    const result = await pool.query(
      `INSERT INTO projects (user_id, package_type, message, phone, status)
       VALUES ($1, $2, $3, $4, 'new')
       RETURNING *`,
      [userId, packageType || 'individual', message, phone]
    );

    res.status(201).json({
      message: 'Project created successfully',
      project: result.rows[0]
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user?.id]
    );

    res.json({ projects: result.rows });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Failed to get projects' });
  }
});

export default router;