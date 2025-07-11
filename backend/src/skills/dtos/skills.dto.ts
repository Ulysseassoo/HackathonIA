import { IsNotEmpty } from 'class-validator';

export class CreateSkillDto {
  @IsNotEmpty()
  name: string;
}

export class UpdateSkillDto extends CreateSkillDto {}
