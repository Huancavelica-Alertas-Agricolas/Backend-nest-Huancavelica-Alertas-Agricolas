export interface WeatherRecord {
  fecha_hora: string;
  temp_c: number;
  humedad: number;
  clima: string;
  prob_lluvia: number;
  precip_mm: number;
  riesgo_helada?: boolean;
  riesgo_sequia?: boolean;
}

export interface EmailRequest {
  to: string;
  subject: string;
  template: string;
  context: any;
}

export interface AlertRequest {
  email: string;
  userName: string;
  type: 'weather' | 'frost' | 'drought';
}

export interface ServiceResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface UserData {
  name: string;
  email: string;
  password?: string;
}

export interface ProjectData {
  name: string;
  description?: string;
  userId: number;
}