import { Animator } from '../../../../utilities/Animator';
import { ArtBox } from '../../../../utilities/ArtBox';
import { dist, random } from '../../../../utilities/math';
import { Sketch } from '../../../../utilities/SketchPad';
import { Node } from './Node';

const distNodes = ({ loc: { x: x1, y: y1 } }: Node, { loc: { x: x2, y: y2 } }: Node) => dist(x1, y1, x2, y2);

export class AncientBeastsSketch implements Sketch {
  private readonly animator: Animator;

  private readonly artBox: ArtBox;

  private readonly width: number;

  private readonly height: number;

  private nodecount = 0;

  private nodes: Node[] = [];

  private globalVelocity = 0;

  private globalAcceleration = 0;

  private offsetX = 0;

  private offsetY = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.artBox = new ArtBox(canvas);
    this.width = canvas.width;
    this.height = canvas.height;
    this.draw = this.draw.bind(this);
    this.animator = new Animator({ draw: this.draw });
    this.reset();
    this.animator.start();
  }

  public destroy() {
    this.animator.stop();
  }

  public reset() {
    this.resetNodes();
    this.globalVelocity = 10;
    this.globalAcceleration = random(1.001, 1.02);
    this.offsetX = Math.round(random(-this.width / 3, this.width / 3));
    this.offsetY = Math.round(random(-this.height / 3, this.height / 3));
    this.artBox.clear();
    this.animator.reset();
    this.animator.start();
  }

  public draw() {
    this.artBox.ctx.save();
    this.artBox.ctx.translate(this.offsetX, this.offsetY);
    this.nodes.forEach(targetNode => {
      const closest = this.findBestMatch(targetNode, (current, best) => best === undefined || current < best);
      if (closest !== undefined) {
        this.optimizeDistance(targetNode, closest);
        this.renderConnection(targetNode, closest);
      }
    });
    this.globalVelocity *= this.globalAcceleration;
    if (1 / this.globalVelocity <= this.scaleValueBasedOnWidth(0.02)) {
      this.animator.stop();
    }
    this.artBox.ctx.restore();
  }

  private renderConnection(targetNode: Node, comparator: Node) {
    const {
      loc: { x: x1, y: y1 },
      red,
      blue,
      green,
    } = targetNode;
    const {
      loc: { x: x2, y: y2 },
    } = comparator;
    this.artBox.setFillRgba(
      Math.round(red + random(-3, 3)),
      Math.round(green + random(-3, 3)),
      Math.round(blue + random(-3, 3)),
      random(0.2, 0.6),
    );
    for (let count = 0; count < 30; count += 1) {
      this.artBox.ctx.beginPath();
      this.artBox.ctx.ellipse(
        x1 + (count * (x2 - x1)) / 30 + this.scaleValueBasedOnWidth(random(-2, 2)),
        y1 + (count * (y2 - y1)) / 30 + this.scaleValueBasedOnWidth(random(-2, 2)),
        this.scaleValueBasedOnWidth(random(0.25, 1.5)),
        this.scaleValueBasedOnWidth(random(0.25, 1.5)),
        random(2 * Math.PI),
        random(2 * Math.PI),
        random(2 * Math.PI),
      );
      this.artBox.ctx.fill();
      this.artBox.ctx.beginPath();
      this.artBox.ctx.ellipse(
        x1 + (count * (x2 - x1)) / 30 + this.scaleValueBasedOnWidth(random(-2, 2)),
        y1 + (count * (y2 - y1)) / 30 + this.scaleValueBasedOnWidth(random(-2, 2)),
        this.scaleValueBasedOnWidth(random(0.25, 1.5)),
        this.scaleValueBasedOnWidth(random(0.25, 1.5)),
        random(2 * Math.PI),
        random(2 * Math.PI),
        random(2 * Math.PI),
      );
      this.artBox.ctx.fill();
    }
  }

  private findBestMatch(targetNode: Node, isBetter: (current: number, best: number | undefined) => boolean) {
    let best: number;
    const { optimal, id } = targetNode;
    return this.nodes.reduce((candidate, comparator, comparatorId) => {
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
    this.nodecount = Math.round(random(10, 100));
    this.nodes = [];
    for (let count = 0; count < this.nodecount; count += 1) {
      this.nodes[count] = new Node(count, this.width, this.height);
    }
  }

  private scaleValueBasedOnWidth(value: number) {
    return (this.width / 1920) * value;
  }

  // eslint-disable-next-line class-methods-use-this
  private optimizeDistance(targetNode: Node, comparator: Node) {
    const {
      optimal,
      loc: { x: x1, y: y1 },
    } = targetNode;
    const {
      loc: { x: x2, y: y2 },
    } = comparator;
    const distance = dist(x1, y1, x2, y2);
    if (distance < optimal) {
      targetNode.setVelocity(-(x2 - x1) / this.globalVelocity, -(y2 - y1) / this.globalVelocity);
    }
    if (distance > optimal) {
      targetNode.setVelocity((x2 - x1) / this.globalVelocity, (y2 - y1) / this.globalVelocity);
    }
    targetNode.update();
  }
}
