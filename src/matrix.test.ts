import { Matrix, IMatrixMapper, MatrixAdder, MatrixMultiplier } from './matrix';

describe('constructor', () => {
  test('constructor()', () => {
    let m = new Matrix();

    expect(m instanceof Matrix).toBe(true);

    expect(m.rows).toBeDefined();
    expect(m.rows).toBe(1);

    expect(m.cols).toBeDefined();
    expect(m.cols).toBe(1);

    expect(m.values).toBeDefined();
    expect(Array.isArray(m.values)).toBe(true);
    // prettier-ignore
    expect(m.values).toEqual(
      [
        [0]
      ]
    );
  });

  test('constructor(number, number)', () => {
    let m = new Matrix(2, 3);

    expect(m instanceof Matrix).toBe(true);

    expect(m.rows).toBeDefined();
    expect(m.rows).toBe(2);

    expect(m.cols).toBeDefined();
    expect(m.cols).toBe(3);

    expect(m.values).toBeDefined();
    expect(Array.isArray(m.values)).toBe(true);
    // prettier-ignore
    expect(m.values).toEqual(
      [
        [0, 0, 0],
        [0, 0, 0]
      ]
    );
  });

  test('constructor(array)', () => {
    let arr = [1, 2, 3];
    let m = new Matrix(arr);

    expect(m instanceof Matrix).toBe(true);

    expect(m.rows).toBeDefined();
    expect(m.rows).toBe(3);

    expect(m.cols).toBeDefined();
    expect(m.cols).toBe(1);

    expect(m.values).toBeDefined();
    expect(Array.isArray(m.values)).toBe(true);
    // prettier-ignore
    expect(m.values).toEqual(
      [
        [1],
        [2],
        [3]
      ]
    );
  });
});

describe('static .from', () => {
  test('from([]) throws', () => {
    expect(() => {
      let m = Matrix.from([]);
    }).toThrow();
  });

  test('from(arr)', () => {
    // prettier-ignore
    let arr1 = [
      [1,2,3],
      [4,5,6]
    ];
    // prettier-ignore
    let arr2 = [
      [1]
    ];

    [arr1, arr2].forEach((arr) => {
      let m = Matrix.from(arr);

      expect(m.rows).toBe(arr.length);
      expect(m.cols).toBe(arr[0].length);
      expect(m.values).toEqual(arr);
    });
  });
});

describe('static .add', () => {
  test('add(matrix, number)', () => {
    let m = new Matrix(2, 3);
    const n: MatrixAdder = Math.PI;

    let m2 = Matrix.add(m, n);

    // prettier-ignore
    expect(m2.values).toEqual(
      [
        [n, n, n],
        [n, n, n],
      ]
    )
  });

  test('add(matrix, matrix)', () => {
    // prettier-ignore
    let arr1 = [
      [1, 2, 3],
      [4, 5, 6]
    ];
    // prettier-ignore
    let arr2 = [
      [6, 5, 4],
      [3, 2, 1]
    ]
    // prettier-ignore
    let arr3 = [
      [7, 7, 7],
      [7, 7, 7]
    ]

    let m1 = Matrix.from(arr1);
    let m2: MatrixAdder = Matrix.from(arr2);
    let m3 = Matrix.add(m1, m2);

    expect(m3 instanceof Matrix).toBe(true);
    expect(m3.rows).toEqual(arr3.length);
    expect(m3.cols).toEqual(arr3[0].length);
    expect(m3.values).toEqual(arr3);
  });
});

describe('static .subtract', () => {
  test('subtract(matrix, matrix)', () => {
    // prettier-ignore
    let arr1 = [
      [1, 2, 3],
      [4, 5, 6]
    ];
    // prettier-ignore
    let arr2 = [
      [6, 5, 4],
      [3, 2, 1]
    ]
    // prettier-ignore
    let arr3 = [
      [-5, -3, -1],
      [1, 3, 5]
    ]
    // prettier-ignore
    let arr4 = [
      [5, 3, 1],
      [-1, -3, -5]
    ]

    let m1 = Matrix.from(arr1);
    let m2 = Matrix.from(arr2);

    let m3 = Matrix.subtract(m1, m2);
    expect(m3 instanceof Matrix).toBe(true);
    expect(m3.values).toEqual(arr3);

    let m4 = Matrix.subtract(m2, m1);
    expect(m4 instanceof Matrix).toBe(true);
    expect(m4.values).toEqual(arr4);
  });
});

