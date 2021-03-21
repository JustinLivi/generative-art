import * as React from 'react';

import { SketchPad } from '../../../../utilities/SketchPad';
import { GridLinesSketch } from './GridLinesSketch';

export interface GridLinesSeed0Props {
  width?: number;
  height?: number;
  className?: string;
}

export const GridLinesSeed0: React.FunctionComponent<GridLinesSeed0Props> = ({
  width = 1920,
  height = 1080,
  className,
}) => (
  <SketchPad
    width={width}
    height={height}
    className={className}
    sketchCreator={canvas => new GridLinesSketch(canvas)}
  />
);

// eslint-disable-next-line import/no-default-export
export default GridLinesSeed0;
