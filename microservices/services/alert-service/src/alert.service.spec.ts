import { Test, TestingModule } from '@nestjs/testing';
import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(async () => {
    const mockClient = { send: jest.fn(), emit: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlertService,
        { provide: 'WEATHER_SERVICE', useValue: mockClient },
        { provide: 'NOTIFICATION_SERVICE', useValue: mockClient },
        { provide: 'USER_SERVICE', useValue: mockClient },
      ],
    }).compile();
    service = module.get<AlertService>(AlertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Agrega aquí más tests unitarios
});
