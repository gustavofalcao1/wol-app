export interface Computer {
  id: string;
  name: string;
  mac: string;
  ip: string;
  description?: string;
  groupId?: string;
}

export interface ComputerGroup {
  id: string;
  name: string;
  description?: string;
  computerIds: string[];
}
