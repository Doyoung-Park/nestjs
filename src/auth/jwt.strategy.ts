import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: 'Secret1234',  // auth 모듈에서 jwt 토큰을 만들 때 사용했던 secret-key
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()    // jwt토큰이 어디에서 오는지
        })
    }

    async validate(payload) {   // 들어온 jwt토큰을 검증하는 메서드
        const { username } = payload;
        const user: User = await this.userRepository.findOne({
            where: {
                username
            }
        });
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;    // 리턴된 user객체가 @UseGuards(AuthGuard())에 의해 req에 들어감.   
    }

}