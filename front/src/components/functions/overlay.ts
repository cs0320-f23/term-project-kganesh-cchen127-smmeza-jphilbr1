import { FillLayer } from "react-map-gl";
// import { FullOverLay } from "./FullOverlay.ts";
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


/**
 * This colors each county with an opacity that relates to the unemployment rate
 */
const employment = "unemployment_rate";
export const employmentLayer: FillLayer = {
  id: "county-employment-layer",
  type: "fill",
  paint: {
    "fill-color": "#943462",
    "fill-opacity":['*', 0.1, ["to-number",["get", employment]]] ,
  },
};

/**
 * this collors each county with an opacity that relates 
 * to the labor force in each county, wich is calculated using the 
 * largest labor force
 */
const labor = "labor_force";
export const laborLayer: FillLayer = {
  id: "county-labor-layer",
  type: "fill",
  paint: {
    "fill-color": "#4287f5",
    "fill-opacity": ["/", ["ln", ["+",["to-number", ["get", labor], 1]]], ["ln", ["+", 1, 4977558]]],
  },
};
/**
 * this collors each county with an opacity that relates 
 * to the unemployment in each county, wich is calculated using the 
 * largest unemployed county
 */
const unemployed = "unemployed";
export const unemployedLayer: FillLayer = {
  id: "county-unemployed-layer",
  type: "fill",
  paint: {
    "fill-color": "#34bf3d",
    "fill-opacity": [
      "/",
      ["ln", ["+", ["to-number", ["get", unemployed], 1]]],
      ["ln", ["+", 1, 609830]],
    ],

  },
};
/**
 * this collors each county with an opacity that relates 
 * to the employment in each county, wich is calculated using the 
 * largest employed county
 */
const employed = "employed";
export const employedLayer: FillLayer = {
  id: "county-employed-layer",
  type: "fill",
  paint: {
    "fill-color": "#dade66",
    "fill-opacity": [
      "/",
      ["ln", ["+", ["to-number", ["get", employed], 1]]],
      ["ln", ["+", 1, 4730138]],
    ],
  },
};

/**
 * This gets the full data from the backend to use for each
 * overlay that uses the data from the backend
 * @returns a GeoJSON that contains shapes for each county along with
 * employment data from each county
 */
export const FullOverLay = async (): Promise<
  GeoJSON.FeatureCollection | undefined
> => {
  var newResponse: undefined | GeoJSON.FeatureCollection = undefined;

  try {
    // trys to access the server
    const website = await fetch(
      "https://csci-term-project-backend.onrender.com/full_data"
    );
    const json = await website.json();
    const result = json.status;
    // checks that there isn't an error
    if (result === "success") {
      const overlayData: GeoJSON.FeatureCollection = json.data;
      newResponse = overlayData;
    }
    // this is the catch for if the server is down
  } catch (err) {
    console.log(err);
    newResponse = undefined;
  }
  // returns the server response
  return newResponse;
};