/// <reference path="./premitives.ts" />

/**
 * Welai glyph data representation
 * @class
 * The representation is segment-wise.
 * Unlike the common TrueType/PostScript representation,
 * which uses on/off points to represent paths, welai
 * representation represents each path in the format:
 * [[[[cpx1, cpy1], [x, y], [cpx2, cpy2]]: Segment, ...]: Path,...]
 * The welai glyphs always use cubic Bezier curves
 */
export default class WelaiGlyph {
  constructor();
  /**
   * Construct welai path
   * @constructor
   * @param paths 
   */
  constructor(paths: WelaiMath.Path[]);
  constructor(...args: any[]) {
    if(args.length = 0) this.paths = [];
    else if(args[0] as WelaiMath.Path[]) {
      let paths = args[0] as WelaiMath.Path[];
      this.paths = paths.map(
        path => path.filter(segment => segment.length != 0).map(
          segment => {
            let seg = segment.slice();
            while(seg.length < 3) seg.push(seg[seg.length - 1]);
            while(seg.length > 3) seg.pop();
            return WelaiMath.Segment(seg.map(pair => WelaiMath.Point(pair)));
          }
        )
      );
    } else {
      console.warn(`Invalid parameters ${args}`);
      this.paths = [];
    }
  }
  /**
   * Data represents each path in the format:
   * [[[[x1, y1], [cpx1, cpy1], [cpx2, cpy2]]: Segment, ...]: Path,...]
   */
  paths: WelaiMath.Path[];
}
