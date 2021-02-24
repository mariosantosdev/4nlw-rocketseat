import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/Surveys.repository';

class SurveysController {
    async create(req: Request, res: Response) {
        const { title, description }: { title: string, description: string } = req.body

        if (!title || title.trim() === '') return res.status(400).json({ data: undefined, message: 'Title\'s missing.', success: false })
        if (!description || description.trim() === '') return res.status(400).json({ data: undefined, message: 'Description\'s missing.', success: false })

        const surveysRepositoy = getCustomRepository(SurveysRepository)

        const survey = surveysRepositoy.create({
            title,
            description
        })

        await surveysRepositoy.save(survey)

        return res.status(201).json({ data: survey, message: 'Survey created success', success: true })
    }

    async show(req: Request, res: Response) {
        const surveysRepositoy = getCustomRepository(SurveysRepository)

        try {
            const allSurveys = await surveysRepositoy.find()
            return res.status(200).json({ data: allSurveys, message: 'List of surveys finds success', success: true })
        } catch (error) {
            return res.status(500).json({ data: error, message: 'A unexpect error.', success: false })
        }
    }

}

export { SurveysController };
