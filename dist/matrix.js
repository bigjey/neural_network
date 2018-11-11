var Matrix = /** @class */ (function () {
    function Matrix(n, m) {
        if (n === void 0) { n = 1; }
        if (m === void 0) { m = 1; }
        this.rows = 1;
        this.cols = 1;
        this.values = [[0]];
        if (Array.isArray(n)) {
            this.rows = n.length;
            this.cols = m;
            this.values = new Array(this.rows);
            for (var i = 0; i < this.rows; i++) {
                this.values[i] = [n[i]];
            }
        }
        else if (typeof n === "number") {
            this.rows = n;
            this.cols = m;
            this.values = new Array(this.rows);
            for (var i = 0; i < this.rows; i++) {
                this.values[i] = new Array(this.cols);
                for (var j = 0; j < this.cols; j++) {
                    this.values[i][j] = 0;
                }
            }
        }
    }
    Matrix.prototype.randomize = function () {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                this.values[i][j] = Math.floor(Math.random() * 10);
            }
        }
        return this;
    };
    Matrix.add = function (m, n) {
        if (typeof n !== "number" && !(n instanceof Matrix)) {
            throw new Error("lol");
        }
        var MM = new Matrix(m.rows, m.cols);
        for (var i = 0; i < MM.rows; i++) {
            for (var j = 0; j < MM.cols; j++) {
                if (typeof n === "number") {
                    MM.values[i][j] = m.values[i][j] + n;
                }
                else if (n instanceof Matrix) {
                    MM.values[i][j] = m.values[i][j] + n.values[i][j];
                }
            }
        }
        return MM;
    };
    Matrix.subtract = function (A, B) {
        var MM = new Matrix(A.rows, A.cols);
        for (var i = 0; i < A.rows; i++) {
            for (var j = 0; j < A.cols; j++) {
                MM.values[i][j] = A.values[i][j] - B.values[i][j];
            }
        }
        return MM;
    };
    Matrix.multiply = function (m, n) {
        if (typeof n !== "number" && !(n instanceof Matrix)) {
            throw new Error("lol");
        }
        var MM = new Matrix(m.rows, m.cols);
        for (var i = 0; i < MM.rows; i++) {
            for (var j = 0; j < MM.cols; j++) {
                if (typeof n === "number") {
                    MM.values[i][j] = m.values[i][j] * n;
                }
                else if (n instanceof Matrix) {
                    MM.values[i][j] = m.values[i][j] * n.values[i][j];
                }
            }
        }
        return MM;
    };
    Matrix.map = function (m, fn) {
        var MM = new Matrix(m.rows, m.cols);
        for (var i = 0; i < MM.rows; i++) {
            for (var j = 0; j < MM.cols; j++) {
                MM.values[i][j] = fn(MM.values[i][j]);
            }
        }
        return MM;
    };
    Matrix.product = function (A, B) {
        if (A.cols !== B.rows) {
            throw new Error("A cols should match B rows");
        }
        var C = new Matrix(A.rows, B.cols);
        for (var i = 0; i < C.rows; i++) {
            for (var j = 0; j < C.cols; j++) {
                for (var k = 0; k < A.cols; k++) {
                    C.values[i][j] += A.values[i][k] * B.values[k][j];
                }
            }
        }
        return C;
    };
    Matrix.transpose = function (M) {
        var MM = new Matrix(M.cols, M.rows);
        for (var i = 0; i < M.rows; i++) {
            for (var j = 0; j < M.cols; j++) {
                MM.values[j][i] = M.values[i][j];
            }
        }
        return MM;
    };
    return Matrix;
}());
export { Matrix };
//# sourceMappingURL=matrix.js.map