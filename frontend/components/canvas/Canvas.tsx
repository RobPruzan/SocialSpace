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
import { Percentage, TypedChallenge, ViewObjects } from '@/lib/types';
import {
  Challenge,
  ExploreActions,
  buildInitialChallenge,
} from '@/redux/slices/challengeSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useResize } from '@/hooks/useResize';
import { useWheel } from '@/hooks/useWheel';
import { Geometry, Mouse } from '@/lib/geomotry';

type Props = {
  leftDivSize: number | Percentage;
  rightDivSize: number | Percentage;
  currentChallenge: TypedChallenge | null;
  setCurrentChallenge: React.Dispatch<
    React.SetStateAction<TypedChallenge | null>
  >;
} & ComponentProps<'div'>;

const Canvas = ({
  leftDivSize,
  rightDivSize,
  currentChallenge,
  setCurrentChallenge,
  ...divProps
}: Props) => {
  const canvasRef = useRef<ElementRef<'canvas'>>(null);
  const containerRef = useRef<ElementRef<'div'>>(null);
  const [camera, setCamera] = useState<[number, number]>([0, 0]);
  const [canvasDim, setCanvasDim] = useState<[number, number]>([500, 500]);
  const [mouse, setMouse] = useState<Mouse | null>(null);
  const dispatch = useAppDispatch();
  const challenges = useAppSelector((store) => store.explore.challenges);

  const explore = useAppSelector((store) => store.explore);
  useResize({
    containerRef,
    setCanvasDim,
    leftDivSize,
    rightDivSize,
  });
  useWheel({
    canvasRef,
    setCamera,
    setMouse,
  });

  useEffect(() => {
    const canvas = canvasRef?.current;
    const container = containerRef?.current;
    const ctx = canvas?.getContext('2d');

    // const mouseWorldCord = mouse?.worldCord || [0, 0];

    if (!ctx || !canvas || !container) return;

    Geometry.optimizeCanvas({ canvas, ctx, container });
    ctx.translate(camera[0], camera[1]);

    Geometry.drawBackground({ ctx, canvas, camera });

    const hoveredChallenge = challenges.findLast((challenge) =>
      mouse?.isInRectangle(challenge.cords)
    );

    explore.challenges.forEach((challenge) => {
      const width = challenge.cords.p2[0] - challenge.cords.p1[0];
      const height = challenge.cords.p2[1] - challenge.cords.p1[1];
      ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
      ctx.strokeRect(
        challenge.cords.p1[0],
        challenge.cords.p1[1],
        width,
        height
      );
      if (hoveredChallenge?.id === challenge.id) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fillRect(
          challenge.cords.p1[0],
          challenge.cords.p1[1],
          width,
          height
        );
      }
    });

    ctx.restore();
  }, [camera, canvasDim, challenges, explore.challenges, mouse]);

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
            onClick={(e) => {
              if (!mouse) return;
              const currentChallenge = challenges.find((challenge) =>
                mouse.isInRectangle(challenge.cords)
              );

              if (!currentChallenge) {
                setCurrentChallenge(null);
                return;
              }
              console.log('dsafjds', {
                type: ViewObjects.Challenge,
                id: currentChallenge.id,
              });
              setCurrentChallenge({
                type: ViewObjects.Challenge,
                id: currentChallenge.id,
              });
            }}
            onMouseMove={(event) => {
              if (!canvasRef.current) return;
              setMouse(
                new Mouse(
                  {
                    type: 'event',
                    canvas: canvasRef.current,
                    event,
                  },
                  camera
                )
              );
            }}
          />
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem
            onClick={() => {
              console.log('fds');
              if (!canvasRef.current) return;

              if (!mouse) return;

              const initialChallenge = buildInitialChallenge({
                cords: {
                  p1: mouse.worldCord,
                  p2: [mouse.worldCord[0] + 100, mouse.worldCord[1] + 100],
                },
              });

              dispatch(ExploreActions.addChallenge(initialChallenge));
            }}
            inset
          >
            Create Challenge
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
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
};

export default Canvas;
