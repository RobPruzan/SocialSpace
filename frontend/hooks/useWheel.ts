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
}: {
  setCamera: Dispatch<SetStateAction<[number, number]>>;
  canvasRef: RefObject<ElementRef<'canvas'>>;
}) => {
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
  }, [canvasRef, setCamera]);
};
