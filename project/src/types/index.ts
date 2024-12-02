export interface Capsule {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  unlockDate: Date;
  isPrivate: boolean;
  owner: string;
  views?: number;
  groupId?: string;
}

export interface User {
  address: string;
  name: string;
  capsules: Capsule[];
  points: number;
  pin: string;
  groups: string[];
}

export interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  price: number;
  capsuleCount: number;
}