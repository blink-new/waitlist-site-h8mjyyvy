
export interface WaitlistUser {
  email: string;
  position: number;
  referralCode: string;
  referredBy?: string;
  referralCount: number;
  joinedAt: number;
}