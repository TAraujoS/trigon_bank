import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { BankService } from './bank.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post()
  create(@Body() createBankDto: CreateBankDto, @Request() req) {
    return this.bankService.create({ ...createBankDto, userId: req.user.id });
  }

  @Get()
  findAll(@Request() req) {
    return this.bankService.findAllById(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bankService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBankDto: UpdateBankDto) {
    return this.bankService.update(id, updateBankDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bankService.remove(id);
  }
}
