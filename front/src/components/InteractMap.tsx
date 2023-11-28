import Map, { Layer, MapLayerMouseEvent, Source, ViewStateChangeEvent, MapRef, PointLike, Popup } from "react-map-gl";
import { ACCESS_TOKEN } from "../private/api.js";
import { ProvidenceLatLong, initialZoom } from "../config/config.js"; 
import React, { useState, useEffect, useRef } from 'react'
import { overlayRLData, overlaySearchData, overlayIncomeData, geoLayer, searchLayer, incomeLayer } from "../overlays.js"; 
import "../styles/main.css";
import "mapbox-gl/dist/mapbox-gl.css";

export interface InteractMapProps {
  searchTerm:string;
}

function InteractMap(props:InteractMapProps) {
  const [popupInfo, setPopupInfo] = useState<{ name: string[]; state: string[], city:string[]} | null>(null);
  const [popupLoc, setPopupLoc] = useState<{ lat: number, long: number} | null>(null);

  const closePopup = () => {
    setPopupInfo(null);
  };
  
  const mapRef = useRef<MapRef>(null)

  const [viewState, setViewState] = useState({
    longitude: ProvidenceLatLong.long,
    latitude: ProvidenceLatLong.lat,
    zoom: initialZoom,
  });

  const [overlay, setOverlay] = useState<GeoJSON.FeatureCollection | undefined>(undefined);
  const [overlay_search, setOverlay_search] = useState<GeoJSON.FeatureCollection | undefined>(undefined);
  const [overlay_income, setOverlay_income] = useState<GeoJSON.FeatureCollection | undefined>(undefined);

  // useEffect(() => {
  //   setOverlay(overlayData());
  // }, []);

  useEffect(() => {
    async function fetchMyAPI() {
      setOverlay(await overlayRLData());
    }
    fetchMyAPI()
  }, [])

  useEffect(() => {
    async function fetchMyAPI() {
      setOverlay_income(await overlayIncomeData());
    }
    fetchMyAPI()
  }, [])

  useEffect(() => {
    async function fetchMyAPI() {
      setOverlay_search(await overlaySearchData(props.searchTerm));
    }
    fetchMyAPI()
  }, [props.searchTerm])

 function onMapClick(e: MapLayerMouseEvent) {
  console.log(e);
  console.log(e.lngLat.lat);
  console.log(e.lngLat.lng);


  const bbox: [PointLike, PointLike] = [
   [e.point.x - 5, e.point.y - 5],
   [e.point.x + 5, e.point.y + 5]
 ]

  var names : string[] = []
  var states : string[] = []
  var cities : string[] = []

 if (mapRef.current !== null) {
  const selectedFeatures = mapRef.current.queryRenderedFeatures(bbox, {
    layers: ['geo_data']
  })
  if(selectedFeatures !== null) {
    for (var feature of selectedFeatures) {
      if (feature.properties !== null) {
        names.push(feature.properties.name)
        states.push(feature.properties.state)
        cities.push(feature.properties.city)
      }
    }

  }
  // TODO: change this console.log to some sort of display to the user!
  console.log(names)
  console.log(states)
  console.log(cities)

  setPopupInfo(() => ({ 
      name: names,
      state: states,
      city: cities,
    }));
  }
  setPopupLoc(() => ({
    lat: e.lngLat.lat,
    long: e.lngLat.lng
  }))
 }
  

  return (
    <Map 
    mapboxAccessToken={ACCESS_TOKEN}
    longitude={viewState.longitude}
    latitude={viewState.latitude}
    zoom={viewState.zoom}
    onMove={(ev: ViewStateChangeEvent) => setViewState(ev.viewState)}
    style={{ width: window.innerWidth*0.66, height: window.innerHeight*0.66}}
    onClick={onMapClick}
    mapStyle={"mapbox://styles/mapbox/streets-v12"}
    ref={mapRef}>
      <Source id="geo_data" type="geojson" data={overlay}>
          <Layer id={geoLayer.id} type={geoLayer.type} paint={geoLayer.paint} />
      </Source>
      <Source id="income_data" type="geojson" data={overlay_income}>
          <Layer id={incomeLayer.id} type={incomeLayer.type} paint={incomeLayer.paint} />
      </Source>
      <Source id="search_data" type="geojson" data={overlay_search}>
          <Layer id={searchLayer.id} type={searchLayer.type} paint={searchLayer.paint} />
      </Source>
      <Popup
          latitude={popupLoc === null ? 0 : popupLoc.lat}
          longitude={popupLoc === null ? 0 : popupLoc.long}
          closeButton={true}
          closeOnClick={false}
          onClose={closePopup}
          anchor="top"
        >
          <div>
            <h2>Nearby Features:</h2>
            <p>State/States: {popupInfo === null ? "" : popupInfo.state.toString()}</p>
            <p>City/Cities: {popupInfo === null ? "" : popupInfo.city.toString()}</p>
            <p>Name/Names: {popupInfo === null ? "" : popupInfo.name.toString()}</p>
          </div>
        </Popup>
    </Map> 
    
  )
}





export default InteractMap