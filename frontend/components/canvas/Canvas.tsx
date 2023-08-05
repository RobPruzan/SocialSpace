'use client';
import React, {
  ComponentProps,
  ElementRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { twMerge } from 'tailwind-merge';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Percentage } from '@/lib/types';

type Props = {
  leftDivSize: number | Percentage;
  rightDivSize: number | Percentage;
} & ComponentProps<'div'>;

const Canvas = ({ leftDivSize, rightDivSize, ...divProps }: Props) => {
  const canvasRef = useRef<ElementRef<'canvas'>>(null);
  const containerRef = useRef<ElementRef<'div'>>(null);
  const [camera, setCamera] = useState<[number, number]>([0, 0]);
  const [canvasDim, setCanvasDim] = useState<[number, number]>([500, 500]);

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
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    setCanvasDim([
      containerRef.current.offsetWidth,
      containerRef.current.offsetHeight,
    ]);
  }, [containerRef, leftDivSize, rightDivSize]);

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
    const container = containerRef?.current;
    const ctx = canvas?.getContext('2d');

    if (!ctx || !canvas || !container) return;
    // ctx.save();
    const dpr = window.devicePixelRatio;
    const rect = container.getBoundingClientRect();

    // Set the "actual" size of the canvas
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Scale the context to ensure correct drawing operations
    ctx.scale(dpr, dpr);

    // // Translate the origin to the camera position

    // Set the "drawn" size of the canvas
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // // Clear the canvas, taking into account the new origin
    // ctx.clearRect(-camera[0], -camera[1], rect.width, rect.height);
    // ctx.restore();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(camera[0], camera[1]);

    // ctx.translate(camera[0], camera[1]);
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
        // light gray, lighter than ccc
        ctx.strokeStyle = '#eee';
        ctx.lineJoin = 'miter';
        ctx.lineWidth = 0.6;
        // ctx.strokeRect(x, y, gridSize, gridSize);
        // circle
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, 2 * Math.PI);
        ctx.fillStyle = '#ccc';
        ctx.stroke();
      }
    }

    ctx.restore();
  }, [camera, canvasDim]);

  return (
    <div
      ref={containerRef}
      className={twMerge(
        'min-w-[50%] max-w-[50%] min-h-[50%] max-h-[50%] border-2',
        divProps.className
      )}
    >
      <ContextMenu>
        <ContextMenuTrigger>
          <canvas
            className="overflow-hidden"
            width={canvasDim[0]}
            height={canvasDim[1]}
            ref={canvasRef}
          />
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset disabled>
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                Save Page As...
                <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>Create Shortcut...</ContextMenuItem>
              <ContextMenuItem>Name Window...</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Developer Tools</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked>
            Show Bookmarks Bar
            <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup value="pedro">
            <ContextMenuLabel inset>People</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuRadioItem value="pedro">
              Pedro Duarte
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
};

export default Canvas;