describe('static .multiply', () => {
  test('multiply(matrix, number)', () => {
    // prettier-ignore
    let arr1 = [
      [1, 2, 3],
      [4, 5, 6]
    ];
    let n: MatrixMultiplier = 2;
    // prettier-ignore
    let arr2 = [
      [2, 4, 6],
      [8, 10, 12]
    ]

    let m1 = Matrix.from(arr1);
    let m2 = Matrix.multiply(m1, n);

    expect(m2 instanceof Matrix).toBe(true);
    expect(m2.values).toEqual(arr2);
  });

  test('multiply(matrix, matrix)', () => {
    // prettier-ignore
    let arr1 = [
      [1, 2, 3],
      [4, 5, 6]
    ];
    // prettier-ignore
    let arr2 = [
      [2, 3, 4],
      [5, 6, 7]
    ]
    // prettier-ignore
    let arr3 = [
      [2, 6, 12],
      [20, 30, 42]
    ]

    let m1 = Matrix.from(arr1);
    let m2: MatrixMultiplier = Matrix.from(arr2);

    expect(() => {
      Matrix.multiply(m1, new Matrix());
    }).toThrow();

    let m3 = Matrix.multiply(m1, m2);

    expect(m3 instanceof Matrix).toBe(true);
    expect(m3.values).toEqual(arr3);
  });
});

describe('static .map', () => {
  test('map(fn)', () => {
    // prettier-ignore
    let arr1 = [
      [1, 2],
      [3, 4],
      [5, 6]
    ]
    let mapper: IMatrixMapper = (v) => v * 1.5;
    // prettier-ignore
    let arr2 = [
      [1.5, 3],
      [4.5, 6],
      [7.5, 9]
    ]
    let m1 = Matrix.from(arr1);
    let m2 = Matrix.map(m1, mapper);

    expect(m2 instanceof Matrix).toBe(true);
    expect(m2.rows).toBe(m1.rows);
    expect(m2.cols).toBe(m1.cols);
    expect(m2.values).toEqual(arr2);
  });
});

describe('static .product', () => {
  test('product(matrix, matrix)', () => {
    // prettier-ignore
    let arr1 = [
      [1, 2, 3],
      [4, 5, 6]
    ]
    // prettier-ignore
    let arr2 = [
      [3, 1],
      [4, 2],
      [5, 3]
    ]
    // prettier-ignore
    let arr3 = [
      [26, 14],
      [62, 32]
    ]

    let m1 = Matrix.from(arr1);
    let m2 = Matrix.from(arr2);

    expect(() => {
      Matrix.product(m1, new Matrix());
    }).toThrow();

    let m3 = Matrix.product(m1, m2);

    expect(m3 instanceof Matrix).toBe(true);
    expect(m3.rows).toBe(m1.rows);
    expect(m3.cols).toBe(m2.cols);
    expect(m3.values).toEqual(arr3);
  });
});

describe('static .transpose', () => {
  test('transpose(matrix)', () => {
    // prettier-ignore
    let arr1 = [
      [1, 2],
      [3, 4],
      [5, 6]
    ]
    // prettier-ignore
    let arr2 = [
      [1, 3, 5],
      [2, 4, 6]
    ]

    let m1 = Matrix.from(arr1);
    let m2 = Matrix.transpose(m1);

    expect(m2 instanceof Matrix).toBe(true);
    expect(m2.rows).toBe(m1.cols);
    expect(m2.cols).toBe(m1.rows);
    expect(m2.values).toEqual(arr2);
  });
});
