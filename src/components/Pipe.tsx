import React from 'react';

interface PipeProps {
  height: number;
  isTop: boolean;
  position: number;
}

const Pipe: React.FC<PipeProps> = ({ height, isTop, position }) => {
  return (
    <div
      className="absolute w-16 bg-game-pipe"
      style={{
        height: `${height}px`,
        left: `${position}px`,
        top: isTop ? 0 : 'auto',
        bottom: isTop ? 'auto' : 0,
      }}
    >
      <div className="absolute w-20 h-8 bg-game-pipe left-[-8px] bottom-[-8px]" />
    </div>
  );
};

export default Pipe;