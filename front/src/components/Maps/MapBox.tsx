import React from "react";
import Map, {
  Layer,
  MapLayerMouseEvent,
  Source,
  ViewStateChangeEvent,
  MapRef,
  PointLike,
  Popup,
  LngLatLike,
  MapLayerTouchEvent,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState, useRef } from "react";
import { ACCESS_TOKEN, COUNTY_API } from "../../private/API";
import {
  geoLayer,
  searchLayer,
  overlayData,
  searchOverlayData,
  countyLayer,
  selectedCountyLayer,
  // swtichVisibility
  hoverCountyLayer,
  employmentLayer,
  laborLayer
} from "../functions/overlay.ts";
import "../../styles/main.css";
import { Broadband } from "../functions/Broadband.ts";
import { SOURCE_LAYER_ID, TILESET_ID } from "../../private/TilesetID.ts";
import { ControlledInput } from "../Maps/ControlledInput.tsx";
import { convertToAbbreviation } from "../stateAbbreviations.ts";
import { RadioButtonGroup } from "./RadioButton.tsx";
import { MapsHistory } from "../Maps/MapsHistory.tsx";
import { county_data } from "../functions/CountyParse.ts";
import { mockOverlayData, sectionMockOverlayData, firstMockOverlayData, secondMockOverlayData} from "../functions/MockOverlay.ts"
import mapboxgl from "mapbox-gl";

interface CountyLoadResponse {
  state: string;
  latitude: number;
  longitude: number;
}

interface LatLong {
  lat: number;
  long: number;
}

interface Layout{
  visibility : mapboxgl.Visibility;
}

interface MapBoxprops {
  updateHistory: (command: (string | string[][])[]) => void;
  history: (string | string[][])[][];
  mode: boolean;
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

  // Items for Map box
  // let ProvidenceLatLong: LatLong = { long: -71.4128, lat: 41.824 };
  let initialZoom = 4;

  const mapOverlay = document.getElementById('county-overlay');

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
    // var broadbandArray: Array<string> = [latitude, longitude];
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
    // // gets the broadbad from the broadband fuction to return with 
    // // the info from the bbox
    // var broadbandPercent = await Broadband(broadbandArray);
    // // checks to be sure that the wanted information is in the form of an array
    // if (Array.isArray(broadbandPercent)) {

