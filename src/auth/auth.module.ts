import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from 'src/configs/typeorm.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from '../auth/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({  // jwt 토큰을 생성하기 위한 jwtModule
      secret: 'Secret1234',
      signOptions:{
        expiresIn: 60 * 60,
      }
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [AuthController],
  providers: [UserRepository, AuthService, JwtStrategy], 
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
