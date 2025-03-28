
import { WaitlistUser } from '../types';

const STORAGE_KEY = 'waitlist_data';
const EMAIL_KEY = 'waitlist_email';

export function generateReferralCode(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export function getWaitlistData(): WaitlistUser[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveWaitlistData(users: WaitlistUser[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function getCurrentUser(): WaitlistUser | null {
  const email = localStorage.getItem(EMAIL_KEY);
  if (!email) return null;
  
  const users = getWaitlistData();
  return users.find(u => u.email === email) || null;
}

export function findUserByReferralCode(code: string): WaitlistUser | null {
  const users = getWaitlistData();
  return users.find(u => u.referralCode === code) || null;
}

export function addToWaitlist(email: string, referralCode?: string): WaitlistUser {
  const users = getWaitlistData();
  
  // Check if email already exists
  if (users.some(u => u.email === email)) {
    throw new Error('Email already registered');
  }

  // Find referrer and update their stats
  let position = users.length + 1;
  if (referralCode) {
    const referrer = findUserByReferralCode(referralCode);
    if (referrer) {
      // Update referrer's count and position
      const referrerIndex = users.findIndex(u => u.email === referrer.email);
      if (referrerIndex !== -1) {
        users[referrerIndex] = {
          ...referrer,
          referralCount: referrer.referralCount + 1,
          position: Math.max(1, referrer.position - 1)
        };
        
        // Adjust positions of users between old and new position
        if (referrer.position > 1) {
          users.forEach(user => {
            if (user.position === referrer.position - 1) {
              user.position = referrer.position;
            }
          });
        }
      }
    }
  }

  // Create new user
  const newUser: WaitlistUser = {
    email,
    position,
    referralCode: generateReferralCode(),
    referredBy: referralCode,
    referralCount: 0,
    joinedAt: Date.now()
  };

  users.push(newUser);
  saveWaitlistData(users);
  localStorage.setItem(EMAIL_KEY, email);

  return newUser;
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}