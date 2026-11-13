import type { GameCard } from '../types';

interface CardViewProps {
  card: GameCard;
  isLocked: boolean;
  onSelect: (card: GameCard) => void;
}

export function CardView(props: CardViewProps) {
  const isRevealed = () => props.card.isFlipped || props.card.isMatched;

  const handlePointerDown = (e: PointerEvent) => {
    // Prevent default touch behaviors and ghost mouse events
    e.preventDefault();
    e.stopPropagation();

    // Rigorous lock and state checks
    if (props.isLocked || props.card.isFlipped || props.card.isMatched) {
      return;
    }

    props.onSelect(props.card);
  };

  return (
    <div
      class={`memory-card-wrapper ${props.card.isMatched ? 'is-matched' : ''} ${
        isRevealed() ? 'is-flipped' : ''
      }`}
      onPointerDown={handlePointerDown}
      role="button"
      tabIndex={0}
      aria-label={
        isRevealed()
          ? `${props.card.title} - ${props.card.subtitle}`
          : 'Carta virada para baixo'
      }
      aria-disabled={props.isLocked || isRevealed()}
    >
      <div class="card-inner">
        {/* CARD BACK (Hidden Face - What players see when facedown) */}
        <div class="card-face card-face-down">
          <div class="card-back-pattern">
            <div class="card-back-center-icon">
              <span class="paws-icon">🐾</span>
              <span class="book-icon">📖</span>
            </div>
            <span class="card-back-label">SMDA</span>
          </div>
          <div class="card-corner corner-tl">🐾</div>
          <div class="card-corner corner-br">🐾</div>
        </div>

        {/* CARD FRONT (Revealed Face) */}
        <div
          class="card-face card-face-up"
          style={{
            background: props.card.gradient,
            'border-color': props.card.color,
          }}
        >
          <div class="card-front-content">
            {/* Visual placeholder: Large emoji or image */}
            <div class="card-visual-container">
              {props.card.image ? (
                <img
                  src={props.card.image}
                  alt={props.card.title}
                  class="card-custom-image"
                />
              ) : (
                <span class="card-big-emoji">{props.card.emoji}</span>
              )}
            </div>

            <div class="card-info-badge">
              <span class="card-theme-title">{props.card.title}</span>
              <span class="card-theme-subtitle">{props.card.subtitle}</span>
            </div>

            {props.card.isMatched && (
              <div class="match-stamp">
                <span class="check-icon">✓</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
