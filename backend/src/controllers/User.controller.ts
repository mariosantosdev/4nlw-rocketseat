import { Request, Response } from 'express'

class UserController {
    async create(req: Request, res: Response) {
        const body = req.body

        return res.json(body)
    }
}

export { UserController }