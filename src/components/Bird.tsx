import React from 'react';

interface BirdProps {
  position: number;
  rotation: number;
}

const Bird: React.FC<BirdProps> = ({ position, rotation }) => {
  return (
    <div
      className="absolute w-8 h-8 bg-game-bird rounded-full"
      style={{
        top: `${position}px`,
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.1s ease-in-out',
      }}
    >
      <div className="absolute w-2 h-2 bg-white rounded-full top-1 left-5" /> {/* Eye */}
      <div className="absolute w-4 h-2 bg-orange-500 top-3 left-6 rounded-full" /> {/* Beak */}
    </div>
  );
};

export default Bird;