import { WVPolygon } from 'd3-weighted-voronoi';

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
