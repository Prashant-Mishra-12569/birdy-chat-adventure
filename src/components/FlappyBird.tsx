import React, { useState, useEffect, useCallback } from 'react';
import Bird from './Bird';
import Pipe from './Pipe';
import GameOverlay from './GameOverlay';
import { useToast } from '@/components/ui/use-toast';

const GRAVITY = 0.5;
const JUMP_FORCE = -10;
const PIPE_SPEED = 2;
const PIPE_SPAWN_RATE = 2000;
const GAP_SIZE = 150;

const FlappyBird = () => {
  const [birdPos, setBirdPos] = useState(250);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [birdRotation, setBirdRotation] = useState(0);
  const [pipes, setPipes] = useState<Array<{ x: number; height: number }>>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const { toast } = useToast();

  const jump = useCallback(() => {
    if (!gameStarted || gameOver) return;
    setBirdVelocity(JUMP_FORCE);
    setBirdRotation(-30);
  }, [gameStarted, gameOver]);

  const startGame = () => {
    setBirdPos(250);
    setBirdVelocity(0);
    setBirdRotation(0);
    setPipes([]);
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [jump]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      setBirdPos((pos) => {
        const newPos = pos + birdVelocity;
        if (newPos < 0 || newPos > 500) {
          setGameOver(true);
          return pos;
        }
        return newPos;
      });

      setBirdVelocity((vel) => vel + GRAVITY);
      setBirdRotation((rot) => Math.min(rot + 3, 90));

      setPipes((currentPipes) => {
        return currentPipes
          .map((pipe) => ({
            ...pipe,
            x: pipe.x - PIPE_SPEED,
          }))
          .filter((pipe) => pipe.x > -100);
      });
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, birdVelocity]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const spawnPipe = setInterval(() => {
      const height = Math.random() * (400 - GAP_SIZE);
      setPipes((currentPipes) => [...currentPipes, { x: 400, height }]);
      setScore((s) => s + 1);
    }, PIPE_SPAWN_RATE);

    return () => clearInterval(spawnPipe);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (gameOver && score > highScore) {
      setHighScore(score);
      toast({
        title: "New High Score!",
        description: `You scored ${score} points!`,
      });
    }
  }, [gameOver, score, highScore, toast]);

  return (
    <div 
      className="relative w-[400px] h-[500px] bg-game-sky overflow-hidden cursor-pointer"
      onClick={jump}
    >
      <Bird position={birdPos} rotation={birdRotation} />
      
      {pipes.map((pipe, i) => (
        <React.Fragment key={i}>
          <Pipe height={pipe.height} isTop position={pipe.x} />
          <Pipe
            height={500 - pipe.height - GAP_SIZE}
            isTop={false}
            position={pipe.x}
          />
        </React.Fragment>
      ))}

      <div className="absolute top-4 left-4 text-2xl font-bold text-white">
        Score: {score}
      </div>

      {(!gameStarted || gameOver) && (
        <GameOverlay
          score={score}
          highScore={highScore}
          gameOver={gameOver}
          onStart={startGame}
        />
      )}
    </div>
  );
};

export default FlappyBird;