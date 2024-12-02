import { IsDateString, IsEmail, IsString, IsTaxId } from 'class-validator';

export class CreateUserAuthDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  @IsDateString()
  dateOfBirth: string;

  @IsString()
  @IsTaxId('BR')
  cpf: string;
}
