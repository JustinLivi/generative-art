import React from 'react';

import { SketchPad } from '../../../../utilities/SketchPad';
import { SpectrumGeneratorSketch } from './SpectrumGeneratorSketch';

export interface SpectrumGeneratorSeed0Props {
  width?: number;
  height?: number;
  className?: string;
}

export const SpectrumGeneratorSeed0: React.FunctionComponent<SpectrumGeneratorSeed0Props> = ({
  width = 1920,
  height = 1080,
  className,
}) => (
  <SketchPad
    width={width}
    height={height}
    className={className}
    sketchCreator={canvas => new SpectrumGeneratorSketch(canvas)}
  />
);

// eslint-disable-next-line import/no-default-export
export default SpectrumGeneratorSeed0;
