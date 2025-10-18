CI changes applied

- Ensured CI builds from source: .circleci/config.yml updated so that the per-service loop runs `npm ci`, then `npm run lint`, then `npm run build` before attempting migrations or tests.
- Untracked compiled artifacts (`dist/`, .js, .js.map, .d.ts, tsconfig.build.tsbuildinfo) so CI must build from source.

Recommendations

1. TypeScript / ESLint compatibility
   - The project had TypeScript 5.x which triggers a warning in @typescript-eslint parser versions in use. For the `user-service` I downgraded TypeScript to 4.9.5 to match the supported range of @typescript-eslint used in that service.
   - Consider aligning TypeScript and @typescript-eslint versions across all microservices for consistency.

2. CI quality gates
   - Add `npm run lint:check` and `npm run format:check` steps before `build` in CI to enforce style and lint rules in PRs.

3. Backups policy
   - Current policy: backups remain in `backups/` folder (you chose to keep them). If backups grow large, consider moving them out of repo or using an artifact store.

4. Repository hygiene
   - Avoid committing generated artifacts (`dist/`). Use root .gitignore rules added in the repo.

If you want, I can apply the TypeScript alignment globally across all microservices (either downgrade TS to 4.9.x or upgrade @typescript-eslint packages). Let me know which approach you prefer.
