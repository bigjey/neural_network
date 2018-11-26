export type MatrixAdder = number | Matrix;
export type MatrixMultiplier = MatrixAdder;

export interface IMatrixMapper {
  (n: number): number;
}

interface IMatrix {
  rows: number;
  cols: number;
  values: number[][];
}

export class Matrix implements IMatrix {
  rows: number = 1;
  cols: number = 1;
  values: number[][] = [[0]];

  constructor(n: number | number[] = 1, m: number = 1) {
    if (Array.isArray(n)) {
      this.rows = n.length;
      this.cols = m;

      this.values = new Array(this.rows);
      for (var i = 0; i < this.rows; i++) {
        this.values[i] = [n[i]];
      }
    } else if (typeof n === 'number') {
      this.rows = <number>n;
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

  randomize(): Matrix {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.values[i][j] = Math.floor(Math.random() * 10);
      }
    }

    return this;
  }

  static from(arr: number[][]): Matrix {
    if (!arr.length || !arr[0].length) {
      throw new Error('bad param');
    }

    let M = new Matrix(arr.length, arr[0].length);

    M.values = arr;

    return M;
  }

  static add(A: Matrix, B: MatrixAdder): Matrix {
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
          C.values[i][j] = A.values[i][j] + <number>B;
        } else if (B instanceof Matrix) {
          C.values[i][j] = A.values[i][j] + B.values[i][j];
        }
      }
    }

    return C;
  }

  static subtract(A: Matrix, B: Matrix) {
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

  static multiply(A: Matrix, B: MatrixMultiplier): Matrix {
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
          C.values[i][j] = A.values[i][j] * <number>B;
        } else if (B instanceof Matrix) {
          C.values[i][j] = A.values[i][j] * B.values[i][j];
        }
      }
    }

    return C;
  }

  static map(A: Matrix, fn: IMatrixMapper): Matrix {
    let B = new Matrix(A.rows, A.cols);

    for (var i = 0; i < B.rows; i++) {
      for (var j = 0; j < B.cols; j++) {
        B.values[i][j] = fn(A.values[i][j]);
      }
    }

    return B;
  }

  static product(A: Matrix, B: Matrix): Matrix {
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

  static transpose(A: Matrix): Matrix {
    let B = new Matrix(A.cols, A.rows);

    for (var i = 0; i < A.rows; i++) {
      for (var j = 0; j < A.cols; j++) {
        B.values[j][i] = A.values[i][j];
      }
    }

    return B;
  }
}
