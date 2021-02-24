import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/User.repository'

class UserController {
    async create(req: Request, res: Response) {
        const { name, email }: { name: string, email: string } = req.body

        // If not exist field name or email
        if (!name || name.trim() === '') return res.status(400).json({ message: 'Could field name', data: undefined, success: false })
        if (!email || email.trim() === '') return res.status(400).json({ message: 'Could field email', data: undefined, success: false })

        const userRepository = getCustomRepository(UserRepository)
        const userAlreadyExists = await userRepository.findOne({ email })
        if (userAlreadyExists) return res.status(400).json({ message: 'User already exist', data: undefined, success: false })

        const user = userRepository.create({ name, email })

        await userRepository.save(user)

        return res.json({ message: 'User created', data: user, success: true })
    }
}

export { UserController }