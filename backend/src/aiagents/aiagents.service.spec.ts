import { Test, TestingModule } from '@nestjs/testing';
import { AiagentsService } from './aiagents.service';

describe('AiagentsService', () => {
  let service: AiagentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiagentsService],
    }).compile();

    service = module.get<AiagentsService>(AiagentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
