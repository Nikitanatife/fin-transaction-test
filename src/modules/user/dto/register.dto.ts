import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import {
  NOT_VALID_NAME,
  PASSWORD_ERROR,
  PASSWORD_REG_EX,
  USER_NAME_REG_EX,
  validationOptions,
} from '../constants';

export class RegisterDto {
  @IsNotEmpty()
  @Length(
    validationOptions.minStringFieldLength,
    validationOptions.maxStringFieldLength,
  )
  @Matches(USER_NAME_REG_EX, {
    message: NOT_VALID_NAME,
  })
  readonly firstName: string;

  @IsNotEmpty()
  @Length(
    validationOptions.minStringFieldLength,
    validationOptions.maxStringFieldLength,
  )
  @Matches(USER_NAME_REG_EX, {
    message: NOT_VALID_NAME,
  })
  readonly lastName: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @Matches(PASSWORD_REG_EX, {
    message: PASSWORD_ERROR,
  })
  @Length(
    validationOptions.minPasswordLength,
    validationOptions.maxStringFieldLength,
  )
  readonly password: string;
}
