export const F = (x: number): number => 2 * x + 1;

export class Point {
  x: number;
  y: number;
  b: number;

  target: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.b = 1;

    this.target = y >= F(x) ? 1 : -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#000';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
    ctx.closePath();

    if (this.target > 0) {
      ctx.fill();
    } else {
      ctx.stroke();
    }
  }
}
