import { FeatureCollection } from "geojson";
import { FillLayer } from "react-map-gl";
// import rl_data from "./geodata/fullDownload.json";
import default_data from "./geodata/temp.json"


function isFeatureCollection(json: any): json is FeatureCollection {
  console.log("isFeatureCollection running")  
  return json.type === "FeatureCollection";
}

async function getRLData() {
  return await fetch("http://localhost:3232/redline?minLat=-1000&minLon=-1000&maxLat=1000&maxLon=1000")
    .then(response => response.json())
    .then(json => json.redline_data)
}

export async function overlayRLData(): Promise<GeoJSON.FeatureCollection | undefined> {
  const rl_data = await getRLData();  
  console.log("overlayRLData() says: ")
  console.log(rl_data)
  return (
      isFeatureCollection(rl_data)) ? rl_data : undefined
  };

const propertyName = "holc_grade";

export const geoLayer: FillLayer = {
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
 };


 async function getSearchData(keyword:string) {
  return await fetch("http://localhost:3232/search-redline?keyword=" + keyword)
    .then(response => response.json())
    .then(json => json.redline_data)
}

export async function overlaySearchData(keyword:string): Promise<GeoJSON.FeatureCollection | undefined> {
  const search_data = await getSearchData(keyword);  
  console.log("overlaySearchData() says: ")
  console.log(search_data)
  return (
      isFeatureCollection(search_data)) ? search_data : undefined
  };

 export const searchLayer: FillLayer = {
  id: "search_data",
  type: "fill",
  paint: {
    "fill-color": [
      "match",
      ["get", propertyName],
      "A",
      "#962afa",
      "B",
      "#962afa",
      "C",
      "#962afa",
      "D",
      "#962afa",
      "#962afa",
    ],
     "fill-opacity": 0.5,
   },
  };



  async function getIncomeData() {
    return await fetch("http://localhost:3232/geobroadband?")
      .then(response => response.json())
      .then(json => json.income_data)
  }
  
  export async function overlayIncomeData(): Promise<GeoJSON.FeatureCollection | undefined> {
    const income_data = await getIncomeData();  
    console.log("overlayIncomeData() says: ")
    console.log(income_data)
    return (
        isFeatureCollection(income_data)) ? income_data : undefined
    };
  
    const propertyName2 = "income";
    
    // TODO: BUG IN INCOME CUTOFFS!

   export const incomeLayer: FillLayer = {
    id: "income_data",
    type: "fill",
    paint: {
      "fill-color": [
        "match",
        ["get", propertyName2],
        "A",
        "#e6ecf5",
        "B",
        "#c4d7f5",
        "C",
        "#95b9f0",
        "D",
        "#72a5f2",
        "E",
        "#4a8bed",
        "#962afa",
      ],
       "fill-opacity": 0.5,
     },
    };