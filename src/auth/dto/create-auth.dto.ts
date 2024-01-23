import { IsEmail, IsString } from 'class-validator';
import { IsValidPassword } from 'src/common/validators/is-valid-password';

export class CreateAuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsValidPassword()
  password: string;

  @IsString()
  full_name: string;
}
