import { sounds } from '../utils/sound';

interface GameHeaderProps {
  moves: number;
  matches: number;
  timeSeconds: number;
  onRestart: () => void;
  onHome: () => void;
}

export function GameHeader(props: GameHeaderProps) {
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

  const handleHome = (e: MouseEvent | PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    sounds.playClick();
    props.onHome();
  };

  return (
    <header class="game-header">
      {/* Left: Secretaria / Prefeitura Logo */}
      <div class="header-left">
        <img
          src="/logo_edu.png"
          alt="Prefeitura de Saquarema"
          class="header-logo"
          style={{
            width: '8.5vw',
            'min-width': '120px',
            'max-width': '240px',
            height: 'auto',
            'object-fit': 'contain',
            display: 'block',
          }}
        />
        <div class="header-branding">
          <span class="header-tag">FLIS &bull; SAQUAREMA</span>
          <h1 class="header-title">Jogo da Memória dos Animais</h1>
        </div>
      </div>

      {/* Center: Live Stats HUD */}
      <div class="header-hud">
        <div class="hud-item">
          <span class="hud-icon">⏱️</span>
          <div class="hud-meta">
            <span class="hud-label">TEMPO</span>
            <span class="hud-value">{formatTime(props.timeSeconds)}</span>
          </div>
        </div>

        <div class="hud-item">
          <span class="hud-icon">🎯</span>
          <div class="hud-meta">
            <span class="hud-label">JOGADAS</span>
            <span class="hud-value">{props.moves}</span>
          </div>
        </div>

        <div class="hud-item">
          <span class="hud-icon">🐾</span>
          <div class="hud-meta">
            <span class="hud-label">PARES</span>
            <span class="hud-value highlight-pairs">{props.matches} / 8</span>
          </div>
        </div>
      </div>

      {/* Right: Quick Action Controls */}
      <div class="header-actions">
        <button
          class="header-btn btn-restart"
          onPointerDown={handleRestart}
          aria-label="Reiniciar Partida"
          title="Reiniciar jogo"
        >
          <span class="btn-icon">🔄</span>
          <span class="btn-text">REINICIAR</span>
        </button>

        <button
          class="header-btn btn-home"
          onPointerDown={handleHome}
          aria-label="Voltar para a tela inicial"
          title="Tela Inicial"
        >
          <span class="btn-icon">🏠</span>
          <span class="btn-text">INÍCIO</span>
        </button>
      </div>
    </header>
  );
}
