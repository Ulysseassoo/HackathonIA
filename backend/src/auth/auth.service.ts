import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UtilsService } from '../utils/utils.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dtos/users.dto';
import * as argon2 from 'argon2';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly utilsService: UtilsService,
    private readonly jwtService: JwtService,
    private readonly rolesService: RolesService,
  ) {}

  async register(body: CreateUserDto) {
    const existing = await this.usersService.findByEmail(body.email);
    if (existing) {
      throw new BadRequestException('Email déjà utilisé');
    }
    let roleId = body.roleId;
    if (!roleId) {
      let role = await this.rolesService.findByName('ROLE_USER');
      if (!role) {
        role = await this.rolesService.create({ name: 'ROLE_USER' });
      }
      roleId = role.id;
    }
    const hashed = await this.utilsService.hashPassword(body.password);
    const user = await this.usersService.create({ ...body, password: hashed, roleId });
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
    const payload = { sub: user.id, email: user.email, role: user.roleId };
    const token = await this.jwtService.signAsync(payload);
    return { access_token: token };
  }
}
