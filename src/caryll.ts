import * as Premitives from './premitives';

export type CaryllPoint  = {x: number, y: number, on: boolean};
export type CaryllPath   = CaryllPoint[];
/**
 * Converting Caryll otfcc PostScript path to welai representation
 * @param caryllPaths A cubic Bezier path represented in Caryll otfcc representation
 */
export function cubic2welai(caryllPaths: CaryllPath[]): Premitives.Path[] {
  function pathConversion(caryllPath: CaryllPath): Premitives.Path {
    let path = caryllPath.slice();
    let result: Premitives.Path = [];
    while(path.length > 0) {
      let head = path[0];
      if(head.on) {
        if(result[result.length-1] && !result[result.length-1].op) {
          result[result.length-1].op = Premitives.Point(head.x, head.y);
        } else {
          result.push(Premitives.Segment(null, Premitives.Point(head.x, head.y), null));
        }
        path.splice(0, 1);
      } else {
        if(result[result.length-1] && !result[result.length-1].cp2) {
          result[result.length-1].cp2 = Premitives.Point(head.x, head.y);
        } else {
          result.push(Premitives.Segment(Premitives.Point(head.x, head.y), null, null));
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

/**
 * Converting welai representation to Caryll cubic path format with point merging
 * but no path operations
 * @param welaiPaths Paths in welai representation
 */
export function welai2cubic(welaiPaths: Premitives.Path[]): CaryllPath[] {
  // Eliminating points
  let paths = welaiPaths.map(
    path => path.map(
      segment => {
        let flag1 = true, flag2 = true;
        if(segment.cp1.equals(segment.op)) flag1 = false;
        if(segment.cp2.equals(segment.op)) flag2 = false;
        return Premitives.Segment(
          flag1?Premitives.Point(segment.cp1):null,
          Premitives.Point(segment.op),
          flag2?Premitives.Point(segment.cp2):null
        );
  }));
  // Flatten
  let result = paths.map(
    path => {
      let result: CaryllPath = [];
      if(path.length != 0) {
        // Push the first on point
        result.push({x: path[0].op.x, y: path[0].op.y, on: true});
        if(path[0].cp2) result.push({x: path[0].cp2.x, y: path[0].cp2.y, on: false});
        for(let i = 1; i < path.length; i++) {
          let segment = path[i];
          if(segment.cp1) result.push({x: segment.cp1.x, y: segment.cp1.y, on: false});
          if(segment.op)  result.push({x: segment.op.x,  y: segment.op.y,  on: true });
          if(segment.cp2) result.push({x: segment.cp2.x, y: segment.cp2.y, on: false});
        }
        // Push the last point
        if(path[0].cp1) result.push({x: path[0].cp1.x, y: path[0].cp1.y, on: false});
      }
      return result;
    }
  );
  return result;
}
