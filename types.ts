
export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  referralCode: string;
  referredBy?: string;
  joinedDate: string;
  profilePicture?: string;
  notificationSettings: {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
  };
}

export interface DhikrTask {
  id: string;
  title: string;
  arabic: string;
  target: number;
  count: number;
  completed: boolean;
  points: number;
}

export interface RewardItem {
  id: string;
  name: string;
  pointsRequired: number;
  image: string;
}

export interface AdTask {
  id: string;
  url: string;
  rewardPoints: number;
  visited: boolean;
}

export interface Dua {
  id: string;
  title: string;
  arabic: string;
  pronunciation: string;
  meaning: string;
}

export interface Gojol {
  id: string;
  title: string;
  lyrics: string;
}

export type AppView = 'home' | 'tasks' | 'quran' | 'store' | 'ads' | 'profile' | 'donate' | 'admin' | 'duas';

export interface PrayerTimes {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  sahari: string;
  iftar: string;
}
