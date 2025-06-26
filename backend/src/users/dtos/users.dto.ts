import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsBoolean,
  IsInt,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @IsOptional()
  @IsBoolean()
  isServiceProvider?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  availableToken?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  pricePerDay?: number;

  @IsOptional()
  @IsString()
  bio?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  fullname?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @IsOptional()
  @IsBoolean()
  isServiceProvider?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  availableToken?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  pricePerDay?: number;

  @IsOptional()
  @IsString()
  bio?: string;
}

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
