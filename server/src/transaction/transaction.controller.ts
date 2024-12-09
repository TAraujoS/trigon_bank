import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(
    @Body() accountId: number,
    createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionService.create(accountId, createTransactionDto);
  }

  @Get()
  findAll(@Param('accountId') accountId: number) {
    return this.transactionService.findAll(accountId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.transactionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.transactionService.remove(id);
  }
}
