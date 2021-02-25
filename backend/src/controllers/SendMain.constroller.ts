import { Request, Response } from "express";
import { resolve } from "path";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/Surveys.repository";
import { SurverysUserRepository } from "../repositories/SurveysUser.repository";
import { UserRepository } from "../repositories/User.repository";
import SendMailService from "../services/SendMail.service";

class SendMailController {
  async execute(req: Request, res: Response) {
    const { email, survey_id }: { email: string; survey_id: string } = req.body;

    const usersRepository = getCustomRepository(UserRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUserRepository = getCustomRepository(SurverysUserRepository);

    // Checking user already exists
    const userAlreadyExists = await usersRepository.findOne({ email });
    if (!userAlreadyExists)
      return res.status(400).json({
        data: undefined,
        message: "User does not exists",
        success: false,
      });

    // Checking survey already exists
    const surveyAlreadyExists = await surveysRepository.findOne({
      id: survey_id,
    });
    if (!surveyAlreadyExists)
      return res.status(400).json({
        data: undefined,
        message: "Survey does not exists",
        success: false,
      });

    const surveyUserAlreadyExists = await surveysUserRepository.findOne({
      where: [{ user_id: userAlreadyExists.id }, { value: null }],
    });

    // path of file template
    const templateFile = resolve(
      __dirname,
      "..",
      "views",
      "emails",
      "npsMail.hbs"
    );

    const variablesEmail = {
      name: userAlreadyExists.name,
      user_id: userAlreadyExists.id,
      title: surveyAlreadyExists.title,
      description: surveyAlreadyExists.description,
      link: process.env.URL_MAIL,
    };

    if (surveyUserAlreadyExists) {
      await SendMailService.execute(
        email,
        surveyAlreadyExists.title,
        variablesEmail,
        templateFile
      );
      return res
        .status(200)
        .json({
          data: undefined,
          message: "Email send success",
          success: true,
        });
    }

    // Save info in database
    const surveyUser = surveysUserRepository.create({
      user_id: userAlreadyExists.id,
      survey_id: surveyAlreadyExists.id,
    });
    await surveysUserRepository.save(surveyUser);

    // Sending mail
    await SendMailService.execute(
      email,
      surveyAlreadyExists.title,
      variablesEmail,
      templateFile
    );
    return res.json(surveyUser);
  }
}

export { SendMailController };
