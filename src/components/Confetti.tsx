import { onMount, onCleanup } from 'solid-js';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  shape: 'rect' | 'circle' | 'star';
  opacity: number;
}

export function Confetti() {
  let canvasRef: HTMLCanvasElement | undefined;
  let animId: number;

  onMount(() => {
    if (!canvasRef) return;
    const canvas = canvasRef;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = [
      '#ff4d6d',
      '#06d6a0',
      '#118ab2',
      '#ffd166',
      '#8338ec',
      '#ff9e00',
      '#3a86ff',
      '#ff006e',
      '#ffffff',
    ];

    const particles: Particle[] = [];
    const count = 180;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 15 + 8;
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 400,
        y: canvas.height * 0.45 + (Math.random() - 0.5) * 200,
        size: Math.random() * 14 + 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 6,
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 12,
        shape: Math.random() > 0.4 ? 'rect' : Math.random() > 0.5 ? 'circle' : 'star',
        opacity: 1,
      });
    }

    const drawStar = (cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fill();
    };

    let lastTime = performance.now();
    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * 60 * dt;
        p.y += p.vy * 60 * dt;
        p.vy += 22 * dt; // gravity
        p.vx *= 0.99;
        p.rotation += p.vRot * 60 * dt;

        // If particle fell off screen bottom, recycle to top
        if (p.y > canvas.height + 50) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
          p.vy = Math.random() * 3 + 2;
          p.vx = (Math.random() - 0.5) * 4;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
        } else if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          drawStar(0, 0, 5, p.size, p.size / 2);
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    onCleanup(() => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    });
  });

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        'pointer-events': 'none',
        'z-index': '999',
      }}
    />
  );
}
