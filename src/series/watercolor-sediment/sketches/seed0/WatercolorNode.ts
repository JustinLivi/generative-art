import { random } from 'lodash';

import { ArtBox } from '../../../../utilities/ArtBox';
import { constrain } from '../../../../utilities/math';

export class WatercolorNode {
  public hue: number;

  public saturation: number;

  public lightness: number;

  public deltaHue: number;

  public deltaSaturation: number;

  public deltaLightness: number;

  public streakiness: number;

  private readonly artBox: ArtBox;

  constructor(artBox: ArtBox, hueLow: number, hueHigh: number) {
    this.artBox = artBox;
    this.hue = random(hueLow, hueHigh);
    this.saturation = random(45, 70);
    this.lightness = random(20, 90);
    this.deltaHue = this.hue;
    this.deltaSaturation = this.saturation;
    this.deltaLightness = this.lightness;
    this.streakiness = random(0.1, 1);
  }

  reset(hueLow: number, hueHigh: number) {
    this.hue = random(hueLow, hueHigh);
    this.saturation = random(45, 70);
    this.lightness = random(20, 90);
    this.deltaHue = this.hue;
    this.deltaSaturation = this.saturation;
    this.deltaLightness = this.lightness;
    this.streakiness = random(0.1, 1);
  }

  render(sibling: WatercolorNode, distance: number, formax: number) {
    this.streakiness = constrain(this.streakiness + random(-0.01, 0.01), 0.1, 1);
    this.deltaHue = constrain(
      this.deltaHue + random(-this.streakiness, this.streakiness),
      this.hue - 20,
      this.hue + 20,
    );
    this.deltaSaturation = constrain(
      this.deltaSaturation + random(-this.streakiness, this.streakiness),
      this.saturation - 20,
      this.saturation + 20,
    );
    this.deltaLightness = constrain(
      this.deltaLightness + random(-this.streakiness, this.streakiness),
      this.lightness - 20,
      this.lightness + 20,
    );
    for (let count2 = 0; count2 < formax; count2 += 1) {
      for (let count3 = 0; count3 < (10 / 3) * this.streakiness + 5 / 3; count3 += 1) {
        const hue = Math.floor(this.deltaHue + random(-1, 1) + (count2 * (sibling.deltaHue - this.deltaHue)) / formax);
        const saturation = Math.floor(
          this.deltaSaturation +
            random(-0.5, 0.5) +
            (count2 * (sibling.deltaSaturation - this.deltaSaturation)) / formax,
        );
        const lightness = Math.floor(
          this.deltaLightness + random(-0.5, 0.5) + (count2 * (sibling.deltaLightness - this.deltaLightness)) / formax,
        );
        const alpha = random(2, 10) / 255;
        this.artBox.ctx.save();
        this.artBox.ctx.translate(
          distance + count2 + random(-1, 1),
          random(-this.streakiness * 10, this.streakiness * 10),
        );
        this.artBox.ctx.beginPath();
        this.artBox.setFillHsla(hue, saturation, lightness, alpha);
        this.artBox.ctx.ellipse(
          0,
          0,
          random(2, 10 + 5 * this.streakiness),
          random(2, 10 + 5 * this.streakiness),
          0,
          0,
          random(Math.PI * 2),
        );
        this.artBox.ctx.fill();
        this.artBox.ctx.restore();
      }
    }
  }
}
