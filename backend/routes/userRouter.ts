import express, {Request, Response} from "express";
import * as bodyParser from "body-parser";
import * as userModel from "../models/user";
import {User} from "../types/User";
import { findByEmailAndPassword } from "../models/user";
const userRouter = express.Router();

const jsonParser = bodyParser.json()
userRouter.get("/", async (req: Request, res: Response) => {
  userModel.findAll((err: Error, users: User[]) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }

    res.status(200).json({"users": users});
  });
});


// signup
userRouter.post("/signup", jsonParser, async (req: Request, res: Response) => {
  console.log("Route /signup is called");
  console.log("Request body:", req.body);

  console.log(req.body);
  const newUser: User = req.body;
  if (newUser.id && isNaN(newUser.id)) {
    return res.status(400).json({ "message": 'Invalid user ID' });
  }

  userModel.create(newUser)
    .then((userId: number | null) => {
      if (userId !== null) {
        res.status(200).json({ userId });
      } else {
        res.status(500).json({ "message": 'Error creating user' });
      }
    })
    .catch((err: Error) => {
      res.status(500).json({ "message": err.message });
    });
});


// signup
userRouter.get("/signup", async (req: Request, res: Response) => {
  res.status(200).json({ message: 'GET /users/signup received' });
});
//login
userRouter.get("/login", async (req: Request, res: Response) => {
  res.status(200).json({ message: 'GET /users/signup received' });
});

//login
userRouter.post("/login", jsonParser, async (req: Request, res: Response) => {
  console.log("Route /login is called");
  console.log("Request body:", req.body);

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ "message": 'Email and password are required' });
  }

  try {
    const user = await findByEmailAndPassword(email, password);

    if (user) {
      return res.status(200).json({ "message": 'Login successful', user });
    } else {
      // Utilizatorul nu a fost găsit
      return res.status(401).json({ "message": 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ "message": 'Internal server error' });
  }
});

userRouter.post("/", jsonParser, async (req: Request, res: Response) => {
  console.log(req.body);
  const newUser: User = req.body;

  // Verifică dacă userId este un număr valid
  if (isNaN(newUser.id)) {
    return res.status(400).json({ "message": 'Invalid user ID' });
  }

  userModel.create(newUser)
    .then((userId: number | null) => {
      if (userId !== null) {
        res.status(200).json({ "userId": userId });
      } else {
        res.status(500).json({ "message": 'Error creating user' });
      }
    })
    .catch((err: Error) => {
      res.status(500).json({ "message": err.message });
    });
});
export {userRouter};