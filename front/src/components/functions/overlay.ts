import { FillLayer } from "react-map-gl";
import { FullOverLay } from "./FullOverlay.ts";
import { SOURCE_LAYER_ID } from "../../private/TilesetID";



// makes sure that the json type is a feature collection
function isFeatureCollection(json: any): json is GeoJSON.FeatureCollection {
  return json.type === "FeatureCollection";
}
// This makes the api call once for the features in the redlining data
// and then checks to be sure that the data is a FeatureCollection
export async function overlayData(): Promise<
  GeoJSON.FeatureCollection | undefined
> {
  return new Promise((resolve, reject) => {
    FullOverLay().then((data) => {
      resolve(isFeatureCollection(data) ? data : undefined);
    });
  });
}


export const countyLayer: FillLayer = {
  id: "counties",
  type: "fill",
  source: "counties",
  "source-layer": SOURCE_LAYER_ID,
  paint: {
    "fill-outline-color": 'rgba(0,0,0,0.3)',
    "fill-color": 'rgba(0,0,0,0.0)'
  }
};

export const selectedCountyLayer: FillLayer = {
  id: "counties-selected",
  type: "fill",
  source: "counties",
  "source-layer": SOURCE_LAYER_ID,
  paint: {
    'fill-outline-color': '#484896',
    'fill-color': '#ff59c7',
    'fill-opacity': 0.75
  },
}

export const hoverCountyLayer: FillLayer = {
  id: "county-hovered",
  type: "fill",
  source: "counties",
  "source-layer": SOURCE_LAYER_ID,
  paint: {
    'fill-outline-color': '#484896',
    'fill-color': '#F8C8DC',
    'fill-opacity': 0.7
  },
}


const employment = "unemployment_rate";
export const employmentLayer: FillLayer = {
  id: "county-employment-layer",
  type: "fill",
  paint: {
    "fill-color": "#943462",
    "fill-opacity":['*', 0.1, ["to-number",["get", employment]]] ,
  },
};

const labor = "labor_force";
export const laborLayer: FillLayer = {
  id: "county-labor-layer",
  type: "fill",
  paint: {
    "fill-color": "#4287f5",
    "fill-opacity": ["/", ["to-number", ["get", labor]], 4977558],
  },
};
const unemployed = "unemployed";
export const unemployedLayer: FillLayer = {
  id: "county-unemployed-layer",
  type: "fill",
  paint: {
    "fill-color": "#34bf3d",
    "fill-opacity": ["/", ["to-number", ["get", unemployed]], 49775],
  },
};
const employed = "employed";
export const employedLayer: FillLayer = {
  id: "county-employed-layer",
  type: "fill",
  paint: {
    "fill-color": "#dade66",
    "fill-opacity": ["/", ["to-number", ["get", employed]], 49775],
  },
};
