export interface CardData {
  pairId: number;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  gradient: string;
  tip: string;
  image?: string;
}

export interface GameCard extends CardData {
  id: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export type GameState = 'attract' | 'playing' | 'victory';

export interface EducationalBannerInfo {
  title: string;
  tip: string;
  emoji: string;
  color: string;
  image?: string;
}
