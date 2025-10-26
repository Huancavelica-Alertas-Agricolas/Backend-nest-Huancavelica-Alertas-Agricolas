import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(async () => {
    const mockHttpService = { get: jest.fn(), post: jest.fn() };
    const mockConfigService = { get: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();
    service = module.get<WeatherService>(WeatherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Agrega aquí más tests unitarios
});
