import { Router } from 'express'
import { UserController } from './controllers/User.controller'

const router = Router()
const users = new UserController()

router.post('/users', users.create)

export { router }