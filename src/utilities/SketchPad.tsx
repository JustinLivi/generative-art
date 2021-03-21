import React, { useCallback, useEffect, useState } from 'react';
import { usePrevious } from './usePrevious';

export abstract class Sketch {
  // eslint-disable-next-line max-len
  // eslint-disable-next-line no-useless-constructor, no-unused-vars, @typescript-eslint/no-empty-function, no-empty-function, @typescript-eslint/no-unused-vars, @typescript-eslint/no-useless-constructor
  constructor(canvasRef?: HTMLCanvasElement) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function, class-methods-use-this
  reset(): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function, class-methods-use-this
  destroy(): void {}
}

export interface SketchPadProps {
  width: number;
  height: number;
  className?: string;
  sketchCreator: (canvasRef: HTMLCanvasElement) => Sketch;
}

export const SketchPad: React.FunctionComponent<SketchPadProps> = ({ width, height, className, sketchCreator }) => {
  const [sketch, setSketch] = useState<Sketch | null>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  const previousWidth = usePrevious(width);
  const previousHeight = usePrevious(height);

  const ref = useCallback(
    (canvasRef: HTMLCanvasElement | null) => {
      setCanvas(canvasRef);
      if ((sketch === null || width !== previousWidth || height !== previousHeight) && canvasRef !== null) {
        if (sketch !== null) {
          sketch.destroy();
        }
        setSketch(sketchCreator(canvasRef));
      }
    },
    [sketch, sketchCreator, width, height, previousWidth, previousHeight],
  );

  useEffect(
    () => () => {
      if (sketch) {
        sketch.destroy();
      }
    },
    [sketch],
  );

  return (
    <div>
      <canvas
        className={className}
        width={width}
        height={height}
        ref={ref}
        onClick={() => {
          if (sketch !== null) {
            sketch.reset();
          }
        }}
      />
      <button
        type="button"
        onClick={() => {
          if (canvas !== null) {
            if (canvas.requestFullscreen) {
              canvas.requestFullscreen();
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } else if ((canvas as any).webkitRequestFullScreen) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (canvas as any).webkitRequestFullScreen();
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } else if ((canvas as any).mozRequestFullScreen) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (canvas as any).mozRequestFullScreen();
            }
          }
        }}
      >
        fullscreen
      </button>
    </div>
  );
};
