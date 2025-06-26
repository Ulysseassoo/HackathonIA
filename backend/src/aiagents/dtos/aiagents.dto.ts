import { IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator';

export class CreateAiAgentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  link: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}

export class UpdateAiAgentDto extends CreateAiAgentDto {}
