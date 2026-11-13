import { createSignal, onMount, onCleanup, Show } from 'solid-js';
import { PET_CARDS_DATA } from './data/cardsData';
import type { GameCard, GameState, EducationalBannerInfo } from './types';
import { GameHeader } from './components/GameHeader';
import { CardGrid } from './components/CardGrid';
import { EducationalBanner } from './components/EducationalBanner';
import { AttractMode } from './components/AttractMode';
import { VictoryModal } from './components/VictoryModal';
import { sounds } from './utils/sound';
import './App.css';

export default function App() {
  const [gameState, setGameState] = createSignal<GameState>('attract');
  const [cards, setCards] = createSignal<GameCard[]>([]);
  const [isLocked, setIsLocked] = createSignal<boolean>(false);
  const [firstCard, setFirstCard] = createSignal<GameCard | null>(null);
  const [moves, setMoves] = createSignal<number>(0);
  const [matches, setMatches] = createSignal<number>(0);
  const [timeSeconds, setTimeSeconds] = createSignal<number>(0);
  const [educationalBanner, setEducationalBanner] = createSignal<EducationalBannerInfo | null>(null);

  let gameTimerId: number | undefined;
  let idleTimerId: number | undefined;
  let bannerTimerId: number | undefined;

  // Generate and shuffle 16 cards (8 pairs)
  const initializeCards = (): GameCard[] => {
    const deck: GameCard[] = [];
    let idCounter = 0;

    PET_CARDS_DATA.forEach((cardData) => {
      // 2 cards per theme
      for (let i = 0; i < 2; i++) {
        deck.push({
          ...cardData,
          id: idCounter++,
          isFlipped: false,
          isMatched: false,
        });
      }
    });

    // Fisher-Yates shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }

    return deck;
  };

  // Start a new game
  const startNewGame = () => {
    clearInterval(gameTimerId);
    clearTimeout(bannerTimerId);
    setEducationalBanner(null);

    setCards(initializeCards());
    setFirstCard(null);
    setIsLocked(false);
    setMoves(0);
    setMatches(0);
    setTimeSeconds(0);
    setGameState('playing');

    // Start playing timer
    gameTimerId = window.setInterval(() => {
      setTimeSeconds((prev) => prev + 1);
    }, 1000);

    resetIdleTimer();
  };

  // Stop playing timers
  const stopGameTimers = () => {
    if (gameTimerId) {
      clearInterval(gameTimerId);
      gameTimerId = undefined;
    }
    if (bannerTimerId) {
      clearTimeout(bannerTimerId);
      bannerTimerId = undefined;
    }
  };

  // Reset to Attract Mode
  const goToAttractMode = () => {
    stopGameTimers();
    setEducationalBanner(null);
    setIsLocked(false);
    setFirstCard(null);
    setCards([]);
    setGameState('attract');
  };

  // Attract Mode Idle Timer: 30 seconds of inactivity
  const resetIdleTimer = () => {
    if (idleTimerId) {
      clearTimeout(idleTimerId);
    }

    // Only set idle timeout if user is playing or in victory modal
    idleTimerId = window.setTimeout(() => {
      if (gameState() !== 'attract') {
        goToAttractMode();
      }
    }, 30000); // 30 seconds
  };

  // Global user activity listener to reset idle timeout
  const handleUserActivity = () => {
    resetIdleTimer();
  };

  onMount(() => {
    // Touch & pointer activity listeners
    window.addEventListener('pointerdown', handleUserActivity, { passive: true });
    window.addEventListener('touchstart', handleUserActivity, { passive: true });
    window.addEventListener('contextmenu', (e) => e.preventDefault());

    // Initial setup starts in attract mode
    goToAttractMode();

    onCleanup(() => {
      window.removeEventListener('pointerdown', handleUserActivity);
      window.removeEventListener('touchstart', handleUserActivity);
      stopGameTimers();
      if (idleTimerId) clearTimeout(idleTimerId);
    });
  });

  // Handle Card Tap / Pointerdown
  const handleCardClick = (clickedCard: GameCard) => {
    resetIdleTimer();

    // Rigorous lock: ignore if locked, already flipped, or matched
    if (isLocked() || clickedCard.isFlipped || clickedCard.isMatched) {
      return;
    }

    // Flip the clicked card immediately
    sounds.playFlip();
    setCards((prev) =>
      prev.map((c) => (c.id === clickedCard.id ? { ...c, isFlipped: true } : c))
    );

    const first = firstCard();

    if (!first) {
      // First card flipped in this turn
      setFirstCard(clickedCard);
    } else {
      // Second card flipped: LOCK IMMEDIATELY to prevent multi-touch race conditions
      setIsLocked(true);
      setMoves((m) => m + 1);

      if (first.pairId === clickedCard.pairId) {
        // MATCH!
        sounds.playMatch();

        // Show Educational Tip Banner (non-blocking)
        if (bannerTimerId) clearTimeout(bannerTimerId);
        setEducationalBanner({
          title: clickedCard.title,
          tip: clickedCard.tip,
          emoji: clickedCard.emoji,
          color: clickedCard.color,
          image: clickedCard.image,
        });

        bannerTimerId = window.setTimeout(() => {
          setEducationalBanner(null);
        }, 4000);

        // Update cards to matched after quick visual confirmation
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.pairId === clickedCard.pairId
                ? { ...c, isMatched: true, isFlipped: false }
                : c
            )
          );

          const newMatches = matches() + 1;
          setMatches(newMatches);
          setFirstCard(null);
          setIsLocked(false);

          // Check for Victory (8 pairs = 16 cards)
          if (newMatches >= 8) {
            stopGameTimers();
            setGameState('victory');
          }
        }, 800);
      } else {
        // MISMATCH!
        setTimeout(() => {
          sounds.playMismatch();
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === clickedCard.id
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFirstCard(null);
          setIsLocked(false);
        }, 800); // 800ms strict lock period
      }
    }
  };

  return (
    <div class="totem-app-root">
      {/* Educational Non-blocking Toast at Top/Bottom */}
      <EducationalBanner banner={educationalBanner()} />

      <Show when={gameState() === 'attract'}>
        <AttractMode onStart={startNewGame} />
      </Show>

      <Show when={gameState() === 'playing' || gameState() === 'victory'}>
        <div class="game-stage">
          {/* Header with 5vw logo */}
          <GameHeader
            moves={moves()}
            matches={matches()}
            timeSeconds={timeSeconds()}
            onRestart={startNewGame}
            onHome={goToAttractMode}
          />

          {/* 4x4 Grid (16 Cards) */}
          <CardGrid
            cards={cards()}
            isLocked={isLocked()}
            onCardClick={handleCardClick}
          />
        </div>
      </Show>

      {/* Victory Modal with Confetti & Auto-reset */}
      <Show when={gameState() === 'victory'}>
        <VictoryModal
          timeSeconds={timeSeconds()}
          moves={moves()}
          onRestart={startNewGame}
        />
      </Show>
    </div>
  );
}
