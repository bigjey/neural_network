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
        else if (typeof n === 'number') {
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
    Matrix.from = function (arr) {
        if (!arr.length || !arr[0].length) {
            throw new Error('bad param');
        }
        var M = new Matrix(arr.length, arr[0].length);
        M.values = arr;
        return M;
    };
    Matrix.add = function (A, B) {
        if (typeof B !== 'number' && !(B instanceof Matrix)) {
            throw new Error('lol');
        }
        if (B instanceof Matrix && (A.rows !== B.rows || A.cols !== B.cols)) {
            throw new Error('wrong matrices dimensions');
        }
        var C = new Matrix(A.rows, A.cols);
        for (var i = 0; i < C.rows; i++) {
            for (var j = 0; j < C.cols; j++) {
                if (typeof B === 'number') {
                    C.values[i][j] = A.values[i][j] + B;
                }
                else if (B instanceof Matrix) {
                    C.values[i][j] = A.values[i][j] + B.values[i][j];
                }
            }
        }
        return C;
    };
    Matrix.subtract = function (A, B) {
        if (A.rows !== B.rows || A.cols !== B.cols) {
            throw new Error('wrong matrices dimensions');
        }
        var MM = new Matrix(A.rows, A.cols);
        for (var i = 0; i < A.rows; i++) {
            for (var j = 0; j < A.cols; j++) {
                MM.values[i][j] = A.values[i][j] - B.values[i][j];
            }
        }
        return MM;
    };
    Matrix.multiply = function (A, B) {
        if (typeof B !== 'number' && !(B instanceof Matrix)) {
            throw new Error('lol');
        }
        if (B instanceof Matrix && (A.rows !== B.rows || A.cols !== B.cols)) {
            throw new Error('wrong matrices dimensions');
        }
        var C = new Matrix(A.rows, A.cols);
        for (var i = 0; i < C.rows; i++) {
            for (var j = 0; j < C.cols; j++) {
                if (typeof B === 'number') {
                    C.values[i][j] = A.values[i][j] * B;
                }
                else if (B instanceof Matrix) {
                    C.values[i][j] = A.values[i][j] * B.values[i][j];
                }
            }
        }
        return C;
    };
    Matrix.map = function (A, fn) {
        var B = new Matrix(A.rows, A.cols);
        for (var i = 0; i < B.rows; i++) {
            for (var j = 0; j < B.cols; j++) {
                B.values[i][j] = fn(A.values[i][j]);
            }
        }
        return B;
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
    Matrix.transpose = function (A) {
        var B = new Matrix(A.cols, A.rows);
        for (var i = 0; i < A.rows; i++) {
            for (var j = 0; j < A.cols; j++) {
                B.values[j][i] = A.values[i][j];
            }
        }
        return B;
    };
    return Matrix;
}());
export { Matrix };
//# sourceMappingURL=matrix.js.map