import { EntityRepository, Repository } from "typeorm"
import { SurverysModel } from '../models/Surveys.model'

@EntityRepository(SurverysModel)
class SurveysRepository extends Repository<SurverysModel> {

}

export { SurveysRepository }