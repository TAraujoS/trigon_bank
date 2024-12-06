import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService, DatabaseService],
})
export class AccountModule {}
