import { Module } from '@nestjs/common';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [BankController],
  providers: [BankService, DatabaseService],
})
export class BankModule {}
