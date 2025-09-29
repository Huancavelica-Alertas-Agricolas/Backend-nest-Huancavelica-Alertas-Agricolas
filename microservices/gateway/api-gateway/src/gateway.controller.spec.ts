import { Test, TestingModule } from '@nestjs/testing';
// Update the import path if the file is located elsewhere, for example:
import { GatewayController } from './gateway.controller';
// Or ensure that '../gateway.controller.ts' exists in the parent directory.
import { ClientProxy } from '@nestjs/microservices';
import { of } from 'rxjs';

describe('GatewayController', () => {
  let controller: GatewayController;
  let userService: ClientProxy;
  let weatherService: ClientProxy;
  let notificationService: ClientProxy;
  let alertService: ClientProxy;
  let logService: ClientProxy;
  let preferenceService: ClientProxy;

  const mockClientProxy = {
    send: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GatewayController],
      providers: [
        { provide: 'USER_SERVICE', useValue: mockClientProxy },
        { provide: 'WEATHER_SERVICE', useValue: mockClientProxy },
        { provide: 'NOTIFICATION_SERVICE', useValue: mockClientProxy },
        { provide: 'ALERT_SERVICE', useValue: mockClientProxy },
        { provide: 'LOG_SERVICE', useValue: mockClientProxy },
        { provide: 'PREFERENCE_SERVICE', useValue: mockClientProxy },
      ],
    }).compile();

    controller = module.get<GatewayController>(GatewayController);
    userService = module.get<ClientProxy>('USER_SERVICE');
    weatherService = module.get<ClientProxy>('WEATHER_SERVICE');
    notificationService = module.get<ClientProxy>('NOTIFICATION_SERVICE');
    alertService = module.get<ClientProxy>('ALERT_SERVICE');
    logService = module.get<ClientProxy>('LOG_SERVICE');
    preferenceService = module.get<ClientProxy>('PREFERENCE_SERVICE');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getHello', () => {
    it('should return gateway info', () => {
      const result = controller.getHello();
      expect(result).toEqual({
        message: 'Agro-Alertas API Gateway',
        version: '2.0.0',
        services: [
          'user-service',
          'weather-service',
          'notification-service',
          'alert-service',
          'log-service',
          'preference-service',
        ],
      });
    });
  });

  describe('createUser', () => {
    it('should create a user through user service', async () => {
      const userData = { name: 'Test User', email: 'test@example.com' };
      const expectedResult = { id: 1, ...userData };
      
      mockClientProxy.send.mockReturnValue(of(expectedResult));

      const result = await controller.createUser(userData);
      
      expect(mockClientProxy.send).toHaveBeenCalledWith('create_user', userData);
      expect(result).toEqual(expectedResult);
    });
  });
});