import FlappyBird from '@/components/FlappyBird';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Flappy Bird</h1>
        <FlappyBird />
        <p className="mt-4 text-gray-400">Press SPACE or click/tap to jump!</p>
      </div>
    </div>
  );
};

export default Index;