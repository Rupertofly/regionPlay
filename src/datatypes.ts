import { polygonCentroid } from 'd3';
import { WVPolygon } from 'd3-weighted-voronoi';
import { clone } from 'ramda';

export class MySite {
  id: number;
  x: number = 0;
  y: number = 0;
  weight: number = 1;
  height: number = 1;
  color: string = 'white';
  neighbours: Set<number> = new Set();
  distanceFrom: Map<number, number> = new Map();
}
interface IsitePoly {
  site: MySite;
  poly: WVPolygon<MySite>;
}
export const sitePoly: (site: MySite, poly: WVPolygon<MySite>) => IsitePoly = (
  site,
  poly
) => ({ site, poly });
export function djikstra(sites: MySite[], startID: number) {
  const frontier = new Array<number>();
  frontier.push(startID);
  const costSoFar = new Map<number, number>();
  costSoFar.set(startID, 0);
  while (frontier.length > 0) {
    const currentID = frontier.pop();
    const current = sites[currentID];
    current.neighbours.forEach(i => {
      const site = sites[i];
      const thisCost =
        costSoFar[currentID] + (Math.abs(current.height - site.height) + 1);
      if (!costSoFar.has(i) || thisCost < costSoFar.get(i)) {
        costSoFar.set(i, thisCost);
        frontier.push(i);
      }
    });
  }
  const newSites = clone(sites);
  costSoFar.forEach(val => {
    newSites[val[0]].distanceFrom.set(startID, val[1]);
  });
  return newSites;
}
export const weightedLloyd = (time: number, pg: IsitePoly, nSource: Noise) => {
  const out = clone(pg);
  const [cx, cy] = polygonCentroid(out.poly);
  const nw = nSource.simplex3(cx / 100, cy / 100, time / 500);
  out.site.x = cx;
  out.site.y = cy;
  out.site.weight = nw;
  return out;
};
