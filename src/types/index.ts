export interface Computer {
  id: string;
  name: string;
  ip: string;
  mac: string;
  groupId?: string;
}

export interface ComputerGroup {
  id: string;
  name: string;
  prefix: string;
  computerIds: string[];
}

export interface WakeOnLanStatus {
  success: boolean;
  message: string;
  target: string;
}
