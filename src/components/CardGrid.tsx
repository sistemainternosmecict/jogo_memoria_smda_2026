import { For } from 'solid-js';
import type { GameCard } from '../types';
import { CardView } from './CardView';

interface CardGridProps {
  cards: GameCard[];
  isLocked: boolean;
  onCardClick: (card: GameCard) => void;
}

export function CardGrid(props: CardGridProps) {
  return (
    <main class="memory-grid-container" aria-label="Tabuleiro do Jogo da Memória">
      <div class="memory-grid-4x4">
        <For each={props.cards}>
          {(card) => (
            <CardView
              card={card}
              isLocked={props.isLocked}
              onSelect={props.onCardClick}
            />
          )}
        </For>
      </div>
    </main>
  );
}
