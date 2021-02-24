import request from 'supertest'
import { app } from '../app'

import createConnection from '../database'

describe('User', () => {
    beforeAll(async () => {
        const conn = await createConnection()
        await conn.runMigrations()
    })

    it('Should be able to create a new user', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'user example',
                email: 'user@example.com'
            })

        expect(response.status).toBe(201)
    })

    it('Should not be able to create a new user', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'user example',
                email: 'user@example.com'
            })

        expect(response.status).toBe(400)
    })

    it('Should not be able to create a new user because missing field name', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                email: 'user@example.com'
            })

        expect(response.body.message).toBe('Could field name')
    })

    it('Should not be able to create a new user because missing field email', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'user example',
            })

        expect(response.body.message).toBe('Could field email')
    })
})