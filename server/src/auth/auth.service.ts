import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserAuthDto } from '../user/dto/create-user-auth.dto';
import { UserService } from 'src/user/user.service';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async registerUser(createUserAuthDto: CreateUserAuthDto) {
    const user = await this.userService.findByEmail(createUserAuthDto.email);
    if (user) {
      throw new ConflictException('User already exists');
    }
    return this.userService.create(createUserAuthDto);
  }

  async validateLocalUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = verify(user.password, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return { id: user.id, name: user.firstName };
  }
}
