import { Animator } from '../../../../utilities/Animator';
import { ArtBox } from '../../../../utilities/ArtBox';
import { constrain, random } from '../../../../utilities/math';
import { Sketch } from '../../../../utilities/SketchPad';

const newValue = (value: number) => constrain(value + random(-1, 1), 0, 255);

export class SpectrumGeneratorSketch implements Sketch {
  private readonly animator: Animator;

  private readonly artBox: ArtBox;

  private readonly width: number;

  private readonly height: number;

  private readonly xCount = 320;

  private readonly yCount = 10;

  private readonly xScale: number;

  private readonly imageData = new ImageData(this.yCount, this.xCount);

  private readonly baseUintArray: Uint8ClampedArray = this.imageData.data;

  private readonly prerenderCanvas = document.createElement('canvas');

  private readonly prerenderContext = this.prerenderCanvas.getContext('2d');

  private red = 0;

  private green = 0;

  private blue = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.artBox = new ArtBox(canvas);
    this.artBox.ctx.imageSmoothingEnabled = false;
    this.width = canvas.width;
    this.height = canvas.height;
    this.xScale = this.width / this.xCount;
    this.prerenderCanvas.width = this.yCount;
    this.prerenderCanvas.height = this.xCount;
    this.draw = this.draw.bind(this);
    this.animator = new Animator({ draw: this.draw });
    this.reset();
  }

  public destroy() {
    this.animator.stop();
  }

  public reset() {
    for (let i = 0; i < this.baseUintArray.length; i += 4) {
      this.baseUintArray[i] = 255;
      this.baseUintArray[i + 1] = 255;
      this.baseUintArray[i + 2] = 255;
      this.baseUintArray[i + 3] = 0;
    }
    this.artBox.clear();
    this.red = random(255);
    this.green = random(255);
    this.blue = random(255);
    this.animator.start();
  }

  public draw(timingAdjustment: number) {
    if (!this.prerenderContext) {
      return;
    }
    this.drawLine();
    this.artBox.ctx.save();
    this.prerenderContext.putImageData(this.imageData, 0, 0);
    this.artBox.ctx.translate(0, this.height);
    this.artBox.ctx.rotate(-Math.PI / 2);
    this.artBox.ctx.drawImage(
      this.prerenderCanvas,
      0,
      // this only really applies to high resolutions
      Math.round(this.xScale * timingAdjustment - this.xScale),
      this.height,
      this.width,
    );
    this.artBox.ctx.restore();
  }

  drawSquare(y: number) {
    const dy = y * 4;
    this.baseUintArray[dy] = Math.round(this.red);
    this.baseUintArray[dy + 1] = Math.round(this.green);
    this.baseUintArray[dy + 2] = Math.round(this.blue);
    this.baseUintArray[dy + 3] = 255;
  }

  drawLine() {
    this.baseUintArray.copyWithin(this.yCount * 4, 0);
    for (let y = 0; y < this.yCount; y += 1) {
      this.red = newValue(this.red);
      this.green = newValue(this.green);
      this.blue = newValue(this.blue);
      this.drawSquare(y);
    }
  }
}
