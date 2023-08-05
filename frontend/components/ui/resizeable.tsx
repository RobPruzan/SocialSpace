'use client';
import { Percentage } from '@/lib/types';
import React, { useEffect, useRef, useState } from 'react';
import { match } from 'ts-pattern';

type Props = (
  | {
      type: 'horizontal';
      leftDiv: React.ReactNode;
      rightDiv: React.ReactNode;
    }
  | {
      type: 'vertical';
      topDiv: React.ReactNode;
      bottomDiv: React.ReactNode;
    }
) & {
  canvasSize: Percentage | number;
  setCanvasSize: React.Dispatch<React.SetStateAction<Percentage | number>>;
  socialSize: Percentage | number;
  setSocialSize: React.Dispatch<React.SetStateAction<Percentage | number>>;
};
const Resizable = (props: Props) => {
  const [resizing, setResizing] = useState(false);
  const parentDivRef = useRef<HTMLDivElement | null>(null);
  const padding = 25;
  const resizeBarSize = 12;

  useEffect(() => {
    const mouseMoveHandler = (e: any) => {
      if (!resizing) return;

      const parentDiv = parentDivRef.current;
      if (!parentDiv) return;
      match(props)
        .with({ type: 'horizontal' }, (props) => {
          let newDiv1Width = e.clientX - parentDiv.offsetLeft; // subtract left padding

          newDiv1Width = Math.max(0, newDiv1Width);
          newDiv1Width = Math.min(parentDiv.offsetWidth, newDiv1Width);

          const newDiv2Width = parentDiv.offsetWidth - newDiv1Width;

          props.setCanvasSize(newDiv1Width - resizeBarSize / 2);
          props.setSocialSize(newDiv2Width - resizeBarSize / 2);
        })
        .with({ type: 'vertical' }, (props) => {
          let newDiv1Height = e.clientY - parentDiv.offsetTop;
          newDiv1Height = Math.max(0, newDiv1Height);
          newDiv1Height = Math.min(parentDiv.offsetHeight, newDiv1Height);
          const newDiv2Width = parentDiv.offsetHeight - newDiv1Height;
          props.setCanvasSize(newDiv1Height - resizeBarSize / 2);
          props.setSocialSize(newDiv2Width - resizeBarSize / 2);
        })
        .exhaustive();
    };

    const mouseUpHandler = () => {
      setResizing(false);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // make sure it only runs the useEffect for resizing changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resizing]);

  useEffect(() => {
    const handleResize = () => {
      match(props)
        .with({ type: 'horizontal' }, (props) => {
          if (
            typeof props.canvasSize === 'number' &&
            typeof props.socialSize === 'number'
          ) {
            const totalWidth = window.innerWidth;
            const canvasRatio =
              props.canvasSize / (props.canvasSize + props.socialSize);
            const socialRatio =
              props.socialSize / (props.canvasSize + props.socialSize);

            const newCanvasWidth = canvasRatio * totalWidth;
            const newSocialWidth = socialRatio * totalWidth;
            props.setCanvasSize(newCanvasWidth);
            props.setSocialSize(newSocialWidth);
          }
        })
        .with({ type: 'vertical' }, (props) => {
          if (
            typeof props.canvasSize === 'number' &&
            typeof props.socialSize === 'number'
          ) {
            const totalHeight = window.innerHeight;
            const canvasRatio =
              props.canvasSize / (props.canvasSize + props.socialSize);
            const socialRatio =
              props.socialSize / (props.canvasSize + props.socialSize);

            const newCanvasHeight = canvasRatio * totalHeight;
            const newSocialHeight = socialRatio * totalHeight;
            props.setCanvasSize(newCanvasHeight);
            props.setSocialSize(newSocialHeight);
          }
        })
        .exhaustive();
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return props.type === 'horizontal' ? (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
      }}
      className="prevent-select"
      ref={parentDivRef}
    >
      <div
        style={{
          maxWidth: props.canvasSize ?? undefined,
          minWidth: props.canvasSize ?? undefined,
          height: '100%',
        }}
      >
        {props.leftDiv}
      </div>
      <div
        style={{
          minWidth: resizeBarSize,
          // paramerize this
          height: '98%',
        }}
        className={'cursor-col-resize border-y-2 border-secondary'}
        onMouseDown={() => setResizing(true)}
      />
      <div
        className="flex items-center justify-center"
        style={{
          width: props.socialSize ?? undefined,
          maxWidth: props.socialSize ?? undefined,
          minWidth: props.socialSize ?? undefined,
        }}
      >
        {props.rightDiv}
      </div>
    </div>
  ) : (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      }}
      className="prevent-select"
      ref={parentDivRef}
    >
      <div
        style={{
          width: '100%',
          maxHeight: props.canvasSize ?? undefined,
          minHeight: props.canvasSize ?? undefined,
        }}
      >
        {props.topDiv}
      </div>
      <div
        style={{
          minHeight: resizeBarSize,
        }}
        className={'cursor-row-resize  border-y-2 border-secondary'}
        onMouseDown={() => setResizing(true)}
      />
      <div
        className="flex items-center justify-center flex-col"
        style={{
          maxHeight: props.socialSize ?? undefined,
          minHeight: props.socialSize ?? undefined,
        }}
      >
        {props.bottomDiv}
      </div>
    </div>
  );
};

export default Resizable;
