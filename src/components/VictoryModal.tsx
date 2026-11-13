import { onMount, onCleanup, createSignal } from 'solid-js';
import { Confetti } from './Confetti';
import { sounds } from '../utils/sound';

interface VictoryModalProps {
  timeSeconds: number;
  moves: number;
  onRestart: () => void;
}

export function VictoryModal(props: VictoryModalProps) {
  const [secondsRemaining, setSecondsRemaining] = createSignal(20);
  let timerId: number;

  onMount(() => {
    sounds.playVictory();

    timerId = window.setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          props.onRestart();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    onCleanup(() => {
      clearInterval(timerId);
    });
  });

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRestart = (e: MouseEvent | PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    sounds.playClick();
    props.onRestart();
  };

  return (
    <div class="victory-overlay" role="dialog" aria-modal="true" aria-label="Vitória!">
      <Confetti />

      <div class="victory-card">
        {/* Celebration Trophy / Ribbon */}
        <div class="trophy-badge">
          <span class="trophy-icon">🏆</span>
        </div>

        <h2 class="victory-title">PARABÉNS!</h2>
        <p class="victory-subtitle">
          Você encontrou todos os pares e se tornou um(a)
          <br />
          <strong class="guardian-title">Guardião Oficial dos Animais de Saquarema! 🐾</strong>
        </p>

        {/* Stats Row */}
        <div class="victory-stats-grid">
          <div class="stat-card">
            <span class="stat-icon">⏱️</span>
            <div class="stat-label">Tempo Total</div>
            <div class="stat-val">{formatTime(props.timeSeconds)}</div>
          </div>

          <div class="stat-card">
            <span class="stat-icon">🎯</span>
            <div class="stat-label">Jogadas</div>
            <div class="stat-val">{props.moves}</div>
          </div>

          <div class="stat-card">
            <span class="stat-icon">🌟</span>
            <div class="stat-label">Pares Salvos</div>
            <div class="stat-val">8 / 8</div>
          </div>
        </div>

        {/* Message */}
        <div class="victory-message-box">
          <p>
            🐾 <em>"Cuidar, amar e respeitar os animais faz a nossa cidade mais bonita e justa para todos!"</em>
          </p>
        </div>

        {/* Action Button (Positioned in reach) */}
        <div class="victory-actions">
          <button
            class="play-again-btn"
            onPointerDown={handleRestart}
            aria-label="Jogar Novamente"
          >
            <span class="btn-icon">🔄</span>
            <span>JOGAR NOVAMENTE</span>
          </button>

          <div class="auto-reset-bar-container">
            <div class="auto-reset-label">
              Reiniciando automaticamente em <strong>{secondsRemaining()}s</strong>...
            </div>
            <div class="auto-reset-track">
              <div
                class="auto-reset-fill"
                style={{
                  width: `${(secondsRemaining() / 20) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
