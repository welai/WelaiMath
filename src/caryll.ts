/// <reference path="./premitives.ts" />

namespace WelaiMath {
  type CaryllPoint  = {x: number, y: number, on: boolean};
  type CaryllPath   = CaryllPoint[];
  /**
   * Converting Caryll otfcc PostScript path to welai representation
   * @param caryllPaths A cubic Bezier path represented in Caryll otfcc representation
   */
  export function cubic2welai(caryllPaths: CaryllPath[]): WelaiMath.Path[] {
    function pathConversion(caryllPath: CaryllPath): WelaiMath.Path {
      let path = caryllPath.slice();
      let result: WelaiMath.Path = [];
      while(path.length > 0) {
        let head = path[0];
        if(head.on) {
          if(result[result.length-1] && !result[result.length-1].op) {
            result[result.length-1].op = WelaiMath.Point(head.x, head.y);
          } else {
            result.push(WelaiMath.Segment(null, WelaiMath.Point(head.x, head.y), null));
          }
          path.splice(0, 1);
        } else {
          if(result[result.length-1] && !result[result.length-1].cp2) {
            result[result.length-1].cp2 = WelaiMath.Point(head.x, head.y);
          } else {
            result.push(WelaiMath.Segment(WelaiMath.Point(head.x, head.y), null, null));
          }
          path.splice(0, 1);
        }
      }
      // Fill the nulls
      let offEndFlag = false;
      for(let segment of result) {
        if(!segment.cp1) segment.cp1 = segment.op;
        if(!segment.cp2) segment.cp2 = segment.op
        if(!segment.op)  offEndFlag = true;
      }
      if(offEndFlag) {
        let last = result.pop();
        result[0].cp1 = last.cp1;
      }
      return result;
    }
    return caryllPaths.map(path => pathConversion(path));
  }
}
