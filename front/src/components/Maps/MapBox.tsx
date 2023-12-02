import React from "react";
import Map, {
  Layer,
  MapLayerMouseEvent,
  Source,
  ViewStateChangeEvent,
  MapRef,
  PointLike,
  Popup,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState, useRef } from "react";
import { ACCESS_TOKEN } from "../../private/API";
import {
  geoLayer,
  searchLayer,
  overlayData,
  searchOverlayData,
  countyLayer,
  selectedCountyLayer,
} from "../functions/overlay.js";
import "../../styles/main.css";
import { Broadband } from "../functions/Broadband";

interface LatLong {
  lat: number;
  long: number;
}

interface MapBoxprops {
  updateHistory: (command: (string | string[][])[]) => void;
}

// Both of these are variables used to set a new overlay from the 
// searched keyword.
export var searchOverlay: GeoJSON.FeatureCollection | undefined;
export function setSearchOverlay(
  newData: GeoJSON.FeatureCollection | undefined
) {
  searchOverlay = newData;
}

export var popupCoords: LatLong = { long: -71.4128, lat: 41.824 };
export function setPopupCoords(
  newCoords: LatLong
) {
  popupCoords = newCoords;
}

// can be exported since search has to use it
// this sets the search data to be the features gotten 
// from the search function 
export const handleSearch = (keyword: string[]) => {
  searchOverlayData(keyword).then((data) => {
    setSearchOverlay(data);
  });
};

/**
 * Function that returns the information from the given feature
 * @param feature is received from a bbox
 * @returns an array that contains the state, county, and name of 
 * the feature. If any of those aren't defined it returns that 
 * it's not defined
 */
function getFeatureInfo(feature: GeoJSON.Feature): string[][] {
  var newResponse: string[][] = [];
  if (feature.properties) {
    if (feature.properties) {
      // this is a series of if statements
      // if any of them are undefined or null 
      // then it automatically sets the variable the
      // would be property to a statement saying its not defined
      const state: string = feature.properties.state
        ? feature.properties.state
        : "not defined in redlining data";
      const city: string = feature.properties.city
        ? feature.properties.city
        : "not defined in redlining data";

      const name: string = feature.properties.name
        ? feature.properties.name
        : "not defined in redlining data";

      newResponse = [
        ["State: ", state],
        ["City: ", city],
        ["Name: ", name],
      ];
    }
    // if the feature does not have properties it automatically 
    // returns this
  } else { 
    newResponse = [
      ["State: ", "not defined"],
      ["City: ", "not defined"],
      ["Name: ", "not defined"],
    ];
  }
  return newResponse;
}

function MapBox(props: MapBoxprops) {
  let ProvidenceLatLong: LatLong = { long: -71.4128, lat: 41.824 };
  let initialZoom = 12;

  async function onMapClick(e: MapLayerMouseEvent) {
    // gets lat and long from mouse click and turns it into a string
    var lat = e.lngLat.lat;
    var latitude = String(lat);
    var lon = e.lngLat.lng;
    var longitude = String(lon);

    var popupLatLon: LatLong = { long: lon, lat: lat };
    setPopupCoords(popupLatLon);


    // begins the response so that even if an error occurs, 
    // the specific lat and lon from the map is still shown
    var newResponse: string[][] = [
      ["latitude: ", latitude],
      ["longitude: ", longitude],
    ];
    var broadbandArray: Array<string> = [latitude, longitude];
    if (mapRef.current) {
      const bbox: [PointLike, PointLike] = [
        [e.point.x, e.point.y],
        [e.point.x, e.point.y],
      ];
      // Find features intersecting the bounding box.
      const selectedFeatures = mapRef.current.queryRenderedFeatures(bbox);
      if (selectedFeatures && selectedFeatures[0]) {
        var featureInfo = getFeatureInfo(selectedFeatures[0]);
        newResponse = newResponse.concat(featureInfo);
      }
    }
    // gets the broadbad from the broadband fuction to return with 
    // the info from the bbox
    var broadbandPercent = await Broadband(broadbandArray);
    // checks to be sure that the wanted information is in the form of an array
    if (Array.isArray(broadbandPercent)) {

      if(broadbandPercent.length > 4){
        // adds only the percent and the date/time the broadband was received
        newResponse.push(broadbandPercent[0]);
        newResponse.push(broadbandPercent[1]);
      }else{
        // if the response from broadband was an error returns the error
        newResponse = newResponse.concat(broadbandPercent);
      }
    }
    // sends the lat, lon, and other info to the history to be displayed
    props.updateHistory(["MapClick", newResponse]);
  }

  const [viewState, setViewState] = useState({
    longitude: ProvidenceLatLong.long,
    latitude: ProvidenceLatLong.lat,
    zoom: initialZoom,
  });
  

  const [overlay, setOverlay] = useState<GeoJSON.FeatureCollection | undefined>(
    undefined
  );
  // is only used once for the redlining overlay day
  useEffect(() => {
    overlayData().then((data) => {
      setOverlay(data);
    });
  }, []);

  const mapRef = useRef<MapRef>(null);

  return (
    <div className="mapbox-container" aria-label="Map Container">
      <Map
        
        mapboxAccessToken={ACCESS_TOKEN}
        {...viewState}
        // for moving the map
        onMove={(ev: ViewStateChangeEvent) => setViewState(ev.viewState)}
        // theme of map
        mapStyle={"mapbox://styles/mapbox/streets-v12"}
        onClick={(ev: MapLayerMouseEvent) => onMapClick(ev)}
        ref={mapRef}
      >
        <Source id="geo_data" type="geojson" data={overlay}>
          <Layer {...geoLayer} />
        </Source>
        <Source id="search_data" type="geojson" data={searchOverlay}>
          <Layer {...searchLayer} />
        </Source>
        <Source type="vector" url="mapbox://connorkrchen.akl8a8ou">
          <Layer {...countyLayer} />
          <Layer {...selectedCountyLayer} filter={['in', 'COUNTYNAME', 'Providence']}/>
        </Source>
        <Popup longitude={popupCoords.long} latitude={popupCoords.lat} closeOnClick={false}>
          Long: {popupCoords.long} <br></br>  Lat: {popupCoords.lat}
        </Popup>
      </Map>
    </div>
  );
}

export default MapBox;
