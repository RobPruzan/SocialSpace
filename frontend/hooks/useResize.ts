import { Percentage } from '@/lib/types';
import {
  Dispatch,
  ElementRef,
  RefObject,
  SetStateAction,
  useEffect,
} from 'react';

export const useResize = ({
  containerRef,
  setCanvasDim,
  leftDivSize,
  rightDivSize,
}: {
  containerRef: RefObject<ElementRef<'div'>>;
  setCanvasDim: Dispatch<SetStateAction<[number, number]>>;
  leftDivSize: number | Percentage;
  rightDivSize: number | Percentage;
}) => {
  useEffect(() => {
    function resizeHandler() {
      const container = containerRef?.current;
      if (!container) return;

      setCanvasDim([container.offsetWidth, container.offsetHeight]);
    }

    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [containerRef, setCanvasDim]);

  useEffect(() => {
    if (!containerRef.current) return;

    setCanvasDim([
      containerRef.current.offsetWidth,
      containerRef.current.offsetHeight,
    ]);
  }, [containerRef, leftDivSize, rightDivSize, setCanvasDim]);
};
