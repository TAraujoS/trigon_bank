import { IsNumber, IsString } from 'class-validator';

export class CreateBankDto {
  @IsString()
  bankName: string;

  @IsNumber()
  userId: number;
}
