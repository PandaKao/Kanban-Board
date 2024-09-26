import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;

  // Find user in database by username
  const user = await User.findOne({
    where: { username },
  });

  // If user not found, authentication failed
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  //Compare passwords
  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';
  if (!secretKey) {
    throw new Error("jwt secret key not defined");
  }

  // Generate JWT token for authenticated user
  const token = jwt.sign({ username }, secretKey, { expiresIn: 20 });
  return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;