import mongoose, { Schema } from 'mongoose';
import { deleteFromS3 } from '../middlewares/awsS3';

const aws = require('aws-sdk')

interface IPosts {
  name: string;
  size: number;
  key: string;
  url: string;
  createdAt: Date;
}

const PostsSchema: Schema = new Schema<IPosts>(
  {
    name: String,
    size: Number,
    key: String,
    url: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
)

PostsSchema.pre('save', function() {
  if(!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`
  }
})

export default mongoose.model<IPosts>("Posts", PostsSchema)
