import * as React from 'react';

import { SketchPad } from '../../../../utilities/SketchPad';
import { AncientBeastsSketch } from './AncientBeastsSketch';

export interface AncientBeastsSeed0Props {
  width?: number;
  height?: number;
  className?: string;
}

export const AncientBeastsSeed0: React.FunctionComponent<AncientBeastsSeed0Props> = ({
  width = 1920,
  height = 1080,
  className,
}) => (
  <SketchPad
    width={width}
    height={height}
    className={className}
    sketchCreator={canvas => new AncientBeastsSketch(canvas)}
  />
);

// eslint-disable-next-line import/no-default-export
export default AncientBeastsSeed0;
