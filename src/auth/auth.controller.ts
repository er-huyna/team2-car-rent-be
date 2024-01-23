import {
  Controller,
  Post,
  Body,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { SendEmailDto } from 'src/mail/mail.interface';
import { MailController } from 'src/mail/mail.controller';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailContrller: MailController,
  ) {}

  @HttpCode(204)
  @Post('/register')
  async create(@Body() createAuthDto: CreateAuthDto) {
    const { full_name: fullName, email, password } = createAuthDto;

    const isExisting = await this.userService.findExistingEmail(email);
    if (isExisting) {
      throw new BadRequestException('Email already is existing');
    }

    const hashPassword = await this.authService.hashPassword(password);

    const createUserDto: CreateUserDto = {
      full_name: fullName,
      email,
      password: hashPassword,
      is_verify: false,
    };

    const data = await this.userService.create(createUserDto);

    if (data) {
      const payload = { type: jwtConstants.type.register, sub: data.id };
      const verifyToken = await this.jwtService.signAsync(payload, {
        expiresIn: jwtConstants.expires.register,
      });

      const dtoSendEmail: SendEmailDto = {
        from: {
          name: process.env.APP_NAME,
          address: process.env.DEFAULT_MAIL_FROM,
        },
        recipients: [{ name: fullName, address: email }],
        subject: 'Verification Account CarRent',
        text: 'Welcome to CarRent',
        context: {
          verifyLink: encodeURI(
            process.env.URL_VERIFICATION_MAIL +
              `?email=${email}&token=${verifyToken}`,
          ),
        },
      };

      await this.mailContrller.sendEmail(dtoSendEmail);
    }
  }
}
