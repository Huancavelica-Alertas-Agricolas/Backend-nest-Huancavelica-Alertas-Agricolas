#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const file = process.argv[2];
if (!file) {
  console.error('commit-msg hook: missing commit message file path');
  process.exit(1);
}

const text = fs.readFileSync(path.resolve(file), 'utf8').trim();
const firstLine = text.split(/\r?\n/)[0] || '';

// Good-practices checks:
// - non-empty subject
// - subject length <= 72 chars
// - no trailing period
// - either: conventional english type (feat|fix|chore|docs|refactor|test|ci)(scope)?: description
//   OR spanish action verbs at start like 'agregando:', 'modificando:', 'eliminando:', etc.

if (!firstLine) {
  console.error('\nERROR: El mensaje de commit está vacío. Añade una primera línea descriptiva.\n');
  process.exit(1);
}

// length check
if (firstLine.length > 72) {
  console.error(`\nERROR: La primera línea excede 72 caracteres (${firstLine.length}). Mantén el asunto corto y conciso.`);
  process.exit(1);
}

// no trailing period
if (/\.$/.test(firstLine)) {
  console.error('\nERROR: La primera línea no debe terminar con punto. Elimina el punto final.');
  process.exit(1);
}

const englishTypeRe = /^(feat|fix|chore|docs|refactor|test|ci)(\([^)]*\))?:\s+.+/i;
// Use stems to cover multiple Spanish verb forms and reduce regex complexity
const spanishVerbRe = /^(agreg|añad|modific|elimin|borr|corrig|arregl|actualiz|refactor|document)(ando|ado|a|o)?(:|\s+-)\s*.+/i;

if (englishTypeRe.test(firstLine) || spanishVerbRe.test(firstLine)) {
  // OK
  process.exit(0);
}

console.error('\nERROR: El mensaje de commit no cumple las buenas prácticas.');
console.error('Debe usar uno de los siguientes formatos en la primera línea:');
console.error('\n  1) Tipo convencional (inglés): "feat(scope): descripción concisa"');
console.error('     ejemplos: "feat(user): agregar endpoint de creación"  "fix: corregir validación"');
console.error('\n  2) Verbo en español al inicio: "agregando: descripción" o "modificando - descripción"');
console.error('     ejemplos: "agregando: nueva ruta para creación de usuarios"');
console.error('               "modificando: configuración TypeORM para user-service"');
console.error('\nReglas adicionales: la primera línea debe tener ≤72 caracteres y no terminar en punto.\n');
process.exit(1);
