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
  try {
    const { username, password } = req.body;

    if(!username || !password) {
      res.status(401).send('Todos os campos devem ser preenchidos')
    }

    const user = await User.findOne({ username: username })

    if(!user || user === null) {
      return res.status(500).send('Usuario não encontrado')
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id },
        process.env.TOKEN_KEY,
        {
          expiresIn: "30min"
        }
      )

      user.token = token;

      return res.status(200).json({ user })
    }

    return res.status(401).json('Dados inválidos')
  } catch (error) {
    next(error)
  }
}

export default {
  createAdminUser,
  loginUser
}
