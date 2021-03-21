import { constrain, random } from '../../../../utilities/math';

export interface Vector {
  x: number;
  y: number;
}

export class Node {
  public readonly id: number;

  public readonly optimal = 120;

  public readonly pLoc: Vector;

  public readonly loc: Vector;

  public readonly end: number;

  private readonly vel = 20;

  private readonly horizontal: boolean;

  public theta: number;

  public stopped = false;

  private acceleration = 0;

  constructor(id: number, start: Vector, horizontal: boolean, end: number) {
    const { x, y } = start;
    this.id = id;
    this.theta = horizontal ? 0 : Math.PI / 2;
    this.pLoc = {
      x,
      y,
    };
    this.loc = {
      x,
      y,
    };
    this.end = end;
    this.horizontal = horizontal;
    this.acceleration = random(0.001, 0.01);
  }

  update() {
    this.theta += random(-this.acceleration, this.acceleration);
    if (this.horizontal && this.loc.x < this.end) {
      this.pLoc.x = this.loc.x;
      this.pLoc.y = this.loc.y;
      this.loc.x = constrain(this.loc.x + this.vel * Math.cos(this.theta), 0, this.end);
      this.loc.y += this.vel * Math.sin(this.theta);
    } else if (!this.horizontal && this.loc.y < this.end) {
      this.pLoc.x = this.loc.x;
      this.pLoc.y = this.loc.y;
      this.loc.x += this.vel * Math.cos(this.theta);
      this.loc.y = constrain(this.loc.y + this.vel * Math.sin(this.theta), 0, this.end);
    } else {
      this.stopped = true;
    }
  }
}
