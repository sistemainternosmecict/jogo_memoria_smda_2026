import type { CardData } from '../types';
import dog1 from '../assets/smda/1.webp';
import dog2 from '../assets/smda/2.webp';
import dog3 from '../assets/smda/3.webp';
import dog4 from '../assets/smda/4.webp';
import cat5 from '../assets/smda/5.webp';
import cat6 from '../assets/smda/6.webp';
import cat7 from '../assets/smda/7.webp';
import cat8 from '../assets/smda/8.webp';

export const PET_CARDS_DATA: CardData[] = [
  // 1 a 4: Cães
  {
    pairId: 1,
    title: 'Adoção Responsável',
    subtitle: 'Cãozinho Amigo',
    emoji: '🐶❤️',
    color: '#ff4d6d',
    gradient: 'linear-gradient(135deg, #ff4d6d 0%, #ff758f 100%)',
    tip: 'Adotar é um ato de amor! Ao acolher um cãozinho, você ganha um amigo leal e transforma uma vida.',
    image: dog1,
  },
  {
    pairId: 2,
    title: 'Castração Gratuita',
    subtitle: 'Saúde Canina',
    emoji: '✂️🏥',
    color: '#06d6a0',
    gradient: 'linear-gradient(135deg, #06d6a0 0%, #1b9aaa 100%)',
    tip: 'A castração previne doenças graves, tumores e evita o sofrimento de ninhadas indesejadas nas ruas de Saquarema.',
    image: dog2,
  },
  {
    pairId: 3,
    title: 'Vacinação em Dia',
    subtitle: 'Proteção Garantida',
    emoji: '💉🛡️',
    color: '#118ab2',
    gradient: 'linear-gradient(135deg, #118ab2 0%, #0077b6 100%)',
    tip: 'Vacinas salvam vidas! A antirrábica e as polivalentes protegem seu cão contra doenças graves todos os anos.',
    image: dog3,
  },
  {
    pairId: 4,
    title: 'Identificação do Pet',
    subtitle: 'Coleira com Plaquinha',
    emoji: '🏷️🔍',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ffd166 100%)',
    tip: 'Use sempre coleira com plaquinha com nome e telefone! A identificação é a passagem de volta para casa.',
    image: dog4,
  },

  // 5 a 8: Gatos
  {
    pairId: 5,
    title: 'Passeio Seguro & Telas',
    subtitle: 'Gatinho Protegido',
    emoji: '🐱🏠',
    color: '#8338ec',
    gradient: 'linear-gradient(135deg, #8338ec 0%, #a269f8 100%)',
    tip: 'Janelas teladas e passeios seguros salvam gatinhos de quedas, brigas e envenenamentos.',
    image: cat5,
  },
  {
    pairId: 6,
    title: 'Água e Ração',
    subtitle: 'Nutrição Felina',
    emoji: '🥣💧',
    color: '#05c793',
    gradient: 'linear-gradient(135deg, #05c793 0%, #028090 100%)',
    tip: 'Gatos precisam de água fresca e limpa (preferem fontes) e ração de qualidade para proteger seus rins!',
    image: cat6,
  },
  {
    pairId: 7,
    title: 'Não ao Abandono',
    subtitle: 'Guarda para Sempre',
    emoji: '🚫🐾',
    color: '#e63946',
    gradient: 'linear-gradient(135deg, #e63946 0%, #c1121f 100%)',
    tip: 'Abandono é crime federal (Lei 9.605/98)! Animal sente fome, frio e carinho. Seja responsável pela vida inteira dele.',
    image: cat7,
  },
  {
    pairId: 8,
    title: 'Mascote Literário FLIS',
    subtitle: 'Leitura & Carinho',
    emoji: '📖🐱',
    color: '#3a86ff',
    gradient: 'linear-gradient(135deg, #3a86ff 0%, #4361ee 100%)',
    tip: 'Na FLIS Saquarema, a literatura e o amor aos animais caminham juntos para um mundo mais consciente!',
    image: cat8,
  },
];
