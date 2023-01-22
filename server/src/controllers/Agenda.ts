import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Agenda from '../models/Agenda';

// Add new schedule to calendar
const addNewSchedule = async (req: Request, res: Response, next: NextFunction) => {
  const { nameEvent, description, dateEvent, hourEvent } = req.body;

  if(!nameEvent || !dateEvent || !hourEvent) {
    return res.status(400).json({ message: 'Nome do evento, data e horário são obrigatorios'})
  }

  if(description.length > 50) {
    return res.status(400).json({ message: 'Por favor, utilize menos de 50 caracteres na descrição'})
  }

  const newSchedule = await Agenda.create({
    nameEvent,
    description,
    dateEvent,
    hourEvent
  })

  if (!newSchedule) {
    return res.send(422).json({
      errors: ["Houve um problema, tente novamente mais tarde"]
    })
  }

  return res.status(201).json({ newSchedule })
}

const getAllSchedules = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const schedules = await Agenda.find({}).sort([["createdAt", -1]]).exec()
  
    return res.status(200).json({ schedules })
  } catch(error) {
    return res.status(404).json({ message: error })
  }
}

const deleteSchedule = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const {id} = req.params;
    const objId = new mongoose.Types.ObjectId(id)

    const schedule = await Agenda.findById(objId)

    // Check if schedule exists
    if(!schedule) {
      return res.status(404).json({ errors: ["Nenhum horário na agenda encontrado"]})
    }

    if(schedule !== null) {
      await Agenda.findByIdAndDelete(schedule._id)

      return res.status(200).json({id: schedule._id, message: 'Horario na agenda excluido com sucesso'})
    }
  } catch(error) {
    return res.status(404).json({ errors: ['Horário na agenda não encontrado']})
  }
}

const updateSchedule = async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params;
  const objId = new mongoose.Types.ObjectId(id)

  return Agenda.findById(objId)
    .then((schedule) => {
      if (schedule) {
        schedule.set(req.body)
      
        return schedule
          .save()
          .then((schedule) => res.status(201).json({ schedule }))
          .catch((error => res.status(404).json({ error })))
      } else {
        res.status(404).json({ message: "Not found" })
      }
    })
}

export default {
  addNewSchedule,
  getAllSchedules,
  deleteSchedule,
  updateSchedule
}
