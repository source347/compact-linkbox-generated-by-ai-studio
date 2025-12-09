export enum LinkCategory {
  PASSIVE_NODES = 'Passive Income (Set & Forget)',
  HOURLY_LOOT = 'Hourly Loot (Pick Games)',
  OG_FAUCETS = 'The Faucet OGs (Proven)',
  MICRO_WORK = 'Micro-Work (PTC & Captcha)',
  AIRDROP_OPS = 'Airdrop Ops (Testnet & Spec)',
  WEB3_GAMING = 'GameFi Arcade',
  QUEST_BOARD = 'Social Quests & XP',
  INFRASTRUCTURE = 'Toolbox (Wallets & Exch)'
}

export interface LinkItem {
  id: string;
  url: string;
  title: string;
  category: LinkCategory;
  tags: string[];
  description?: string;
  recommended?: boolean; // Highlight "Must Do" items
}

export interface CalculatorState {
  dailyEarnings: number;
  days: number;
  compoundingRate: number;
}
