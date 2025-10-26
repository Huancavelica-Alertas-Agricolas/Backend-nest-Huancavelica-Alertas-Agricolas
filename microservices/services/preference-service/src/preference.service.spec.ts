import { Test, TestingModule } from '@nestjs/testing';
import { PreferenceService } from './preference.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PreferenciasNotificacion } from './entities/preferencias-notificacion.entity';

describe('PreferenceService', () => {
  let service: PreferenceService;

  beforeEach(async () => {
    const mockRepo = { create: jest.fn(), save: jest.fn(), find: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PreferenceService,
        { provide: getRepositoryToken(PreferenciasNotificacion), useValue: mockRepo },
      ],
    }).compile();
    service = module.get<PreferenceService>(PreferenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Agrega aquí más tests unitarios
});
