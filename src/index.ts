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
const WVFunction = weightedVoronoi<MySite>()
  .x(d => d.x)
  .y(d => d.y)
  .weight(d => d.weight)
  .size([500, 500]);
const Clipper = CL.loadNativeClipperLibInstanceAsync(
  CL.NativeClipperLibRequestedFormat.WasmWithAsmJsFallback
);
const polygonSites = (sites: MySite[]) => {
  const Isites = WVFunction(clone(sites)).map(poly => ({
    poly,
    site: poly.site.originalObject,
  }));
  Isites.map(is => {
    is.site.neighbours.clear();
    is.poly.site.neigbours.map(n =>
      is.site.neighbours.add(n.originalObject.id)
    );
  });
};

const render = (time: number) => {};
void (async () => {
  await Clipper;
  window.requestAnimationFrame(() => render(0));
})();
