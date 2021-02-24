import { Router } from 'express'
import { UserController } from './controllers/User.controller'
import { SurveysController } from './controllers/Surveys.controller'

const router = Router()
const users = new UserController()
const surveys = new SurveysController()

router.post('/users', users.create)

router.get('/surveys', surveys.show)
router.post('/surveys', surveys.create)

export { router }