import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";

@Injectable()
export class UserRepository extends Repository<User>{
    constructor(private dataSource: DataSource){
        super(User, dataSource.createEntityManager());
    }

    async createUser(AuthCredentialDto: AuthCredentialDto):Promise<void>{
        const {username, password} = AuthCredentialDto;

        const user = await this.create({
            username,
            password,
        });

        await this.save(user);
    }
}