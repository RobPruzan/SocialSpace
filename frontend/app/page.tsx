import Canvas from '@/components/canvas/Canvas';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <div className="w-full h-full">
        <Canvas />
      </div>
    </main>
  );
}
