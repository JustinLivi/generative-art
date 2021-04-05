import { random } from '../../../../utilities/math';

export interface Vector {
  x: number;
  y: number;
}

export class CNode {
  public readonly id: number;

  public readonly optimal: number;

  public readonly pLoc: Vector;

  public readonly loc: Vector;

  public readonly hue: number;

  public readonly saturation: number;

  public readonly lightness: number;

  public readonly alpha: number;

  public readonly speed: number;

  private readonly vel: Vector;

  constructor(
    id: number,
    hueLow: number,
    hueHigh: number,
    satLow: number,
    satHigh: number,
    lightLow: number,
    lightHigh: number,
    width: number,
    height: number,
  ) {
    this.id = id;
    this.optimal = random(0, Math.max(width, height) / 2);
    this.loc = {
      x: random(-width / 2, width / 2),
      y: random(-height / 2, height / 2),
    };
    this.pLoc = {
      x: this.loc.x,
      y: this.loc.y,
    };
    this.vel = {
      x: 0,
      y: 0,
    };
    this.hue = random(hueLow, hueHigh);
    this.saturation = random(satLow, satHigh);
    this.lightness = random(lightLow, lightHigh);
    this.alpha = 1;
    this.speed = random(1000, 100000);
  }

  updateVelocity(x: number, y: number) {
    this.vel.x += x;
    this.vel.y += y;
  }

  saveLoc() {
    this.pLoc.x = this.loc.x;
    this.pLoc.y = this.loc.y;
  }

  update() {
    this.loc.x += this.vel.x * 0.9999;
    this.loc.y += this.vel.y * 0.9999;
  }
}
