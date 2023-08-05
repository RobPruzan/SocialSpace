'use client';
import Canvas from '@/components/canvas/Canvas';
import Resizable from '@/components/ui/resizeable';
import { Percentage } from '@/lib/types';
import React from 'react';

type Props = {};

const ResizableExplore = (props: Props) => {
  const [socialSize, setSocialSize] = React.useState<number | Percentage>(
    '80%'
  );
  const [canvasSize, setCanvasSize] = React.useState<number | Percentage>(
    '20%'
  );
  return (
    // <Resizable
    //   canvasSize={canvasSize}
    //   setCanvasSize={setCanvasSize}
    //   socialSize={socialSize}
    //   setSocialSize={setSocialSize}
    //   type="horizontal"
    //   // leftDiv={
    //   //   <>
    //   //     <div className="flex w-full flex-col h-full border-2 items-center justify-start">
    //   //       {/* <div className="h-[8%] w-full border-2 rounded-md "></div> */}
    //   //       {/* <Canvas className="min-w-[100%] max-w-[100%]  min-h-[90%] max-h-[90%] rounded-md" /> */}
    //   //     </div>
    //   //   </>
    //   // }
    //   leftDiv={
    //     <div className="flex w-full flex-col h-full border-2 items-center justify-start"></div>
    //   }
    //   rightDiv={
    //     <>
    // <div className="h-[8%] w-full border-2 rounded-md "></div>
    // <div className="h-[90%] w-full border-2 rounded-md "></div>
    //     </>
    //   }
    // />
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
              leftDivSize={canvasSize}
              rightDivSize={socialSize}
              className="min-w-[100%] max-w-[100%]  min-h-[98%] max-h-[98%] "
            />
          </div>
        }
        rightDiv={
          <div className="w-full h-full ">
            <div className="h-[8%] w-full border-2 border-b-0  "></div>
            <div className="h-[90%] w-full border-2  "></div>
          </div>
        }
      />
    </div>
  );
};

{
  /* <Resizable
canvasSize={canvasSize}
setCanvasSize={setCanvasSize}
socialSize={socialSize}
setSocialSize={setSocialSize}
type="horizontal"
leftDiv={
  <div className="flex w-full flex-col h-full border-2 items-center justify-start"></div>
}
rightDiv={<div className="w-full h-full border-2 border-secondary"></div>}
/> */
}

export default ResizableExplore;
