import { Router } from "express";
import { UserController } from "./controllers/User.controller";
import { SurveysController } from "./controllers/Surveys.controller";
import { SendMailController } from "./controllers/SendMain.constroller";

const router = Router();
const users = new UserController();
const surveys = new SurveysController();
const mail = new SendMailController();

router.post("/users", users.create);

router.get("/surveys", surveys.show);
router.post("/surveys", surveys.create);

router.post("/sendMail", mail.execute);

export { router };
