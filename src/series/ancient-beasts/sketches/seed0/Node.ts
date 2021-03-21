import { random } from '../../../../utilities/math';

export interface Vector {
  x: number;
  y: number;
}

export class Node {
  public readonly id: number;

  public readonly optimal = 120;

  public readonly theta: number;

  public readonly loc: Vector;

  private readonly vel: Vector;

  public readonly red = random(255);

  public readonly green = random(255);

  public readonly blue = random(255);

  constructor(id: number, width: number, height: number) {
    this.id = id;
    this.theta = random(0, 360);
    this.loc = {
      x: random(0, width),
      y: random(0, height),
    };
    this.vel = {
      x: 0,
      y: 0,
    };
  }

  setVelocity(x: number, y: number) {
    this.vel.x = x;
    this.vel.y = y;
  }

  update() {
    this.loc.x += this.vel.x;
    this.loc.y += this.vel.y;
  }
}
