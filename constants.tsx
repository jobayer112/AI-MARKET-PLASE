
import React from 'react';
import { DhikrTask, RewardItem, PrayerTimes } from './types';

export const INITIAL_DHIKR_TASKS: DhikrTask[] = [
  { id: '1', title: 'দূরূদ ইব্রাহিম', arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ', target: 100, count: 0, completed: false, points: 10 },
  { id: '2', title: 'সুবহানআল্লাহ', arabic: 'سُبْحَانَ اللَّهِ', target: 100, count: 0, completed: false, points: 10 },
  { id: '3', title: 'আলহামদুলিল্লাহ', arabic: 'الْحَمْدُ لِلَّهِ', target: 100, count: 0, completed: false, points: 10 },
  { id: '4', title: 'আল্লাহু আকবার', arabic: 'اللَّهُ أَكْبَرُ', target: 100, count: 0, completed: false, points: 10 },
  { id: '5', title: 'আসতাগফিরুল্লাহ', arabic: 'أَسْتَغْفِرُ اللَّهَ', target: 100, count: 0, completed: false, points: 10 },
];

export const REWARDS: RewardItem[] = [
  { id: 'r1', name: 'টুপি (White Premium Kufi)', pointsRequired: 5000, image: 'https://images.unsplash.com/photo-1627731742460-318e8df63810?q=80&w=600&auto=format&fit=crop' },
  { id: 'r2', name: 'পাঞ্জাবি (Elite Designer Panjabi)', pointsRequired: 20000, image: 'https://images.unsplash.com/photo-1597933534024-16492d60bc0c?q=80&w=600&auto=format&fit=crop' },
  { id: 'r3', name: 'কুরআন শরীফ (Luxury Binding)', pointsRequired: 50000, image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600&auto=format&fit=crop' },
  { id: 'r4', name: 'হাদীস বই (Complete Collection)', pointsRequired: 30000, image: 'https://images.unsplash.com/photo-1584281723351-93108c48491c?q=80&w=600&auto=format&fit=crop' },
];

export const INITIAL_PRAYER_TIMES: PrayerTimes = {
  fajr: '04:45 AM',
  dhuhr: '12:15 PM',
  asr: '03:45 PM',
  maghrib: '06:12 PM',
  isha: '07:30 PM',
  sahari: '04:35 AM',
  iftar: '06:12 PM',
};

export const PAYMENT_NUMBERS = {
  bkash: '01832313998',
  nagad: '01317832848'
};
