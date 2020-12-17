import React from 'react';

import { SketchPad } from '../../../../utilities/SketchPad';
import { WatercolorSedimentSketch } from './WatercolorSedimentSketch';

export interface WatercolorSedimentSeed0Props {
  width?: number;
  height?: number;
  className?: string;
}

export const WatercolorSedimentSeed0: React.FunctionComponent<WatercolorSedimentSeed0Props> = ({
  width = 1920,
  height = 1080,
  className,
}) => (
  <SketchPad
    width={width}
    height={height}
    className={className}
    sketchCreator={canvas => new WatercolorSedimentSketch(canvas)}
  />
);
