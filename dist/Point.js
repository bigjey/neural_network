export var F = function (x) { return 2 * x + 1; };
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
        this.b = 1;
        this.target = y >= F(x) ? 1 : -1;
    }
    Point.prototype.draw = function (ctx) {
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
    };
    return Point;
}());
export { Point };
//# sourceMappingURL=Point.js.map