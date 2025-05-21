import confetti from 'canvas-confetti';

export const fireConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#FF6601', '#FFC107', '#2196F3']
  });
}; 