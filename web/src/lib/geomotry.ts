import { mat2d, vec2 } from 'gl-matrix';
export const getTranslationMatrix = (delta: [number, number]) => {
  const [dx, dy] = delta;
  const matrix = mat2d.create();
  mat2d.translate(matrix, matrix, vec2.fromValues(dx, dy));
  return matrix;
};
// import { Draw, Geometry } from '..';
export const translateContext = (
  ctx: CanvasRenderingContext2D,
  delta: [number, number]
) => {
  const matrix = getTranslationMatrix(delta);

  applyMatrixToContext(ctx, matrix);
  return matrix;
};

export const applyMatrixToContext = (
  ctx: CanvasRenderingContext2D,
  matrix: mat2d
) => {
  ctx.transform(
    matrix[0],
    matrix[1],
    matrix[2],
    matrix[3],
    matrix[4],
    matrix[5]
  );
};

export const Geometry = {
  getTranslationMatrix,
  translateContext,
  applyMatrixToContext,
};
