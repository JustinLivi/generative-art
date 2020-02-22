import { random } from 'lodash';

export interface Vector {
  x: number;
  y: number;
}

export class CNode {
  public grey: number;

  public readonly id: number;

  public readonly optimal: number;

  public readonly theta: number;

  public readonly loc: Vector;

  public readonly alpha: number;

  public readonly speed: number;

  private readonly vel: Vector;

  constructor(id: number, width: number, height: number) {
    this.id = id;
    this.optimal = random(20);
    this.theta = random(360);
    this.loc = {
      x: random(width),
      y: random(height),
    };
    this.vel = {
      x: 0,
      y: 0,
    };
    this.grey = random(255);
    this.alpha = random(10, 70) / 255;
    this.speed = random(0.1, 3);
  }

  setVelocity(x: number, y: number) {
    this.vel.x = x;
    this.vel.y = y;
  }

  update() {
    this.grey += random(-1, 1);
    this.loc.x += this.vel.x;
    this.loc.y += this.vel.y;
  }
}
