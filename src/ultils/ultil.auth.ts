export class UltilAuth {
  async isValidPassword(password: string): Promise<boolean> {
    if (!password || password.length > 255) {
      return false;
    }

    if (password.length < 8) {
      return false;
    }

    const hasNumber = /\d/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);

    return hasNumber && hasLowercase && hasUppercase;
  }

  async isValidEmail(email: string): Promise<boolean> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
