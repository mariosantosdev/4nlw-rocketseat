import "reflect-metadata";
import dotenv from 'dotenv'
import createConnection from './database'

import express from 'express'
import { router } from "./routes";

const app = express()

dotenv.config()

createConnection()

app.use(express.json())
app.use(router)

export { app }