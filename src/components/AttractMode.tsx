import { onMount, onCleanup, createSignal } from 'solid-js';
import { sounds } from '../utils/sound';
import dog1 from '../assets/smda/1.webp';
import cat8 from '../assets/smda/8.webp';
import dog3 from '../assets/smda/3.webp';

interface AttractModeProps {
  onStart: () => void;
}

export function AttractMode(props: AttractModeProps) {
  const [pulse, setPulse] = createSignal(false);
  let intervalId: number;

  onMount(() => {
    intervalId = window.setInterval(() => {
      setPulse((prev) => !prev);
    }, 1200);

    onCleanup(() => {
      clearInterval(intervalId);
    });
  });

  const handleStart = (e: MouseEvent | PointerEvent | TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    sounds.playClick();
    props.onStart();
  };

  return (
    <div
      class="attract-screen"
      onPointerDown={handleStart}
      role="button"
      tabIndex={0}
      aria-label="Tela de início - Toque para jogar"
    >
      {/* Decorative background ambient elements */}
      <div class="attract-bg-decorations">
        <div class="decor-bubble decor-1">🐶</div>
        <div class="decor-bubble decor-2">🐱</div>
        <div class="decor-bubble decor-3">📖</div>
        <div class="decor-bubble decor-4">🐾</div>
        <div class="decor-bubble decor-5">❤️</div>
        <div class="decor-bubble decor-6">✨</div>
      </div>

      {/* Top Section */}
      <header class="attract-header">
        <img
          src="/logo_edu.png"
          alt="Prefeitura de Saquarema - Educação"
          class="attract-logo"
        />
        <div class="attract-title-block">
          <span class="attract-badge">FLIS &bull; SAQUAREMA</span>
          <h1 class="attract-main-title">Jogo da Memória dos Animais</h1>
          <p class="attract-subtitle">
            Secretaria Municipal dos Direitos dos Animais de Saquarema (SMDA)
          </p>
        </div>
      </header>

      {/* Middle Visual Section */}
      <section class="attract-center">
        <div class="mascot-card-display">
          <div class="preview-card card-preview-left">
            <img src={dog1} alt="Adoção - Cãozinho" class="preview-img" />
            <span class="preview-name">Adoção</span>
          </div>
          <div class="preview-card card-preview-center">
            <img src={cat8} alt="Mascote FLIS - Gatinho" class="preview-img" />
            <span class="preview-name">Mascote FLIS</span>
          </div>
          <div class="preview-card card-preview-right">
            <img src={dog3} alt="Vacinação - Cãozinho" class="preview-img" />
            <span class="preview-name">Vacinação</span>
          </div>
        </div>

        <div class="attract-invite-banner">
          <p class="invite-text">
            Encontre os 8 pares de cartas e descubra como proteger nossos cães e gatos!
          </p>
        </div>
      </section>

      {/* Lower Half of Screen: Specially lowered for children's height reach */}
      <div class="attract-lower-zone">
        <div class="reach-guide">
          <span class="hand-wave">👇</span> Toque em qualquer lugar ou no botão abaixo para começar!
        </div>

        <button
          class={`giant-play-button ${pulse() ? 'pulse-active' : ''}`}
          onPointerDown={handleStart}
          aria-label="Toque para Jogar"
        >
          <div class="button-glow-effect" />
          <span class="btn-icon">🐾</span>
          <span class="btn-text">TOQUE PARA JOGAR</span>
          <span class="btn-icon">📖</span>
        </button>

        <div class="attract-footer-info">
          <span>Totem Interativo 72" &bull; Tela Multi-toque</span>
        </div>
      </div>
    </div>
  );
}
