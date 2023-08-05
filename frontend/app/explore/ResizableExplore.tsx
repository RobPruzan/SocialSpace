'use client';
import Canvas from '@/components/canvas/Canvas';
import Social from '@/components/social/Social';
import Resizable from '@/components/ui/resizeable';
import { Percentage, TypedChallenge } from '@/lib/types';
import React, { useState } from 'react';

type Props = {};

const ResizableExplore = (props: Props) => {
  const [canvasSize, setCanvasSize] = React.useState<number | Percentage>(
    '70%'
  );
  const [socialSize, setSocialSize] = React.useState<number | Percentage>(
    '30%'
  );

  const [currentChallenge, setCurrentChallenge] =
    useState<TypedChallenge | null>(null);

  return (
    <div className="h-[95%] w-[95%] flex justify-evenly items-center">
      <Resizable
        canvasSize={canvasSize}
        setCanvasSize={setCanvasSize}
        socialSize={socialSize}
        setSocialSize={setSocialSize}
        type="horizontal"
        leftDiv={
          <div className="flex w-full flex-col h-full  items-center justify-start">
            <Canvas
              currentChallenge={currentChallenge}
              setCurrentChallenge={setCurrentChallenge}
              leftDivSize={canvasSize}
              rightDivSize={socialSize}
              className="min-w-[100%] max-w-[100%]  min-h-[98%] max-h-[98%] "
            />
          </div>
        }
        rightDiv={<Social currentChallenge={currentChallenge} />}
      />
    </div>
  );
};

export default ResizableExplore;
