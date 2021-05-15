export class ArtBox {
  readonly canvas: HTMLCanvasElement;

  readonly ctx: CanvasRenderingContext2D;

  readonly width: number;

  readonly height: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    const ctx = canvas.getContext('2d');
    if (ctx === null) {
      throw new Error('Context is null');
    }
    this.ctx = ctx;
  }

  rectline(x1: number, y1: number, x2: number, y2: number, size: number, dotCount = 20) {
    this.ctx.beginPath();
    for (let count = 0; count < dotCount; count += 1) {
      this.ctx.rect(x1 + (count * (x2 - x1)) / dotCount, y1 + (count * (y2 - y1)) / dotCount, size, size);
    }
    this.ctx.fill();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  setStrokeRgba(r: number, g: number, b: number, a: number) {
    this.ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
  }

  setStrokeHsla(hue: number, saturation: number, lightness: number, alpha: number) {
    this.ctx.strokeStyle = `hsla(${hue},${saturation}%,${lightness}%, ${alpha})`;
  }

  setFillRgba(r: number, g: number, b: number, a: number) {
    this.ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
  }

  setFillHsla(hue: number, saturation: number, lightness: number, alpha: number) {
    this.ctx.fillStyle = `hsla(${hue},${saturation}%,${lightness}%, ${alpha})`;
  }

  rect(x: number, y: number, width: number, height: number) {
    this.ctx.rect(x, y, width, height);
  }

  fill() {
    this.ctx.fill();
  }
}
