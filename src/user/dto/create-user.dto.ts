import { IsEmail, IsString, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsString()
  full_name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  is_verify: boolean;
}
