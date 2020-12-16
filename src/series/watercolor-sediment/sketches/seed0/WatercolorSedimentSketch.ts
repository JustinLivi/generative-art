import { sortBy } from 'lodash';

import { Animator } from '../../../../utilities/Animator';
import { ArtBox } from '../../../../utilities/ArtBox';
import { constrain, random } from '../../../../utilities/math';
import { Sketch } from '../../../../utilities/SketchPad';
import { WatercolorNode } from './WatercolorNode';

export class WatercolorSedimentSketch implements Sketch {
  private readonly animator: Animator;

  private readonly artBox: ArtBox;

  private readonly width: number;

  private readonly height: number;

  private seedcount = 50;

  private theta = 0;

  private nodeHeights: number[] = []; // distance

  private nodes: WatercolorNode[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.artBox = new ArtBox(canvas);
    this.width = canvas.width;
    this.height = canvas.height;
    this.draw = this.draw.bind(this);
    this.animator = new Animator({ draw: this.draw });
    this.reset();
  }

  public destroy() {
    this.animator.stop();
  }

  public reset() {
    this.artBox.clear();
    this.seedcount = Math.floor(random(4, 20));
    const centerhue = random(0, 360);
    const variance = random(10, 40);
    for (let count = 0; count < this.seedcount; count += 1) {
      this.nodes[count] = new WatercolorNode(this.artBox, centerhue - variance, centerhue + variance);
      this.nodeHeights[count] = random(0, this.height);
    }
    this.nodeHeights[0] = 0;
    this.nodeHeights[this.seedcount - 1] = this.height;
    this.nodeHeights = sortBy(this.nodeHeights);
    this.theta = -20;
    this.animator.start();
  }

  public draw() {
    if (this.theta >= this.width) {
      this.animator.pause();
    }
    this.artBox.ctx.save();
    this.artBox.ctx.translate(this.theta, 0);
    this.artBox.ctx.rotate(Math.PI / 2);
    this.generate();
    this.artBox.ctx.restore();
    this.theta += 1;
  }

  render(count: number, distance: number) {
    const prev = count < this.seedcount - 1 ? count + 1 : this.seedcount - 1;
    this.nodes[count].render(this.nodes[prev], distance, Math.abs(this.nodeHeights[prev] - distance));
  }

  generate() {
    for (let count = 0; count < this.seedcount; count += 1) {
      this.nodeHeights[count] = constrain(this.nodeHeights[count] + random(-1, 1), 0, this.height);
    }
    this.nodeHeights[0] = 0;
    this.nodeHeights[this.seedcount - 1] = this.height;
    this.nodeHeights = sortBy(this.nodeHeights);
    for (let count = 0; count < this.seedcount; count += 1) {
      this.render(count, this.nodeHeights[count]);
    }
  }
}
