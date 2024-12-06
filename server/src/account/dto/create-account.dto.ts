import { AccountType } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsNumber()
  currentBalance: number;

  @IsString()
  mask: string;

  @IsEnum(AccountType)
  accountType: AccountType;

  @IsNumber()
  bankId: number;
}
