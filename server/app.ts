import { NextFunction, Request, response, Response } from "express";

const fs = require('fs')
const path = require('path')
const folderToZip = fs.readdirSync(__dirname+'/tmp'+'/uploads')
const admz = require('adm-zip')
const fileAfterDownload = 'ensaio_completo.zip'

const zipPost = async(req: any, res: Response, next: NextFunction) => {
  const zp = new admz()

  for(let k = 0; k < folderToZip.length; k++) {
    zp.addLocalFile(__dirname+'/tmp'+'/uploads/'+folderToZip[k])
  }

  const data = zp.toBuffer()

  zp.writeZip(__dirname+'/'+fileAfterDownload)

  res.set('Content-Type', 'application/octet-stream');
  res.set('Content-Disposition', `attachment; filename=${fileAfterDownload}`);
  res.set('Content-Length', data.length);
  res.send(data);
}

const downloadZip = async(req: any, res: Response) => {
    res.setHeader('Content-type', 'attachment');
    let fileStream = fs.createReadStream('./ensaio_completo.zip');
    fileStream.pipe(res);
}

export default {
  zipPost,
  downloadZip
}
