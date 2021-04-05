import * as React from 'react';

import { SketchPad } from '../../../../utilities/SketchPad';
import { CommunitySketch } from './CommunitySketch';

export interface CommunitySeed0Props {
  width?: number;
  height?: number;
  className?: string;
}

export const CommunitySeed1: React.FunctionComponent<CommunitySeed0Props> = ({
  width = 1920,
  height = 1080,
  className,
}) => (
  <SketchPad
    width={width}
    height={height}
    className={className}
    sketchCreator={canvas => new CommunitySketch(canvas)}
  />
);

// eslint-disable-next-line import/no-default-export
export default CommunitySeed1;
