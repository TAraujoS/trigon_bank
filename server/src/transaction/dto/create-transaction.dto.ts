import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  name: string;

  @IsNumber()
  amount: number;

  @IsString()
  category: string;

  @IsNumber()
  accountId: number;

  @IsNumber()
  @IsOptional()
  senderId?: number;

  @IsNumber()
  @IsOptional()
  senderBankId?: number;

  @IsNumber()
  @IsOptional()
  receiverId?: number;

  @IsNumber()
  @IsOptional()
  receiverBankId?: number;
}
