import { cubic2welai, welai2cubic } from './caryll';
import * as Premitives from './premitives';

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
export default class Glyph {
  constructor(paths?: Premitives.Path[]) {
    if(!paths) this.paths = [];
    else {
      this.paths = paths.map(
        path => path.filter(segment => segment.length != 0).map(
          segment => {
            let seg = segment.slice();
            while(seg.length < 3) seg.push(seg[seg.length - 1]);
            while(seg.length > 3) seg.pop();
            return Premitives.Segment(seg.map(pair => Premitives.Point(pair)));
          }
        )
      );
    }
  }
  /**
   * Data represents each path in the format:
   * [[[[x1, y1], [cpx1, cpy1], [cpx2, cpy2]]: Segment, ...]: Path,...]
   */
  paths: Premitives.Path[];
  /**
   * Static method that construct a WelaiGlyph object from caryll representation
   * @param caryllPaths Cubic Bezier path in otfcc format
   */
  static fromCubicCaryll(caryllPaths: {x: number, y: number, on: boolean}[][]): Glyph {
    let result = new Glyph();
    result.paths = cubic2welai(caryllPaths);
    return result;
  }

  /**
   * Convert the glyph path to caryll cubic representation
   */
  toCubicCaryll(): {x: number, y: number, on: boolean}[][] {
    return welai2cubic(this.paths);
  }
}
