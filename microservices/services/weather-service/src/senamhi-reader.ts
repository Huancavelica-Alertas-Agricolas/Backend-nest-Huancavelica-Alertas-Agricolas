import * as XLSX from 'xlsx';
import { join } from 'path';

export interface SenamhiRecord {
  fecha?: string;
  temp_min?: number;
  temp_max?: number;
  precipitacion?: number;
  humedad?: number;
  viento?: number;
  evento_extremo?: string;
}

export function leerSenamhiExcel(): SenamhiRecord[] {
  const filePath = join(process.cwd(), 'data', 'senamhi_historico.xlsx');
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json<SenamhiRecord>(sheet, { defval: null });
  // Aquí puedes filtrar/mapear las columnas clave si el nombre es diferente
  return data;
}
