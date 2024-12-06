import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AccountService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createAccountDto: CreateAccountDto) {
    const { currentBalance, mask, accountType, bankId } = createAccountDto;

    return await this.databaseService.account.create({
      data: {
        currentBalance,
        mask,
        accountType,
        bankId,
      },
    });
  }

  async findAllByBankId(bankId: number) {
    const accounts = await this.databaseService.account.findMany({
      where: { bankId },
    });

    if (accounts.length === 0) {
      throw new NotFoundException('Accounts not found');
    }
    return accounts;
  }

  async findOne(id: number) {
    const account = await this.databaseService.account.findUnique({
      where: { id },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return account;
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const { currentBalance, mask, accountType } = updateAccountDto;
    const account = await this.databaseService.account.findUnique({
      where: { id },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    await this.databaseService.account.update({
      where: { id },
      data: {
        currentBalance,
        mask,
        accountType,
      },
    });

    return {
      message: 'Account updated successfully',
      data: account,
    };
  }

  async remove(id: number) {
    const account = await this.databaseService.account.findUnique({
      where: { id },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    await this.databaseService.account.delete({
      where: { id },
    });

    return {
      message: 'Account deleted successfully',
    };
  }
}
