import { Mouse } from '@/lib/geomotry';
import {
  Dispatch,
  ElementRef,
  RefObject,
  SetStateAction,
  useEffect,
} from 'react';

export const useWheel = ({
  setCamera,
  canvasRef,
  setMouse,
}: {
  setCamera: Dispatch<SetStateAction<[number, number]>>;
  canvasRef: RefObject<ElementRef<'canvas'>>;
  setMouse: React.Dispatch<React.SetStateAction<Mouse | null>>;
}) => {
  useEffect(() => {
    const canvasNode = canvasRef.current;
    if (!canvasNode) return;
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      setCamera((camera) => {
        const factor = 0.2;
        const deltaX = event.deltaX * factor;
        const deltaY = event.deltaY * factor;

        const newCameraX = camera[0] - deltaX;
        const newCameraY = camera[1] - deltaY;
        const newMouse = new Mouse(
          { type: 'event', event, canvas: canvasNode },
          camera
        );

        setMouse(newMouse);

        return [newCameraX, newCameraY];
      });
    };

    canvasNode?.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      canvasNode?.removeEventListener('wheel', handleWheel);
    };
  }, [canvasRef, setCamera, setMouse]);
};
