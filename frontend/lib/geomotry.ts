import { ElementRef, RefObject } from 'react';
import { Rectangle } from './types';

const viewToWorld = (
  cord: [number, number],
  camera: [number, number]
): [number, number] => {
  return [cord[0] - camera[0], cord[1] - camera[1]];
};

const optimizeCanvas = ({
  canvas,
  container,
  ctx,
}: {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  container: HTMLDivElement;
}) => {
  const dpr = window.devicePixelRatio;
  const rect = container.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  ctx.scale(dpr, dpr);

  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const drawBackground = ({
  camera,
  canvas,
  ctx,
}: {
  camera: [number, number];
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}) => {
  const gridSize = 50;

  const bounds = {
    left: -camera[0],
    top: -camera[1],
    right: -camera[0] + canvas.width,
    bottom: -camera[1] + canvas.height,
  };
  bounds.left = Math.floor(bounds.left / gridSize) * gridSize;
  bounds.top = Math.floor(bounds.top / gridSize) * gridSize;
  bounds.right = Math.ceil(bounds.right / gridSize) * gridSize;
  bounds.bottom = Math.ceil(bounds.bottom / gridSize) * gridSize;

  for (let x = bounds.left; x <= bounds.right; x += gridSize) {
    for (let y = bounds.top; y <= bounds.bottom; y += gridSize) {
      ctx.strokeStyle = '#eee';
      ctx.lineJoin = 'miter';
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, 2 * Math.PI);
      ctx.fillStyle = '#ccc';
      ctx.fill();
      ctx.stroke();
    }
  }
};

export class Mouse {
  camera: [number, number];
  viewCord: [number, number];
  worldCord: [number, number];
  constructor(
    init:
      | { type: 'mouse'; mouse: [number, number] }
      | {
          type: 'event';
          event:
            | React.MouseEvent<
                HTMLCanvasElement | HTMLCanvasElement,
                MouseEvent
              >
            | WheelEvent;
          canvas: HTMLCanvasElement;
        },
    camera: [number, number]
  ) {
    this.camera = camera;

    if (init.type === 'mouse') {
      this.viewCord = init.mouse;
    } else {
      const rect = init.canvas.getBoundingClientRect();
      const x = init.event.clientX - rect.left;
      const y = init.event.clientY - rect.top;
      this.viewCord = [x, y];
    }
    this.worldCord = [
      this.viewCord[0] - camera[0],
      this.viewCord[1] - camera[1],
    ];
  }

  isInRectangle(rect: Rectangle) {
    return (
      this.worldCord[0] >= rect.p1[0] &&
      this.worldCord[0] <= rect.p2[0] &&
      this.worldCord[1] >= rect.p1[1] &&
      this.worldCord[1] <= rect.p2[1]
    );
  }
}

export const Geometry = {
  viewToWorld,
  optimizeCanvas,
  drawBackground,
  Mouse,
};
