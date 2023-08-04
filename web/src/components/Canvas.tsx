import { Geometry } from '@/lib/geomotry';
import React, { ElementRef, useEffect, useRef, useState } from 'react';

const Canvas = () => {
  const canvasRef = useRef<ElementRef<'canvas'>>(null);
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
    Geometry.translateContext(ctx, camera);
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

    // Draw the grid.
    for (let x = bounds.left; x <= bounds.right; x += gridSize) {
      for (let y = bounds.top; y <= bounds.bottom; y += gridSize) {
        // // change opacity
        // ctx.lineWidth = 0.05;
        // // change line size

        ctx.strokeStyle = '#ccc';
        // ctx.shadowColor = '#d53';
        // ctx.shadowBlur = 20;
        ctx.lineJoin = 'miter';
        ctx.lineWidth = 0.1;
        // ctx.strokeStyle = '#38f';
        ctx.strokeRect(x, y, gridSize, gridSize);
      }
    }

    ctx.restore();
  }, [camera]);
  return <canvas width={500} height={500} ref={canvasRef}></canvas>;
};

export default Canvas;
