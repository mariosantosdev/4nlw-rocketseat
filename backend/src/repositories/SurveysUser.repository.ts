import { EntityRepository, Repository } from "typeorm";
import { SurverysUserModel } from "../models/SurveysUser.model";

@EntityRepository(SurverysUserModel)
class SurverysUserRepository extends Repository<SurverysUserModel> {}

export { SurverysUserRepository };
