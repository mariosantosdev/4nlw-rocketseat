import request from 'supertest'
import { app } from '../app'

import createConnection from '../database'

describe('Survey', () => {
    beforeAll(async () => {
        const conn = await createConnection()
        await conn.runMigrations()
    })

    it('Should be able to create a new survey', async () => {
        const response = await request(app)
            .post('/surveys')
            .send({
                title: 'Survey Example',
                description: 'Survey Example Description'
            })

        expect(response.status).toBe(201)
    })

    it('Should not be able to create a new survey because is missing title field', async () => {
        const response = await request(app)
            .post('/surveys')
            .send({
                description: 'Survey Example Description'
            })

        expect(response.body.message).toBe('Title\'s missing.')
    })

    it('Should not be able to create a new survey because is missing description field', async () => {
        const response = await request(app)
            .post('/surveys')
            .send({
                title: 'Survey Example'
            })

        expect(response.body.message).toBe('Description\'s missing.')
    })

    it('Should be able to get all surveys', async () => {
        await request(app)
            .post('/surveys')
            .send({
                title: 'Survey Example',
                description: 'Survey Example Description'
            })

        const response = await request(app)
            .get('/surveys')

        expect(response.body.data.length).toBe(2)
    })
})