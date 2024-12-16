import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { DatabaseService } from 'src/database/database.service';
import { randomUUID } from 'crypto';

@Injectable()
export class BankService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create({ bankName, userId }: CreateBankDto) {
    return await this.databaseService.bank.create({
      data: {
        bankName,
        sharableId: randomUUID(),
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async findAllById(id: number) {
    const userBanks = await this.databaseService.bank.findMany({
      where: { userId: id },
    });

    if (userBanks.length === 0) {
      throw new NotFoundException('Banks not found');
    }
    return userBanks;
  }

  async findOne(id: number, userId: number) {
    const bank = await this.databaseService.bank.findUnique({
      where: { id, userId },
    });

    if (!bank) {
      throw new NotFoundException('Bank not found');
    }
    return bank;
  }

  async update(id: number, updateBankDto: UpdateBankDto) {
    const bank = await this.databaseService.bank.findUnique({
      where: { id },
    });

    if (!bank) {
      throw new NotFoundException('Bank not found');
    }

    const updatedBank = await this.databaseService.bank.update({
      where: { id },
      data: updateBankDto,
    });

    return {
      message: 'Bank updated successfully',
      data: updatedBank,
    };
  }

  async remove(id: number) {
    const bank = await this.databaseService.bank.findUnique({
      where: { id },
    });

    if (!bank) {
      throw new NotFoundException('Bank not found');
    }
    return {
      message: 'Bank deleted successfully',
    };
  }
}
