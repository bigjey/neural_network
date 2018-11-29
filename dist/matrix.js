export class Matrix {
    constructor(n = 1, m = 1) {
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
    randomize() {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                this.values[i][j] = Math.floor(Math.random() * 10);
            }
        }
        return this;
    }
    static from(arr) {
        if (!arr.length || !arr[0].length) {
            throw new Error('bad param');
        }
        let M = new Matrix(arr.length, arr[0].length);
        M.values = arr;
        return M;
    }
    static add(A, B) {
        if (typeof B !== 'number' && !(B instanceof Matrix)) {
            throw new Error('lol');
        }
        if (B instanceof Matrix && (A.rows !== B.rows || A.cols !== B.cols)) {
            throw new Error('wrong matrices dimensions');
        }
        let C = new Matrix(A.rows, A.cols);
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
    }
    static subtract(A, B) {
        if (A.rows !== B.rows || A.cols !== B.cols) {
            throw new Error('wrong matrices dimensions');
        }
        let MM = new Matrix(A.rows, A.cols);
        for (var i = 0; i < A.rows; i++) {
            for (var j = 0; j < A.cols; j++) {
                MM.values[i][j] = A.values[i][j] - B.values[i][j];
            }
        }
        return MM;
    }
    static multiply(A, B) {
        if (typeof B !== 'number' && !(B instanceof Matrix)) {
            throw new Error('lol');
        }
        if (B instanceof Matrix && (A.rows !== B.rows || A.cols !== B.cols)) {
            throw new Error('wrong matrices dimensions');
        }
        let C = new Matrix(A.rows, A.cols);
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
    }
    static map(A, fn) {
        let B = new Matrix(A.rows, A.cols);
        for (var i = 0; i < B.rows; i++) {
            for (var j = 0; j < B.cols; j++) {
                B.values[i][j] = fn(A.values[i][j]);
            }
        }
        return B;
    }
    static product(A, B) {
        if (A.cols !== B.rows) {
            throw new Error(`A cols should match B rows`);
        }
        let C = new Matrix(A.rows, B.cols);
        for (var i = 0; i < C.rows; i++) {
            for (var j = 0; j < C.cols; j++) {
                for (var k = 0; k < A.cols; k++) {
                    C.values[i][j] += A.values[i][k] * B.values[k][j];
                }
            }
        }
        return C;
    }
    static transpose(A) {
        let B = new Matrix(A.cols, A.rows);
        for (var i = 0; i < A.rows; i++) {
            for (var j = 0; j < A.cols; j++) {
                B.values[j][i] = A.values[i][j];
            }
        }
        return B;
    }
}
//# sourceMappingURL=matrix.js.map