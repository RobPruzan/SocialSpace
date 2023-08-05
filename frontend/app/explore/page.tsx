import Canvas from '@/components/canvas/Canvas';
import Resizable from '@/components/ui/resizeable';
import React from 'react';
import ResizableExplore from './ResizableExplore';

const page = () => {
  return (
    <div className="h-screen w-screen bg-primary flex  items-center justify-evenly">
      {/* <div className="w-[95.7%] h-[15%] border-2 rounded-md border-white">
        hola
      </div>
      <div className="flex w-full h-3/4 items-center justify-evenly">
        <Canvas className="min-w-[60%] max-w-[60%]  min-h-[95%] max-h-[95%] rounded-md" />
        <div className="h-[95%] rounded-md w-1/3  border-2 ">fdsfad</div>
      </div> */}
      {/* 
      <div className="w-3/5 h-[95%] flex flex-col justify-between rounded-md ">
        <div className="h-[8%] w-full border-2 rounded-md "></div>
        <Canvas className="min-w-[100%] max-w-[100%]  min-h-[90%] max-h-[90%] rounded-md" />
      </div>
      <div className="w-2/6 h-[95%] flex flex-col justify-between rounded-md ">
        <div className="h-[8%] w-full border-2 rounded-md "></div>
        <div className="h-[90%] w-full border-2 rounded-md "></div>
      </div> */}
      <ResizableExplore />
    </div>
  );
};

export default page;
