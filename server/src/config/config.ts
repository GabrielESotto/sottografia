import dotenv from 'dotenv'

dotenv.config()

const MONGO_USER = process.env.MONGO_USER || "";
const MONGO_PASS = process.env.MONGO_PASS || "";
const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@sottografia.zehawum.mongodb.net/?retryWrites=true&w=majority`
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3001;

export const config = {
  mongo: {
    url: MONGO_URL
  },
  server: {
    port: SERVER_PORT
  }
}
