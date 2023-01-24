import { NextFunction, Request, Response } from "express";
import { deleteFromS3 } from "../middlewares/awsS3";
import Posts from '../models/Posts';

const aws = require('aws-sdk')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const createPost = async (req: any, res: Response, next: NextFunction) => {

  const { originalname: name, size, key, location: url = ""} = req.file

  if(!req.file) {
    return res.status(404).json({ errors: ['Não foi adicionado nenhum arquivo']})
  }

  const post = await Posts.create({
    name,
    size,
    key,
    url
  })

  return res.status(201).json({ post })
}

const getAllPosts = async(req: any, res: Response, next: NextFunction) => {
  const posts = await Posts.find();

  return res.status(200).json({ posts })
}

const deletePost = async(req: any, res: Response, next: NextFunction) => {
  try {
    const post = await Posts.findById(req.params.id)
    
    if(!post) {
      return res.status(404).json({ message: 'Post não encontrado'})
    }

    if(post) {
      if(process.env.STORAGE_TYPE === 'local') {

      }
    }

    if(post) {
      if(process.env.STORAGE_TYPE === 's3') {
        const s3 = new aws.S3()
        const params = {
          Bucket: 'uploadsottografia',
          Key: post.key
        }

        await deleteFromS3(params)
    } else {
      promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', post.key))
    }

      await post.remove()
    }
    
    return res.status(200).json({ message: "Post deletado com sucesso "})
  } catch(error) {
    console.log(error)
  }

}

export default {
  createPost,
  getAllPosts,
  deletePost
}
