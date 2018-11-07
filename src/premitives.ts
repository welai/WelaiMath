/**
 * Welai premitives
 * @author Celestial Phineas
 * This file defines a series of premitives, including points,
 * segments, paths used for 
 */

/**
 * 
 */
namespace WelaiMath {
  /**
   * A point type is a combination of Array<number> type 
   * and a few utilities to make it as accessible as a point
   * @type
   */
  export type Point = number[] & {
    x: number, y: number
  };
  /**
   * A vector type is a combination of Array<number> type 
   * and a few utilities to make it as accessible as a vector
   * Usually, a vector is the difference between two points
   * TODO: to be fully implemented
   * @type
   */
  export type Vector = number[] & {
    x: number, y: number
  }
  /**
   * Segment is a combination of three points, the first control point,
   * the main point (on curve point) and the second control point
   * @type
   */
  export type Segment = Point[] & {
    cp1: Point, op: Point, cp2: Point
  };
  /**
   * Path is a list of segments, it represents a closed path in a glyph
   * @type
   */
  export type Path = Segment[];
  /**
   * Using the array as a point, this would create new properties
   * in the array object
   * @param array An array representation of a point: [x, y]
   */
  export function Point(array: number[]): Point;
  /**
   * Create a new point, with its interface same to an array
   * @param x X coordinate of a point
   * @param y Y coordinate of a point
   */
  export function Point(x: number, y: number): Point;
  export function Point(array: number[]): Point;
  export function Point(...args: any[]): Point {
    if(args as number[] && args.length === 2) {
      var a = args as number[];
    } else if(args[0] as number[]) {
      var a = args[0] as number[];
      if (a.length < 2) throw Error(`${a} is not a valid point.`);
    } else {
      throw Error(`Incompatible arguments ${args}`);
    }
    Object.defineProperty(a, 'x', {
      get: () => { return a[0]; },
      set: (newVal) => { a[0] = newVal; }
    });
    Object.defineProperty(a, 'y', {
      get: () => { return a[0]; },
      set: (newVal) => { a[1] = newVal; }
    });
    return a as Point;
  }
  export function Segment(cp1: Point, op: Point, cp2: Point): Segment;
  export function Segment(array: Point[]): Segment;
  export function Segment(...args: any[]): Segment {
    if(args as Point[] && args.length === 3) {
      var a = args as Point[];
    } else if(args[0] as Point[]) {
      var a = args[0] as Point[];
      if(a.length < 3) throw Error(`${a} is not a valid segment.`);
    } else {
      throw Error(`Incompatible arguments ${args}`);
    }
    Object.defineProperty(a, 'cp1', {
      get: () => { return a[0]; },
      set: (newVal) => { a[0] = newVal; }
    });
    Object.defineProperty(a, 'op', {
      get: () => { return a[1]; },
      set: (newVal) => { a[1] = newVal; }
    });
    Object.defineProperty(a, 'cp2', {
      get: () => { return a[2]; },
      set: (newVal) => { a[2] = newVal; }
    });
    return a as Segment;
  }
}
