import { Test, TestingModule } from '@nestjs/testing';
import { AiagentsController } from './aiagents.controller';

describe('AiagentsController', () => {
  let controller: AiagentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiagentsController],
    }).compile();

    controller = module.get<AiagentsController>(AiagentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
