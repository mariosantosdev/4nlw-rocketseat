import { EntityRepository, Repository } from "typeorm";
import { UserModel } from "../models/User.model";

@EntityRepository(UserModel)
class UserRepository extends Repository<UserModel> {

}

export { UserRepository };

