import { Request, Response } from 'express';
import * as userModel from "../models/user";
import { User } from '../types/User';

export const getUserHandler = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const user = await userModel.findOne(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error('Eroare la obținerea utilizatorului:', error);
    res.status(500).json({ message: 'Eroare la obținerea utilizatorului' });
  }
};

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    const userId = await userModel.create(user);
    res.status(201).json({ userId });
  } catch (error) {
    console.error('Eroare la crearea utilizatorului:', error);
    res.status(500).json({ message: 'Eroare la crearea utilizatorului' });
  }
};
