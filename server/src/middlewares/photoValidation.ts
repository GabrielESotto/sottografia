const { body } = require('express-validator')
import { Request } from "express"

type IProps = {
  req: Request;
}

const addPhotoValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage('O titulo é obrigatorio')
      .isString()
      .withMessage('O titulo é obrigatorio')
      .isLength({min: 3})
      .withMessage('O titulo precisa ter no minimo 3 caracteres'),
    body("image").custom((value: any, { req }: IProps) => {
      if(!req.file) {
        throw new Error("A imagem é obrigatoria")
      }
      return true
    }),
  ]
}

module.exports = {
  addPhotoValidation
}
