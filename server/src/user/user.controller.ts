import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserAuthDto } from './dto/create-user-auth.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserAuthDto) {
    return this.userService.create(createUserDto);
  }
}
