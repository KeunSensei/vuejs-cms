import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const DEFAULT_EMAIL = process.env.ADMIN_EMAIL || 'test@test.nl';
const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || 'test123!';
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  // Simple default-credentials check (no DB user store)
  if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
};

export default { login };
