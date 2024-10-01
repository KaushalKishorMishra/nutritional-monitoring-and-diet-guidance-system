import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(32)
  public name: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public phone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;
}

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;
}

export class VerifyUserDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  public value: string;
}

export class ResendVerificationDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;
}

export class TargetNutrients {
  @IsString()
  @IsNotEmpty()
  public calorie: number;
}

export class VectorQuery {
  @IsNotEmpty()
  public carbohydrate: number;

  @IsNotEmpty()
  public total_fat: number;

  @IsNotEmpty()
  public cholesterol: number;

  @IsNotEmpty()
  public protein: number;

  @IsNotEmpty()
  public fiber: number;

  @IsNotEmpty()
  public sugars: number;
}
