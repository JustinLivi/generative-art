import { Animator } from '../../../../utilities/Animator';
import { ArtBox } from '../../../../utilities/ArtBox';
import { constrain, random } from '../../../../utilities/math';
import { Sketch } from '../../../../utilities/SketchPad';

const newValue = (value: number) => constrain(value + Math.round(random(-1, 1)), 0, 256);

export class SpectrumGeneratorSketch implements Sketch {
  private readonly animator: Animator;

  private readonly artBox: ArtBox;

  private readonly width: number;

  private readonly height: number;

  private readonly xCount = 320;

  private readonly yCount = 10;

  private readonly xScale: number;

  private readonly yScale: number;

  private red = 0;

  private green = 0;

  private blue = 0;

  private previousAdjustment = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.artBox = new ArtBox(canvas);
    this.artBox.ctx.imageSmoothingEnabled = false;
    this.width = canvas.width;
    this.height = canvas.height;
    this.xScale = this.width / this.xCount;
    this.yScale = this.height / this.yCount;
    this.draw = this.draw.bind(this);
    this.animator = new Animator({ draw: this.draw, fps: 20 });
    this.reset();
  }

  public destroy() {
    this.animator.stop();
  }

  public reset() {
    this.artBox.clear();
    this.red = random(0, 265);
    this.green = random(0, 265);
    this.blue = random(0, 265);
    this.animator.start();
  }

  public draw(timingAdjustment: number) {
    this.artBox.ctx.putImageData(
      this.artBox.ctx.getImageData(0, 0, this.width, this.height),
      this.xScale * timingAdjustment,
      0,
    );
    this.artBox.ctx.save();
    this.artBox.ctx.scale(this.xScale * timingAdjustment, this.yScale);
    this.drawLine();
    this.artBox.ctx.restore();
  }

  drawSquare(y: number) {
    this.artBox.setFillRgba(this.red, this.green, this.blue, 1);
    this.artBox.ctx.fillRect(0, y, 1, 1);
  }

  drawLine() {
    for (let y = 0; y < this.yCount; y += 1) {
      this.red = newValue(this.red);
      this.green = newValue(this.green);
      this.blue = newValue(this.blue);
      this.drawSquare(y);
    }
  }
}
