import mongoose, { Schema } from 'mongoose'

export interface IUser {
  username: string;
  password: string;
  token: string;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String }
  },
  {
    versionKey: false
  }
)

export default mongoose.model<IUser>('User', UserSchema);
