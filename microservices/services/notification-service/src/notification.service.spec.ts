import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { MailService } from './mail/mail.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(async () => {
    const mockMailService = { sendMail: jest.fn(), sendPlainTextMail: jest.fn(), sendWelcomeEmail: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        { provide: MailService, useValue: mockMailService },
      ],
    }).compile();
    service = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Agrega aquí más tests unitarios
});
