import React from 'react';
import { Button } from '@/components/ui/button';

interface GameOverlayProps {
  score: number;
  highScore: number;
  gameOver: boolean;
  onStart: () => void;
}

const GameOverlay: React.FC<GameOverlayProps> = ({ score, highScore, gameOver, onStart }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
      {gameOver ? (
        <>
          <h2 className="text-4xl font-bold text-white mb-4">Game Over!</h2>
          <p className="text-2xl text-white mb-2">Score: {score}</p>
          <p className="text-xl text-white mb-4">High Score: {highScore}</p>
        </>
      ) : (
        <h2 className="text-4xl font-bold text-white mb-4">Flappy Bird</h2>
      )}
      <Button onClick={onStart} className="px-8 py-4 text-xl">
        {gameOver ? 'Play Again' : 'Start Game'}
      </Button>
    </div>
  );
};

export default GameOverlay;