import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  async hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(
      password,
      parseInt(<string>process.env.SALT_OR_ROUNDS),
    );
    return hash;
  }
}
