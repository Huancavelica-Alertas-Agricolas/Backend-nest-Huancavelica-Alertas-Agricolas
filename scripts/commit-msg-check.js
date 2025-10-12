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

// Spanish action verbs / keywords - simple list (case-insensitive)
const keywords = [
  'agreg', // agrega/agregado/agregando
  'añad', // añadir/añadido/añadiendo
  'modific',
  'elimin',
  'borr',
  'corrig',
  'arregl',
  'revert',
  'refactor',
  'actualiz',
  'document',
  'fix',
  'chore',
  'feat',
  'test'
];

const found = keywords.some(k => firstLine.toLowerCase().includes(k));

if (!found) {
  console.error('\nERROR: El mensaje de commit debe describir la acción en español (ej.: "agregando: ...", "modificando: ...", "eliminando: ...").\n');
  console.error('Ejemplos válidos para la primera línea del commit:');
  console.error('  agregando: nueva ruta para creación de usuarios');
  console.error('  modificando: configuración TypeORM para user-service');
  console.error('  eliminando: archivos SQL legacy y creando backup');
  console.error('\nPor favor edita el mensaje y vuelve a intentar el commit.\n');
  process.exit(1);
}

process.exit(0);
