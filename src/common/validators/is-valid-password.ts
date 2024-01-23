import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsValidPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message:
          'Password must be not exceed 255 characters. And must be least 8 characters with 1 number, 1 lowercase, 1 uppercase',
        ...validationOptions,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          const hasNumber = /\d/.test(value);
          const hasLowercase = /[a-z]/.test(value);
          const hasUppercase = /[A-Z]/.test(value);
          return (
            typeof value === 'string' &&
            value.length >= 8 &&
            value.length < 255 &&
            hasNumber &&
            hasLowercase &&
            hasUppercase
          ); // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}
