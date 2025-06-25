import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAiAgentDto {
  @IsNotEmpty()
  name: string;
  @IsOptional()
  description?: string;
  @IsNotEmpty()
  url: string;
}

export class UpdateAiAgentDto extends CreateAiAgentDto {}
