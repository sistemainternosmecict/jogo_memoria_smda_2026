# Jogo da Memória dos Animais - SMDA Saquarema (FLIS)

Aplicação interativa desenvolvida em **SolidJS**, **TypeScript** e **Vite**, projetada e otimizada sob medida para telas touch gigantes de 72 polegadas (**Samsung Flip 4K**) da **Secretaria Municipal dos Direitos dos Animais de Saquarema (SMDA)** para a **Festa Literária de Saquarema (FLIS)**.

---

## 🎯 Destaques e Funcionalidades

1. **Tabuleiro 4x4 com Cartas Oficiais (16 Cartas / 8 Pares)**:
   - **Cartas 1 a 4 (Cães)**: Adoção Responsável, Castração Gratuita, Vacinação em Dia e Identificação do Pet.
   - **Cartas 5 a 8 (Gatos)**: Passeio Seguro & Janelas Teladas, Água e Ração Balanceada, Não ao Abandono e Mascote Literário FLIS.
   - Imagens em formato WebP de alta performance em `src/assets/smda/`.
   - Verso temático personalizado com texturas táteis e identidade visual da SMDA.

2. **Trava Rigorosa de Multi-Toque (`isLocked`)**:
   - Tratamento ultra-rápido via eventos nativos `pointerdown` (sem o atraso de 300ms característico de eventos `click`/touch em totems).
   - Trava síncrona: ao virar 2 cartas, qualquer outro toque em qualquer parte do tabuleiro é completamente bloqueado durante o período de conferência (800ms).

3. **CSS Global Blindado para Totem Touch (Totem Shield)**:
   - `touch-action: none`, `user-select: none` e `-webkit-touch-callout: none`.
   - Sem barras de rolagem (`overflow: hidden; 100vw; 100dvh`).
   - Bloqueio completo de zoom por pinça, duplo toque, arrasto de elementos e menu de contexto de toque longo (`contextmenu`).

4. **Toasts Educativos de Guarda Responsável**:
   - Ao acertar um par, surge um banner ilustrado com a foto do pet e uma dica educativa de conscientização.
   - Configurado com `pointer-events: none` (totalmente **não bloqueante**), permitindo que os participantes continuem jogando sem esperar o banner sumir.

5. **Attract Mode (Tela de Descanso)**:
   - Temporizador de inatividade de **30 segundos**: se ninguém interagir, o jogo retorna à tela inicial de atração.
   - Botão gigante e pulsante **"TOQUE PARA JOGAR"** posicionado estrategicamente na **metade inferior da tela**, garantindo alcance físico para crianças pequenas em telas de 72 polegadas.

6. **Tela de Vitória Comemorativa**:
   - Efeito visual de confetes festivos com partículas em `<canvas>` rodando a 60 FPS.
   - Placar com tempo total, quantidade de tentativas e certificado de *"Guardião Oficial dos Animais de Saquarema"*.
   - Botão "JOGAR NOVAMENTE" e reset automático após contagem regressiva de 20 segundos.

7. **Efeitos Sonoros Nativos (Web Audio API)**:
   - Sons sintetizados em tempo real (virar carta, acerto com acorde maior, erro suave, clique de botão e fanfarra de vitória).
   - Funciona 100% offline, sem dependência de carregamento de arquivos de áudio externos.

8. **Identidade Visual e Logo Proporcional**:
   - Logo oficial da Prefeitura e Secretaria no topo ajustado para destaque perfeito em telas grandes de alta resolução.

---

## 🛠️ Tecnologias Utilizadas

- **[SolidJS](https://www.solidjs.com/)** (v1.9+) – Reatividade granular com máxima performance e baixo consumo de memória.
- **[TypeScript](https://www.typescriptlang.org/)** – Tipagem estrita com `verbatimModuleSyntax`.
- **[Vite](https://vite.dev/)** – Bundler rápido e otimizado.
- **Web Audio API** – Efeitos sonoros procedurais nativos.
- **HTML5 Canvas** – Sistema de partículas para celebração de vitória.

---

## 📋 Pré-requisitos

- **Node.js**: versão 18.x, 20.x ou superior (testado com Node v22).
- Gerenciador de pacotes: `npm`, `pnpm` ou `bun`.

---

## 🚀 Como Executar o Projeto

### 1. Clonar o repositório
```bash
git clone git@github.com:sistemainternosmecict/jogo_memoria_smda_2026.git
cd jogo_memoria_smda_2026
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Rodar em ambiente de desenvolvimento
```bash
npm run dev
```
O servidor Vite será iniciado em `http://localhost:5173`.

### 4. Gerar build de produção
```bash
npm run build
```
Os arquivos otimizados e minificados serão gerados no diretório `dist/`.

### 5. Pré-visualizar o build de produção localmente
```bash
npm run preview
```

---

## 🖥️ Configuração Recomendada para Totem / Totem Kiosk (Samsung Flip 4K)

Para rodar em modo Kiosk em tela cheia no Chromium / Google Chrome em totens públicos:

```bash
google-chrome \
  --kiosk \
  --touch-events=enabled \
  --no-first-run \
  --fast \
  --fast-start \
  --disable-pinch \
  --overscroll-history-navigation=0 \
  --disable-context-menu \
  --disable-features=Translate \
  --autoplay-policy=no-user-gesture-required \
  http://localhost:5173
```

---

## 📁 Estrutura do Projeto

```
jogo-memoria-smda-2026/
├── logo_edu.png               # Logo oficial da Secretaria / Educação
├── public/
│   ├── favicon.svg
│   └── logo_edu.png
├── src/
│   ├── assets/
│   │   └── smda/              # Imagens oficiais dos pets
│   │       ├── 1.webp a 4.webp (Cães)
│   │       └── 5.webp a 8.webp (Gatos)
│   ├── components/
│   │   ├── AttractMode.tsx    # Tela de descanso com botão no alcance infantil
│   │   ├── CardGrid.tsx       # Tabuleiro 4x4
│   │   ├── CardView.tsx       # Componente individual de carta com flip 3D
│   │   ├── Confetti.tsx       # Efeito de confetes via Canvas 60 FPS
│   │   ├── EducationalBanner.tsx # Toast de dicas de guarda responsável
│   │   ├── GameHeader.tsx     # Cabeçalho com logo, tempo, jogadas e pares
│   │   └── VictoryModal.tsx   # Modal de vitória com placar e auto-reset
│   ├── data/
│   │   └── cardsData.ts       # Configuração dos 8 pares e dicas educativas
│   ├── utils/
│   │   └── sound.ts           # Sintetizador de áudio Web Audio API
│   ├── App.css                # Estilização completa e responsiva para totem 4K
│   ├── App.tsx                # Lógica central do jogo e temporizadores
│   ├── index.css              # Blindagem global contra toques/gestos indesejados
│   ├── index.tsx              # Ponto de entrada SolidJS
│   └── types.ts               # Definições de tipos TypeScript
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🏛️ Créditos e Realização

- **Secretaria Municipal dos Direitos dos Animais de Saquarema (SMDA)**
- **Prefeitura Municipal de Saquarema**
- **FLIS - Festa Literária de Saquarema 2026**
