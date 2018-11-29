export const F = (x) => 2 * x + 1;
export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.b = 1;
        this.target = y >= F(x) ? 1 : -1;
    }
    draw(ctx) {
        ctx.fillStyle = '#000';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
        ctx.closePath();
        if (this.target > 0) {
            ctx.fill();
        }
        else {
            ctx.stroke();
        }
    }
}
//# sourceMappingURL=Point.js.map