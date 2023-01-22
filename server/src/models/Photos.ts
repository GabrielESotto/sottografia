import mongoose, { Schema } from 'mongoose'

export interface IPhotos {
  image: string;
  title: string;
  event: string;
}

const PhotosSchema: Schema = new Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true }, 
    event: { type: String, required: true },
  },
  {
    versionKey: false
  }
)

export default mongoose.model<IPhotos>('Photos', PhotosSchema)
