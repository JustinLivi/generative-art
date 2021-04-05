import { Animator } from '../../../../utilities/Animator';
import { ArtBox } from '../../../../utilities/ArtBox';
import { dist, random } from '../../../../utilities/math';
import { Sketch } from '../../../../utilities/SketchPad';
import { Vector } from '../seed0/CNode';
import { CNode } from './CNode';

const distVectors = ({ x: x1, y: y1 }: Vector, { x: x2, y: y2 }: Vector) => dist(x1, y1, x2, y2);

export class CommunitySketch implements Sketch {
  private readonly animator: Animator;

  private readonly artBox: ArtBox;

  private readonly width: number;

  private readonly height: number;

  private nodecount = 0;

  private nodes: CNode[] = [];

  private centerX = 0;

  private centerY = 0;

  private cycle = 0;

  private centerHue = 0;

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
    this.cycle = 0;
    this.cycleOne();
    this.artBox.ctx.restore();
    this.artBox.clear();
    this.artBox.setFillRgba(255, 255, 255, 1);
    this.artBox.ctx.fillRect(0, 0, this.width, this.height);
    this.artBox.ctx.save();
    this.artBox.ctx.translate(this.centerX, this.centerY);
    this.animator.reset();
    this.animator.start();
  }

  private cycleOne() {
    this.centerHue = random(360);
    this.centerX = random(this.width / 4, (3 * this.width) / 4);
    this.centerY = random(this.height / 4, (3 * this.height) / 4);
    this.nodecount = Math.floor(random(80, 100));
    this.resetNodes(20, 20, 5, 5);
  }

  private cycleTwo() {
    this.nodecount = Math.floor(random(25, 40));
    this.resetNodes(60, 80, 40, 50);
  }

  public draw() {
    this.nodes.forEach(targetNode => {
      targetNode.saveLoc();
      this.nodes.forEach(compNode => {
        if (compNode.id === targetNode.id) {
          return;
        }
        this.optimizeDistance(targetNode, compNode);
      });
      this.renderNode(targetNode);
    });
    this.cycle += 1;
    if (this.cycle === 1000) {
      this.cycleTwo();
    } else if (this.cycle === 2000) {
      this.animator.pause();
    }
  }

  private renderNode(targetNode: CNode) {
    this.artBox.ctx.beginPath();
    this.artBox.ctx.moveTo(targetNode.pLoc.x, targetNode.pLoc.y);
    this.artBox.ctx.lineTo(targetNode.loc.x, targetNode.loc.y);
    this.artBox.setStrokeHsla(targetNode.hue, targetNode.saturation, targetNode.lightness, targetNode.alpha);
    this.artBox.ctx.lineWidth = 1 + distVectors(targetNode.pLoc, targetNode.loc) * 1.5;
    this.artBox.ctx.lineCap = 'round';
    this.artBox.ctx.stroke();
    this.artBox.ctx.closePath();
  }

  private resetNodes(satlow: number, satHigh: number, lightLow: number, lightHigh: number) {
    const variance = random(10, 40);
    this.nodes = [];
    for (let count = 0; count < this.nodecount; count += 1) {
      this.nodes[count] = new CNode(
        count,
        this.centerHue - variance,
        this.centerHue + variance,
        satlow,
        satHigh,
        lightLow,
        lightHigh,
        this.width,
        this.height,
      );
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
    const adjustedDistance = distance * speed;
    if (distance < optimal) {
      targetNode.updateVelocity(-(x2 - x1) / adjustedDistance, -(y2 - y1) / adjustedDistance);
    } else if (distance > optimal) {
      targetNode.updateVelocity((x2 - x1) / adjustedDistance, (y2 - y1) / adjustedDistance);
    }
    targetNode.update();
  }
}
