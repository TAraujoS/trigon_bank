import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserAuthDto } from './dto/create-user-auth.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserAuthDto: CreateUserAuthDto) {
    const { password, ...user } = createUserAuthDto;
    const hashedPassword = await hash(password);
    return await this.databaseService.user.create({
      data: {
        password: hashedPassword,
        ...user,
      },
    });
  }

  findByEmail(email: string) {
    const user = this.databaseService.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  findOne(userId: number) {
    const user = this.databaseService.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateEmployeeDto: Prisma.UserUpdateInput) {
    return await this.databaseService.user.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return await this.databaseService.user.delete({ where: { id } });
  }

  async updateHashedRefreshToken(
    userId: number,
    hashedRefreshToken: string | null,
  ) {
    return await this.databaseService.user.update({
      where: { id: userId },
      data: { hashedRefreshToken },
    });
  }
}
