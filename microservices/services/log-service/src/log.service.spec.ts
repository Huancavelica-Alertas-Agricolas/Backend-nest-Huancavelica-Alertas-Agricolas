import { Test, TestingModule } from '@nestjs/testing';
import { LogService } from './log.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LogEntry } from './entities/log-entry.entity';

describe('LogService', () => {
  let service: LogService;

  beforeEach(async () => {
    const mockRepo = { create: jest.fn(), save: jest.fn(), find: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogService,
        { provide: getRepositoryToken(LogEntry), useValue: mockRepo },
      ],
    }).compile();
    service = module.get<LogService>(LogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Agrega aquí más tests unitarios
});
