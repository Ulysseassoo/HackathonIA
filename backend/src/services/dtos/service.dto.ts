import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsUUID()
  providerId: string;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;
}

export class UpdateServiceDto extends CreateServiceDto {}
