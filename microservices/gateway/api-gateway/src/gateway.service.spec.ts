import { Test, TestingModule } from '@nestjs/testing';
import { GatewayService } from './gateway.service';

describe('GatewayService', () => {
  let service: GatewayService;

  beforeEach(async () => {
    const mockClientProxy = { send: jest.fn(), emit: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GatewayService,
        { provide: 'USER_SERVICE', useValue: mockClientProxy },
        { provide: 'WEATHER_SERVICE', useValue: mockClientProxy },
        { provide: 'NOTIFICATION_SERVICE', useValue: mockClientProxy },
        { provide: 'ALERT_SERVICE', useValue: mockClientProxy },
        { provide: 'LOG_SERVICE', useValue: mockClientProxy },
        { provide: 'PREFERENCE_SERVICE', useValue: mockClientProxy },
      ],
    }).compile();
    service = module.get<GatewayService>(GatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Agrega aquí más tests unitarios
});
