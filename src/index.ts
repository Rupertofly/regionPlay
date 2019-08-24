//
import { select } from 'd3';
import { weightedVoronoi, WVPolygon } from 'd3-weighted-voronoi';
import * as CL from 'js-angusj-clipper';
import Noise = require('noisejs');
import { clone } from 'ramda';
import { MySite } from './datatypes';
let canvas = select('#section');
const [WID, HEI] = [500, 500];
const ctx = canvas
  .append('canvas')
  .attr('width', WID)
  .attr('height', HEI)
  .node()
  .getContext('2d');
const N = new Noise(Math.random());
const WVFunction = weightedVoronoi()
  .x(d => d.x)
  .y(d => d.y)
  .weight(d => d.w)
  .size([500, 500]);
const Clipper = CL.loadNativeClipperLibInstanceAsync(
  CL.NativeClipperLibRequestedFormat.WasmWithAsmJsFallback
);
const weightedLloyd = (time: number, pg: WVPolygon<MySite>) => {
  const out = clone(pg);
  pg.site.neigbours.map(s => out.original);
};
const render = (time: number) => {};
void (async () => {
  await Clipper;
  window.requestAnimationFrame(() => render(0));
})();
