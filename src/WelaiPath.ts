/**
 * Welai path representation
 * @class
 * The representation is segment-wise.
 * Unlike the common TrueType/PostScript representation,
 * which uses on/off points to represent paths, welai
 * representation represents each path in the format:
 * [[[[x1, y1], [cpx1, cpy1], [cpx2, cpy2]]: Segment, ...]: Path,...]
 */
namespace WelaiMath {
  export class Point extends Array<number> {
    private verify(point: Point) { if(point.length < 2) throw Error(`${this} is not a valid point`); }
    set x(newVal: number) { this[0] = newVal; }
    get x()               { this.verify(this); return this[0]; }
    set y(newVal: number) { this[1] = newVal; }
    get y()               { this.verify(this); return this[1]; }
  }
}
export default class WelaiPath {
  hello() {
    let a: WelaiMath.Point = [1, 2] as WelaiMath.Point;
    console.log([a, a.x, a.y]);
    let b = [1] as WelaiMath.Point;
    console.log([b, b.x, b.y]);
  }
} 
