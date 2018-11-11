type MatrixAdder = number | Matrix;
interface IMatrixMapper {
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
    } else if (typeof n === "number") {
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

  static add(m: Matrix, n: MatrixAdder): Matrix {
    if (typeof n !== "number" && !(n instanceof Matrix)) {
      throw new Error("lol");
    }

    let MM = new Matrix(m.rows, m.cols);

    for (var i = 0; i < MM.rows; i++) {
      for (var j = 0; j < MM.cols; j++) {
        if (typeof n === "number") {
          MM.values[i][j] = m.values[i][j] + <number>n;
        } else if (n instanceof Matrix) {
          MM.values[i][j] = m.values[i][j] + n.values[i][j];
        }
      }
    }

    return MM;
  }

  static subtract(A: Matrix, B: Matrix) {
    let MM = new Matrix(A.rows, A.cols);

    for (var i = 0; i < A.rows; i++) {
      for (var j = 0; j < A.cols; j++) {
        MM.values[i][j] = A.values[i][j] - B.values[i][j];
      }
    }

    return MM;
  }

  static multiply(m: Matrix, n: number | Matrix): Matrix {
    if (typeof n !== "number" && !(n instanceof Matrix)) {
      throw new Error("lol");
    }

    let MM = new Matrix(m.rows, m.cols);

    for (var i = 0; i < MM.rows; i++) {
      for (var j = 0; j < MM.cols; j++) {
        if (typeof n === "number") {
          MM.values[i][j] = m.values[i][j] * <number>n;
        } else if (n instanceof Matrix) {
          MM.values[i][j] = m.values[i][j] * n.values[i][j];
        }
      }
    }

    return MM;
  }

  static map(m: Matrix, fn: IMatrixMapper): Matrix {
    let MM = new Matrix(m.rows, m.cols);

    for (var i = 0; i < MM.rows; i++) {
      for (var j = 0; j < MM.cols; j++) {
        MM.values[i][j] = fn(MM.values[i][j]);
      }
    }

    return MM;
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

  static transpose(M: Matrix): Matrix {
    let MM = new Matrix(M.cols, M.rows);

    for (var i = 0; i < M.rows; i++) {
      for (var j = 0; j < M.cols; j++) {
        MM.values[j][i] = M.values[i][j];
      }
    }

    return MM;
  }
}
