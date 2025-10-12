const { exec } = require('child_process');
const path = require('path');

const ts = Date.now();
// Ensure the migration file and resulting class start with a letter (valid TS identifier)
const fileName = `Migration${ts}_migration`;
const projectDir = path.resolve(__dirname, '..');
// Use `node -r ts-node/register` so we don't depend on a ts-node binary in PATH
const cmd = `node -r ts-node/register -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate -d ./src/data-source.ts ./src/migrations/${fileName}`;

console.log('Generating migration with fileName:', fileName);
console.log('Running command in', projectDir);

exec(cmd, { cwd: projectDir, env: process.env }, (err, stdout, stderr) => {
  if (err) {
    console.error('Migration generation failed:');
    console.error(stderr || err.message);
    process.exit(1);
  }
  console.log(stdout);
});
