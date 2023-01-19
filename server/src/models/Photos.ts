import mongoose, { Schema } from 'mongoose'

export interface IPhotos {
  title: string;
  event: string;
}

const PhotosSchema: Schema = new Schema(
  {
    title: { type: String, required: true }, 
    event: { type: String, required: true},
  },
  {
    versionKey: false
  }
)

export default mongoose.model<IPhotos>('Photos', PhotosSchema)
