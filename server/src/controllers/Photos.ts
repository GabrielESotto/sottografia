import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Photos from '../models/Photos'

const { promisify } = require('util')
const fs = require('fs')
const path = require('path')

// Add new photo in DB
const addNewPhoto = async (req: Request, res: Response, next: NextFunction) => {
  const { title, event } = req.body;
  const image = req.file?.filename;

  if(!title) {
    return res.status(400).json({ message: 'Titulo é obrigatorio'})
  } else if (!event) {
    return res.status(400).json({ message: 'Evento é obrigatorio'})
  } else if (!image) {
    return res.status(400).json({ message: 'Imagem é obrigatoria'})
  }

  const newPhoto = await Photos.create({
    image,
    title,
    event,
  });

  // If photo was created successfully, return data
  if (!newPhoto) {
    return res.send(422).json({
      errors: ["Houve um problema, tente novamente mais tarde"]
    })
  }

  return res.status(201).json({ newPhoto })
}

// Remove a photo from DB
const deletePhoto = async(req: Request, res: Response, next: NextFunction) => {
  try{
    const {id} = req.params
    const objId = new mongoose.Types.ObjectId(id)
  
    const photo = await Photos.findById(objId)
  
    // Check if photo exists
    if(!photo) {
      return res.status(404).json({ errors: ['Foto não encontrada']})
    }
  
    if(photo !== null) {
      await Photos.findByIdAndDelete(photo._id)
      promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'uploads', 'photos', photo.image))
    
      return res.status(200).json({id: photo._id, message: 'Foto excluida com sucesso'})
    } 
  } catch (error) {
    return res.status(404).json({ errors: ['Foto não encontrada'] })
  }
}

// Get all photos from DB
const getAllPhotos = async(req: Request, res: Response, next: NextFunction) => {
  try{
    const photos = await Photos.find({}).sort([["createdAt", -1]]).exec()
  
    return res.status(200).json({
      file: photos,
      url: "http://localhost:3001/photos/"
    })
  } catch (error) {
    return res.status(404).json({ message: error })
  }
}

// Get only photos from an specify event
const getOnlySpecifyPhotos = async(req: Request, res: Response, next: NextFunction) => {
  try{
    const {event} = req.params

    const photos = await Photos.find({event: event}).sort([['createdAt', -1]]).exec()

    if(!photos || photos.length === 0) {
      return res.status(404).json({ message: 'Nenhuma foto desse evento foi encontrada'})
    }

    return res.status(200).json(photos)

  } catch(error) {
    return res.status(404).json({ message: error })
  }
}

const updateTitlePhoto = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    return Photos.findById(id)
      .then((title) => {
        if(title) {
          title.set(req.body)

          return title
            .save()
            .then((title) => res.status(201).json({ title }))
            .catch((error) => res.status(404).json({ error }))
        } else {
          return res.status(404).json({ message: 'Not found'})
        }
      })
  } catch(error) {
    return res.status(404).json({ message: error })
  }
}

export default {
  addNewPhoto,
  deletePhoto,
  getAllPhotos,
  getOnlySpecifyPhotos,
  updateTitlePhoto
}
