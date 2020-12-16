import React, { useCallback, useEffect, useState } from 'react';

export abstract class Sketch {
  // eslint-disable-next-line max-len
  // eslint-disable-next-line no-useless-constructor, no-unused-vars, @typescript-eslint/no-empty-function, no-empty-function, @typescript-eslint/no-unused-vars, @typescript-eslint/no-useless-constructor
  constructor(canvasRef?: HTMLCanvasElement) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  reset(): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
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
  const ref = useCallback(
    (canvasRef: HTMLCanvasElement | null) => {
      if (sketch === null && canvasRef !== null) {
        setSketch(sketchCreator(canvasRef));
      }
    },
    [sketch, sketchCreator],
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
  );
};
