# API request examples (curl / PowerShell)

Base URL: http://localhost:3000/api
Auth: Bearer <JWT>

1) Register (POST /api/auth/register)

curl -X POST "${BASE:-http://localhost:3000}/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"phone":"+51987654321","password":"password123","name":"Juan Perez"}'

PowerShell:
```powershell
$body = @{ phone = "+51987654321"; password = "password123"; name = "Juan Perez" } | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri "http://localhost:3000/api/auth/register" -Body $body -ContentType 'application/json'
```

2) Login (POST /api/auth/login)

curl -X POST "http://localhost:3000/api/auth/login" -H "Content-Type: application/json" -d '{"phone":"+51987654321","password":"password123"}'

3) Get current user (GET /api/users/me)

curl -H "Authorization: Bearer <token>" http://localhost:3000/api/users/me

4) Reports - Create (POST /api/reports)

curl -X POST "http://localhost:3000/api/reports" \
  -H "Authorization: Bearer <token>" -H "Content-Type: application/json" \
  -d '{"userId":"user_abc123","cropType":"papa","dateRange":{"start":"2025-09-01T00:00:00Z","end":"2025-09-07T23:59:59Z"},"temperatureData":[{"date":"2025-09-01T03:00:00Z","temperature":2.1}] }'

5) Alerts - Create (POST /api/alerts)

curl -X POST "http://localhost:3000/api/alerts" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"reportId":"rpt_123","userId":"user_abc123","ts":"2025-09-02T03:00:00Z","type":"temperature","severity":"alto","title":"Helada detectada","description":"Temperatura -1.4°C registrada"}'

6) Devices - Register (POST /api/devices)

curl -X POST "http://localhost:3000/api/devices" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"userId":"user_abc123","platform":"android","token":"abcdef"}'

RPC / Microservices notes
- The gateway uses message patterns (e.g., `get_all_users`, `create_user`). If you want to call RPC directly from another service, use the NestJS microservices client and the pattern names shown in `microservices/gateway/api-gateway/src/gateway.controller.ts`.

Save this file and import to Postman/Insomnia by creating requests using the above cURL/PowerShell commands. Replace `<token>` with a valid JWT from login.
