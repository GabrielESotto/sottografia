import express from 'express';
import mongoose from 'mongoose'
import http from 'http'
import bodyParser from 'body-parser';

import { config } from './config/config';
import userRoutes from './routes/User';
import photoRoutes from './routes/Photos';
import agendaRoutes from './routes/Agenda';

const router = express();

// Connect to MongoDB
mongoose.set("strictQuery", false)

mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority'})
.then(() => {
  StartServer()
})
.catch(error => {
  console.error('Unable to connect')
  console.error(error)
})


// Only start server if Mongo connects
const StartServer = () => {
  router.use((req, res, next) => {
    console.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        console.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }))
  router.use(bodyParser.json())
  router.use(express.json())

  // Rules API
  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
  });

  // Routes
  router.use('/users', userRoutes)
  router.use('/photos', photoRoutes)
  router.use('/agenda', agendaRoutes)

  // Error handling
  router.use((req, res) => {
    const error = new Error('Route not found')

    console.log(error)

    res.status(404).json({
      message: error.message
    })
  })

  http.createServer(router).listen(config.server.port, () => console.log(`Server is running on port ${config.server.port}`))
}
