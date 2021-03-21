import { Animator } from '../../../../utilities/Animator';
import { ArtBox } from '../../../../utilities/ArtBox';
import { dist, random } from '../../../../utilities/math';
import { Sketch } from '../../../../utilities/SketchPad';
import { Node } from './Node';

export class GridLinesSketch implements Sketch {
  private readonly animator: Animator;

  private readonly artBox: ArtBox;

  private readonly width: number;

  private readonly height: number;

  private nodecount = 0;

  private nodes: Node[] = [];

  private xPad = 0;

  private yPad = 0;

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
    this.xPad = Math.round(random(this.width / 8, this.width / 2.5));
    this.yPad = Math.round(random(this.height / 8, this.height / 2.5));
    this.resetNodes();
    this.artBox.clear();
    this.animator.reset();
    this.animator.start();
  }

  public draw() {
    this.artBox.ctx.save();
    let allStopped = true;
    this.nodes.forEach(targetNode => {
      targetNode.update();
      if (targetNode.stopped === false) {
        this.renderNode(targetNode);
        allStopped = false;
      }
    });
    this.artBox.ctx.restore();
    if (allStopped) {
      this.animator.stop();
    }
  }

  private renderNode(targetNode: Node) {
    const {
      loc: { x: x1, y: y1 },
      pLoc: { x: x2, y: y2 },
    } = targetNode;
    const maxCount = dist(x1, y1, x2, y2);
    this.artBox.setFillHsla(0, 0, Math.round(random(27, 30)), random(1, 5));
    for (let count = 0; count < maxCount; count += 1) {
      this.artBox.ctx.beginPath();
      this.artBox.ctx.ellipse(
        x1 + (count * (x2 - x1)) / maxCount + random(-0.25, 0.25),
        y1 + (count * (y2 - y1)) / maxCount + random(-0.25, 0.25),
        random(0.25, 1),
        random(0.25, 1),
        random(2 * Math.PI),
        random(2 * Math.PI),
        random(2 * Math.PI),
      );
      this.artBox.ctx.fill();
      this.artBox.ctx.beginPath();
      this.artBox.ctx.ellipse(
        x1 + (count * (x2 - x1)) / maxCount + random(-0.25, 0.25),
        y1 + (count * (y2 - y1)) / maxCount + random(-0.25, 0.25),
        random(0.25, 1),
        random(0.25, 1),
        random(2 * Math.PI),
        random(2 * Math.PI),
        random(2 * Math.PI),
      );
      this.artBox.ctx.fill();
    }
  }

  private resetNodes() {
    this.nodecount = Math.round(random(50, 200));
    this.nodes = [];
    let count = 0;
    const halfCount = Math.floor(this.nodecount / 2);
    for (count = 0; count <= halfCount; count += 1) {
      this.nodes[count] = new Node(
        count,
        { x: this.xPad, y: this.yPad + ((this.height - this.yPad * 2) / halfCount) * count },
        true,
        this.width - this.xPad,
      );
      const id2 = count + halfCount;
      this.nodes[1 + id2 + count] = new Node(
        id2,
        { x: this.xPad + ((this.width - this.xPad * 2) / halfCount) * count, y: this.yPad },
        false,
        this.height - this.yPad,
      );
    }
  }
}
