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
type;
