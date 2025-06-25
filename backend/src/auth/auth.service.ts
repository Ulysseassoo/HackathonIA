import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UtilsService } from '../utils/utils.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dtos/users.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly utilsService: UtilsService,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: CreateUserDto) {
    const existing = await this.usersService.findByEmail(body.email);
    if (existing) {
      throw new BadRequestException('Email déjà utilisé');
    }
    const hashed = await this.utilsService.hashPassword(body.password);
    const user = await this.usersService.create({ ...body, password: hashed });
    return { id: user.id, email: user.email, fullname: user.fullname };
  }

  async login(body: { email: string; password: string }) {
    const user = await this.usersService.findByEmail(body.email);
    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    const valid = await argon2.verify(user.password, body.password);
    if (!valid) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return { access_token: token };
  }
}
