import { useEffect, useState } from "react";

interface ConfettiProps {
  onComplete: () => void;
}

const Confetti = ({ onComplete }: ConfettiProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number; color: string }>>([]);

  useEffect(() => {
    const colors = ["hsl(270 70% 50%)", "hsl(180 70% 45%)", "hsl(270 80% 65%)", "hsl(180 80% 60%)"];
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    
    setParticles(newParticles);

    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute top-0 w-2 h-2 rounded-full animate-confetti"
          style={{
            left: `${particle.left}%`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            animation: "confetti 2s ease-out forwards",
          }}
        />
      ))}
      <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-confetti {
            animation: none;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Confetti;
