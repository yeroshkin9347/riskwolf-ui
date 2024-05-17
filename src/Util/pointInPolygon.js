const pointInPolygonNested = (point, vs, start, end) => {
  const x = point[0], y = point[1];
  let inside = false;
  if (start === undefined) start = 0;
  if (end === undefined) end = vs.length;
  const len = end - start;
  for (let i = 0, j = len - 1; i < len; j = i++) {
    const xi = vs[i+start][0], yi = vs[i+start][1];
    const xj = vs[j+start][0], yj = vs[j+start][1];
    const intersect = ((yi > y) !== (yj > y))
      && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
};

const pointInPolygonFlat = (point, vs, start, end) => {
  const x = point[0], y = point[1];
  let inside = false;
  if (start === undefined) start = 0;
  if (end === undefined) end = vs.length;
  const len = (end-start)/2;
  for (let i = 0, j = len - 1; i < len; j = i++) {
    const xi = vs[start + i * 2], yi = vs[start+i*2+1];
    const xj = vs[start + j * 2], yj = vs[start+j*2+1];
    const intersect = ((yi > y) !== (yj > y))
      && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
};

export const pointInPolygon = (point, vs, start, end) => {
  if (vs.length > 0 && Array.isArray(vs[0])) {
    return pointInPolygonNested(point, vs, start, end);
  } else {
    return pointInPolygonFlat(point, vs, start, end);
  }
}
