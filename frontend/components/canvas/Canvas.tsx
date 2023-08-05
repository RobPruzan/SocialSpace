import React, { ElementRef, useEffect, useRef, useState } from 'react';

const Canvas = () => {
  const canvasRef = useRef<ElementRef<'canvas'>>(null);
  const containerRef = useRef<ElementRef<'div'>>(null);
  const [camera, setCamera] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const canvasNode = canvasRef.current;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setCamera((camera) => {
        const factor = 0.2;
        const deltaX = e.deltaX * factor;
        const deltaY = e.deltaY * factor;
        return [camera[0] - deltaX, camera[1] - deltaY];
      });
    };

    canvasNode?.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      canvasNode?.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext('2d');

    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(camera[0], camera[1]);
    const bounds = {
      left: -camera[0],
      top: -camera[1],
      right: -camera[0] + canvas.width,
      bottom: -camera[1] + canvas.height,
    };
    const gridSize = 50;
    bounds.left = Math.floor(bounds.left / gridSize) * gridSize;
    bounds.top = Math.floor(bounds.top / gridSize) * gridSize;
    bounds.right = Math.ceil(bounds.right / gridSize) * gridSize;
    bounds.bottom = Math.ceil(bounds.bottom / gridSize) * gridSize;

    for (let x = bounds.left; x <= bounds.right; x += gridSize) {
      for (let y = bounds.top; y <= bounds.bottom; y += gridSize) {
        ctx.strokeStyle = '#ccc';
        ctx.lineJoin = 'miter';
        ctx.lineWidth = 0.1;
        ctx.strokeRect(x, y, gridSize, gridSize);
      }
    }

    ctx.restore();
  }, [camera]);

  return (
    <div
      ref={containerRef}
      className="w-full h-1/2 border border-primary rounded-lg"
    >
      <canvas
        width={containerRef.current?.offsetWidth ?? 500}
        height={containerRef.current?.offsetHeight ?? 500}
        ref={canvasRef}
      />
    </div>
  );
};

export default Canvas;
