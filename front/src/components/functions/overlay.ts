import { FillLayer } from "react-map-gl";
import { ClickOverLay } from "./click";
import { SearchOverLay } from "./Search";
import { SOURCE_LAYER_ID } from "../../private/TilesetID";
import mapboxgl from "mapbox-gl";


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
    ClickOverLay(["", "", "", ""]).then((data) => {
      resolve(isFeatureCollection(data) ? data : undefined);
    });
  });
}

// This makes the api call for the features with the keyword
// and then checks to be sure that the data is a FeatureCollection
export async function searchOverlayData(
  keyword: string[]
): Promise<GeoJSON.FeatureCollection | undefined> {
  return new Promise((resolve, reject) => {
    SearchOverLay(keyword).then((data) => {
      console.log(keyword);
      resolve(isFeatureCollection(data) ? data : undefined);
    });
  });
}


var firstVisibility: mapboxgl.Visibility = "visible";
function setFirstVisiblity(visiblity: mapboxgl.Visibility) {
  firstVisibility = visiblity;
}

var secondVisibility: mapboxgl.Visibility = "none";
function setSecondVisiblity(visiblity: mapboxgl.Visibility) {
  secondVisibility = visiblity;
}

export function swtichVisibility(wantedLayer: string){
  switch(wantedLayer){
    case "Overlay 1":{
      setFirstVisiblity('visible');
      setSecondVisiblity('none')
      console.log("changed to overlay1");
      console.log(geoLayer.layout?.visibility);
      console.log(searchLayer.layout?.visibility);
      break;
    }
    case "Overlay 2": {
      setFirstVisiblity('none');
      setSecondVisiblity('visible');
      console.log("changed to overlay2");
      console.log(searchLayer.layout?.visibility);
      console.log(geoLayer.layout?.visibility);
      break;
    }
    default:{
      setFirstVisiblity('none');
      setSecondVisiblity('none');
      break;
    }
  }
}



const propertyName = "holc_grade";
export var geoLayer: FillLayer = {
  id: "geo_data",
  type: "fill",
  paint: {
    "fill-color": [
      "match",
      ["get", propertyName],
      "A",
      "#5bcc04",
      "B",
      "#04b8cc",
      "C",
      "#e9ed0e",
      "D",
      "#d11d1d",
      "#ccc",
    ],
    "fill-opacity": 0.2,
  },
  layout: {
    'visibility': firstVisibility,
  },
};

export var searchLayer: FillLayer = {
  id: "search_data",
  type: "fill",
  paint: {
    "fill-color": "#3604cc",
    "fill-opacity": 0.2,
  }, 
  layout:{
    'visibility': secondVisibility
  }
};

export const countyLayer: FillLayer = {
  id: "counties",
  type: "fill",
  source: "counties",
  "source-layer": SOURCE_LAYER_ID,
  paint: {
    "fill-outline-color": 'rgba(0,0,0,1)',
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
  layout:{
    'visibility': 'visible'
  }
}


