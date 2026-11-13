import { Show } from 'solid-js';
import type { EducationalBannerInfo } from '../types';

interface EducationalBannerProps {
  banner: EducationalBannerInfo | null;
}

export function EducationalBanner(props: EducationalBannerProps) {
  return (
    <Show when={props.banner}>
      {(info) => (
        <aside
          role="status"
          aria-live="polite"
          class="educational-toast"
          style={{
            '--accent-color': info().color,
          }}
        >
          <div class="toast-inner">
            <div class="toast-icon-box">
              {info().image ? (
                <img src={info().image} alt={info().title} class="toast-img" />
              ) : (
                <span class="toast-emoji">{info().emoji}</span>
              )}
            </div>
            <div class="toast-content">
              <div class="toast-badge">
                <span class="badge-dot"></span>
                DICA DE GUARDA RESPONSÁVEL
              </div>
              <h3 class="toast-title">{info().title}</h3>
              <p class="toast-tip">{info().tip}</p>
            </div>
          </div>
          <div class="toast-progress-bar" />
        </aside>
      )}
    </Show>
  );
}
