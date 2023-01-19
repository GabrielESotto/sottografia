import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createAdminUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const encryptedPass = await bcrypt.hash(password, 10)
  
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      username,
      password: encryptedPass
    })

    const token = jwt.sign(
      { user_id: user._id },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h"
      }
    )

    user.token = token;

    return user
      .save()
      .then((user) => res.status(201).json({ user }))
      .catch((error) => res.status(500).json({ error }))
  } catch (error) {
    return res.status(401).json({ error })
  }
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  
}
