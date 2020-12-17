import { forEach, reduce } from 'lodash';

import { Animator } from '../../../../utilities/Animator';
import { ArtBox } from '../../../../utilities/ArtBox';
import { dist } from '../../../../utilities/math';
import { Sketch } from '../../../../utilities/SketchPad';
import { CNode } from './CNode';

const distNodes = ({ loc: { x: x1, y: y1 } }: CNode, { loc: { x: x2, y: y2 } }: CNode) => dist(x1, y1, x2, y2);

export class CommunitySketch implements Sketch {
  private readonly animator: Animator;

  private readonly artBox: ArtBox;

  private readonly width: number;

  private readonly height: number;

  private readonly nodecount: number;

  private readonly nodes: CNode[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.artBox = new ArtBox(canvas);
    this.width = canvas.width;
    this.height = canvas.height;
    this.draw = this.draw.bind(this);
    this.nodecount = 100;
    this.resetNodes();
    this.animator = new Animator({ draw: this.draw, maxFrames: 500 });
    this.animator.start();
  }

  public destroy() {
    this.animator.stop();
  }

  public reset() {
    this.resetNodes();
    this.artBox.clear();
    this.animator.reset();
    this.animator.start();
  }

  public draw() {
    forEach(this.nodes, targetNode => {
      const farthest = this.findBestMatch(targetNode, (current, best) => best === undefined || current > best);
      const closest = this.findBestMatch(targetNode, (current, best) => best === undefined || current < best);
      if (farthest !== undefined) {
        this.optimizeDistance(targetNode, farthest);
        this.renderConnection(targetNode, farthest);
      }
      if (closest !== undefined) {
        this.optimizeDistance(targetNode, closest);
        this.renderConnection(targetNode, closest);
      }
      this.renderNode(targetNode);
    });
  }

  private renderConnection(targetNode: CNode, comparator: CNode) {
    const {
      loc: { x: x1, y: y1 },
      grey,
      alpha,
    } = targetNode;
    const {
      loc: { x: x2, y: y2 },
    } = comparator;
    this.artBox.setFillRgba(grey, grey, grey, alpha);
    this.artBox.rectline(x2, y2, x1, y1);
  }

  private renderNode(targetNode: CNode) {
    const {
      loc: { x, y },
    } = targetNode;
    this.artBox.rect(x, y, 6, 6);
    this.artBox.fill();
  }

  private findBestMatch(targetNode: CNode, isBetter: (current: number, best: number | undefined) => boolean) {
    let best: number;
    const { optimal, id } = targetNode;
    return reduce(this.nodes, (candidate, comparator, comparatorId) => {
      if (comparatorId === id) {
        return candidate;
      }
      const current = Math.abs(distNodes(targetNode, comparator) - optimal);
      if (isBetter(current, best)) {
        best = current;
        return comparator;
      }
      return candidate;
    });
  }

  private resetNodes() {
    for (let count = 0; count < this.nodecount; count += 1) {
      this.nodes[count] = new CNode(count, this.width, this.height);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private optimizeDistance(targetNode: CNode, comparator: CNode) {
    const {
      optimal,
      loc: { x: x1, y: y1 },
      speed,
    } = targetNode;
    const {
      loc: { x: x2, y: y2 },
    } = comparator;
    const distance = dist(x1, y1, x2, y2);
    const adjustedDistance = distance / speed;
    if (distance < optimal) {
      targetNode.setVelocity(-(x2 - x1) / adjustedDistance, -(y2 - y1) / adjustedDistance);
    }
    if (distance > optimal) {
      targetNode.setVelocity((x2 - x1) / adjustedDistance, (y2 - y1) / adjustedDistance);
    }
    targetNode.update();
  }
}
