import { throws } from "assert";
import { isUndefined } from "util";

/**
 * Wezier premitives
 * @author Celestial Phineas
 * This file defines premitives
 */

/** Interface for a 2D point */
interface Point { x: number, y: number }
interface ControlPoint extends Point { on: boolean }

export class WezierPoint implements ControlPoint {
  x = 0; y = 0; on = true;
  
  constructor(x: number, y: number, on?: boolean) {
    this.x = x; this.y = y;
    if(!isUndefined(on)) this.on = on;
  }
  clone(): WezierPoint {
    return new WezierPoint(this.x, this.y, this.on);
  }

  /**
   * Left matrix multiplication
   * The argument has to be a 2x2 or 3x3 matrix
   * @throws Matrix dimension error
   */
  lmat(mat: number[][]) {
    // Get matrix dimension
    let dim = 0;
    if(mat.length === 2) {
      dim = 2;
      for(let i = 0; i < 2; i++) if(mat[i].length !== 2) dim = 0;
    }
    if(mat.length === 3) {
      dim = 3;
      for(let i = 0; i < 3; i++) if(mat[i].length !== 3) dim = 0;
    }
    // Throws if incompatible array structure
    if(!dim) throw Error(`Incompatible array ${mat} for left mulitplication.`);
    // 2x2 matrix
    if(dim === 2) {
      const [ [a, b], [c, d] ] = mat;
      const [ x, y ] = [ this.x, this.y ];
      this.x = a * x + b * y;
      this.y = c * x + d * y;
    } else { // 3x3 matrix
      const [ [a, b, c], [d, e, f], [g, h, i] ] = mat;
      const [ x, y ] = [ this.x, this.y ];
      const r = g * x + h * y + i;
      this.x = (a * x + b * y + c)/r;
      this.y = (d * x + e * y + c)/r;
    }
  }

  /** Translate point */
  translate(dx: number, dy: number) {
    this.x += dx; this.y += dy;
  }

  /** Rotate point */
  rotate(theta: number, center?: Point) {
    const [ cost, sint ] = [ Math.cos(theta), Math.sin(theta) ];
    const [ x0, y0] = isUndefined(center) ? [0, 0] : [center.x, center.y];
    const [ x, y ] = [ this.x, this.y ];
    this.x = (x - x0) * cost - (y - y0) * sint + x0;
    this.y = (x - x0) * sint + (y - y0) * cost + y0;
  }

  /** Scale point */
  scale(ratio: number, center?: Point) {
    const [ x0, y0 ] = isUndefined(center) ? [0, 0] : [center.x, center.y];
    const [ x, y ] = [ this.x, this.y ];
    this.x = (x - x0) * ratio + x0;
    this.y = (y - y0) * ratio + y0;
  }
}

/** The function construct a point from an array or a point  */
export function p(param: number[] | Point): WezierPoint {
  let x: number, y: number;
  if(Array.isArray(param)) {
    const coord = param as number[];
    [x, y] = coord;
  } else {
    const point = param as Point;
    x = point.x; y = point.y;
  }
  return new WezierPoint(x || 0, y || 0);
}
