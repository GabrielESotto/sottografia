import mongoose, { Schema } from 'mongoose';

export interface IAgenda {
  nameEvent: string;
  description: string;
  dateEvent: string;
  hourEvent: string;
}

const AgendaSchema: Schema = new Schema(
  {
    nameEvent: { type: String, required: true },
    description: { type: String, required: false },
    dateEvent: { type: String, required: true },
    hourEvent: { type: String, required: true }
  },
  {
    versionKey: false
  }
)

export default mongoose.model<IAgenda>('Agenda', AgendaSchema)
