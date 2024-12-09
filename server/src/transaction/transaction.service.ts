import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TransactionService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(accountId: number, createTransactionDto: CreateTransactionDto) {
    const { name, amount, category, senderId, senderBankId } =
      createTransactionDto;

    const account = await this.databaseService.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    try {
      const transaction = await this.databaseService.transaction.create({
        data: {
          name,
          amount,
          category,
          account: {
            connect: {
              id: accountId,
            },
          },
          senderId,
          senderBankId,
        },
      });

      return transaction;
    } catch (error) {
      throw new Error(`Failed to create transaction: ${error.message}`);
    }
  }

  async findAll(accountId: number) {
    const transactions = await this.databaseService.transaction.findMany({
      where: {
        accountId,
      },
    });

    if (transactions.length === 0) {
      throw new NotFoundException('Transactions not found');
    }

    return transactions;
  }

  async findOne(id: number) {
    const transaction = await this.databaseService.transaction.findUnique({
      where: { id },
      include: {
        account: true,
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const { name, amount, category } = updateTransactionDto;

    const transaction = await this.databaseService.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    const updatedTransaction = await this.databaseService.transaction.update({
      where: { id },
      data: {
        name,
        amount,
        category,
      },
    });

    return updatedTransaction;
  }

  async remove(id: number) {
    const transaction = await this.databaseService.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return {
      message: 'Transaction deleted successfully',
    };
  }
}