    //   if(broadbandPercent.length > 4){
    //     // adds only the percent and the date/time the broadband was received
    //     newResponse.push(broadbandPercent[0]);
    //     newResponse.push(broadbandPercent[1]);
    //   }else{
    //     // if the response from broadband was an error returns the error
    //     newResponse = newResponse.concat(broadbandPercent);
    //   }
    // }
    // sends the lat, lon, and other info to the history to be displayed
    props.updateHistory(["MapClick", newResponse]);
  }

  const [firstVisibility, setFirstVisiblity] =
    useState<mapboxgl.Visibility>("visible");
  const [secondVisibility, setSecondVisiblity] =
    useState<mapboxgl.Visibility>("none");
  var visibilityOne: Layout = {
    visibility: firstVisibility,
  };

  var visibilityTwo: Layout = {
    visibility: secondVisibility,
  };

  function swtichVisibility(wantedLayer: string) {
    switch (wantedLayer) {
      case "Overlay 1": {
        setFirstVisiblity("visible");
        setSecondVisiblity("none");
        console.log("changed to overlay1");
        console.log(geoLayer.layout?.visibility);
        console.log(searchLayer.layout?.visibility);
        break;
      }
      case "Overlay 2": {
        setFirstVisiblity("none");
        setSecondVisiblity("visible");
        console.log("changed to overlay2");
        console.log(searchLayer.layout?.visibility);
        console.log(geoLayer.layout?.visibility);
        break;
      }
      default: {
        setFirstVisiblity("none");
        setSecondVisiblity("none");
        break;
      }
    }
  }


  async function onMouseMove(e: MapLayerMouseEvent) {
    if (mapRef.current) {
      mapRef.current.getCanvas().style.cursor = 'pointer';
      const bbox: [PointLike, PointLike] = [
        [e.point.x, e.point.y],
        [e.point.x, e.point.y],
      ];
      const selectedFeatures = mapRef.current.queryRenderedFeatures(bbox);
      if (selectedFeatures && selectedFeatures[0] && selectedFeatures[0].properties && mapOverlay) {
        var hoveredCounty = selectedFeatures[0].properties.COUNTYNAME;
        var hoveredState = selectedFeatures[0].properties.STATE
      // console.log(mapRef.current.queryRenderedFeatures()[0])
      // if (feature) {
      //   // const feature = e.features[0];
      //   // if (feature.properties) {
      //   // const county = mapRef.current.querySourceFeatures('county-hovered', {
      //   //   sourceLayer: SOURCE_LAYER_ID,
      //   //   filter: ['all', 
      //   //             ['in', 'COUNTYNAME', feature.properties.COUNTYNAME]]
      //   // }); 
      if (hoveredCounty === undefined) {
        mapRef.current.getCanvas().style.cursor = '';
        const blankHoverArray = ['all', ['in', 'COUNTYNAME', '']]
        setHoverArray(blankHoverArray)
        mapOverlay.style.display = 'none';
        console.log("help me")
      }

      else {
        const selectedHoverArray = ['all', 
        ['in', 'COUNTYNAME', hoveredCounty],
        ['in', 'STATE', hoveredState]];
        setHoverArray(selectedHoverArray)

        const title = document.createElement('strong');

        if (hoveredState === "LA") {
          title.textContent = hoveredCounty + " Parish";
        }
        else if (hoveredState === "AK") {
          title.textContent = hoveredCounty + " Borough";
        }
        else {
          title.textContent = hoveredCounty + " County";
        }
        const state = document.createElement('div');
        state.textContent = hoveredState;

        mapOverlay.innerHTML = '';
        mapOverlay.style.display = 'block';

        mapOverlay.appendChild(title);
        mapOverlay.appendChild(state);
      }
    }
    }
  }

  function onMouseOut(e: MapLayerMouseEvent) {
    if (mapRef.current && mapOverlay) {
      mapRef.current.getCanvas().style.cursor = '';
      const bbox: [PointLike, PointLike] = [
        [e.point.x, e.point.y],
        [e.point.x, e.point.y],
      ];
      const selectedFeatures = mapRef.current.queryRenderedFeatures(bbox);
      if (selectedFeatures && selectedFeatures[0] && selectedFeatures[0].properties && mapOverlay) {
        var hoveredCounty = selectedFeatures[0].properties.COUNTYNAME;
        console.log(hoveredCounty)
        const blankHoverArray = ['all', ['in', 'COUNTYNAME', '']]
        setHoverArray(blankHoverArray)
        mapOverlay.style.display = 'none';
        console.log("help me")
      }
    }
  }


  const [viewState, setViewState] = useState({
    longitude: -95.7129,
    latitude: 37.0902,
    zoom: initialZoom,
  });
  // const [overlay, setOverlay] = useState<GeoJSON.FeatureCollection | undefined>(
  //   undefined
  // );

  const [employmentOverlay, setEmploymentOverlay] = useState<GeoJSON.FeatureCollection | undefined>(
    undefined
  );

  const [laborOverlay, setLaborOverlay] = useState<GeoJSON.FeatureCollection | undefined>(undefined);

  
  // is only used once for the redlining overlay data
  // useEffect(() => {
  //   mockOverlayData().then((data) => {
  //     setOverlay(data);
  //   });
  // }, []);

  // useEffect(() => {
  //   sectionMockOverlayData().then((data) => {
  //     setSearchOverlay(data);
  //   });
  // }, []);

  useEffect(() => {
    firstMockOverlayData().then((data) => {
      setEmploymentOverlay(data);
    });
  }, []);

  useEffect(() => {
    firstMockOverlayData().then((data) => {
      setLaborOverlay(data);
    });
  }, []);

  const mapRef = useRef<MapRef>(null);

  // items for the input
  const [commandString, setCommandList] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [filterArray, setFilterArray] = useState<(string | (string | undefined)[])[]>([]);
  const [hoverArray, setHoverArray] = useState<(string | (string | undefined)[])[]>([]);
  const [selectedLatLong, setSelectedLatLong] = useState<LngLatLike>();
  const [classVisible, setClassVisible] = useState<string>("hidden");
  const [searchNotiText, setSearchNotiText] = useState<string>("");
  const [notificationColor, setNotificationColor] = useState<string>("success-notification");

  useEffect(() => {
    if (mapRef.current == null) {
      return;
    }
    // const highlightedFeatures = mapRef.current.queryRenderedFeatures(undefined, { layers: ['counties-selected'] });
    // console.log(highlightedFeatures)

    const features = mapRef.current.querySourceFeatures('county-data', {
      sourceLayer: "c_19se23-4rtu37",
      filter: [
        "all",
        ["in", "COUNTYNAME", "Middlesex"],
        ["in", "STATE", "NJ"],
      ],
    });
    console.log(features);
  })

  async function getCountyLatLonAPI(args: Array<string>): Promise<string> {
    if (args.length === 2) {
      const url: string = 
      'https://api.api-ninjas.com/v1/geocoding?city=' + args[0];
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'X-Api-Key': COUNTY_API,
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          const result = await response.json();
          return result;
        } else {
          // console.error('Error:', response.status, response.statusText);
        }
      } catch (error) {
        // console.error('Error:', error);
      }
    }
    return "";
  }
  
  async function getCountyLatLon(args: Array<string>) {
    let state = args[1];
    let jsonResponse = getCountyLatLonAPI(args);
    jsonResponse.then((responseObject) => {
      for (const result of responseObject) {
        if (isCountyLoadResponse(result)) {
          if (result.state === state) {
            let latLon: LngLatLike = [result.longitude, result.latitude]
            setSelectedLatLong(latLon);
          }
      }
      }
    })
  }

  useEffect(() => {
    mapRef.current?.flyTo({
      center: selectedLatLong,
      zoom: 8,
      speed: 2,
      essential: true,
    })
  }, [selectedLatLong])
  
  function handleButtonClick(commandString: string, selectedState: string, updateHistory: (command: (string | string[][])[]) => void, setCommandString: React.Dispatch<React.SetStateAction<string>>, setFilterArray: React.Dispatch<React.SetStateAction<(string | (string | undefined)[])[]>>, mapRef: React.RefObject<MapRef>){  
    const stateAbbrv = convertToAbbreviation(selectedState);
      const selectionArray = [
        "all",
        ["in", "COUNTYNAME", commandString],
        ["in", "STATE", stateAbbrv],
      ];
      setFilterArray(selectionArray);
      updateHistory(["state",selectedState])
      setCommandString("");
  
      getCountyLatLon([commandString, selectedState])
      // console.log("county=" + commandString, selectedLatLong)
      // console.log("state", selectedState.length);
      if (selectedState.length === 0) {
        setNotificationColor("error-notification")
        setSearchNotiText("Please select a state!")
      }
      else {
        setNotificationColor("success-notification")
        setSearchNotiText(commandString + " highlighted!")
      }
      setClassVisible("visible");

      setTimeout(() => {
        setClassVisible("hidden");
      }, 3000)
  }

  return (
    <div className="maps">
      <div className="map-items">
        <div className="left">
          <RadioButtonGroup onChange={swtichVisibility} />
        </div>

        <div className="mapbox-container center" aria-label="Map Container">
          <Map
            mapboxAccessToken={ACCESS_TOKEN}
            {...viewState}
            // for moving the map
            onMove={(ev: ViewStateChangeEvent) => setViewState(ev.viewState)}
            // theme of map
            mapStyle={"mapbox://styles/mapbox/streets-v12"}
            onClick={(ev: MapLayerMouseEvent) => onMapClick(ev)}
            onMouseMove={(ev: MapLayerMouseEvent) => onMouseMove(ev)}
            onMouseOut={(ev: MapLayerMouseEvent) => onMouseOut(ev)}
            ref={mapRef}
          >
            {/* <Source id="geo_data" type="geojson" data={overlay}>
              <Layer
                id={geoLayer.id}
                type={geoLayer.type}
                paint={geoLayer.paint}
                layout={visibilityOne}
              />
            </Source>
            <Source id="search_data" type="geojson" data={searchOverlay}>
              <Layer
                id={searchLayer.id}
                type={searchLayer.type}
                paint={searchLayer.paint}
                layout={visibilityTwo}
              />
            </Source> */}

            <Source id="em_data" type="geojson" data={employmentOverlay}>
              <Layer
                id={employmentLayer.id}
                type={employmentLayer.type}
                paint={employmentLayer.paint}
                layout={visibilityOne}
              />
            </Source>
            <Source id="labor_data" type="geojson" data={laborOverlay}>
              <Layer
                id={laborLayer.id}
                type={laborLayer.type}
                paint={laborLayer.paint}
                layout={visibilityTwo}
              />
            </Source>

            <Source id="county-data" type="vector" url={TILESET_ID}>
              <Layer {...countyLayer} />
              <Layer {...hoverCountyLayer} filter={hoverArray} />
              <Layer {...selectedCountyLayer} filter={filterArray} />
            </Source>
            <div id="county-overlay" className="county-overlay"></div>
          </Map>
        </div>
        <div className="right">
          {/* <MapsHistory history={props.history} mode={props.mode}/> */}
          {/* <div className="side-panel">

          </div> */}
        </div>
      </div>
      <div className="bottom">
        <div className={classVisible}>
          <p className={notificationColor}>{searchNotiText}</p>
        </div>
        <div className="maps-input">
          <ControlledInput
            value={commandString}
            setValue={setCommandList}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            ariaLabel={"Command input"}
            onKeyDown={() =>
              handleButtonClick(
                commandString,
                selectedState,
                props.updateHistory,
                setCommandList,
                setFilterArray,
                mapRef
              )
            }
          />
          <button
            className="submit-button"
            aria-label="Submit Button"
            aria-roledescription="Click or press Enter to submit"
            onClick={() =>
              handleButtonClick(
                commandString,
                selectedState,
                props.updateHistory,
                setCommandList,
                setFilterArray,
                mapRef
              )
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                () =>
                  handleButtonClick(
                    commandString,
                    selectedState,
                    props.updateHistory,
                    setCommandList,
                    setFilterArray,
                    mapRef
                  );
              }
            }}
          >
            Enter!
          </button>
        </div>
      </div>
    </div>
  );
}






  /**
   * Function that checks whether the response is an CountyLoadResponse
   * @param rjson any json file
   * @returns boolean whether the response is an CountyLoadResponse
   */
  function isCountyLoadResponse(rjson: any): rjson is CountyLoadResponse {
    if (!("state" in rjson)) return false;
    if (!("latitude" in rjson)) return false;
    if (!("longitude" in rjson)) return false;
    return true;
  }




export default MapBox;
