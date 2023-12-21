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
  overlayData,
  countyLayer,
  selectedCountyLayer,
  hoverCountyLayer,
  employmentLayer,
  laborLayer,
  employedLayer,
  unemployedLayer
} from "../functions/overlay.ts";
import "../../styles/main.css";
import { SOURCE_LAYER_ID, TILESET_ID } from "../../private/TilesetID.ts";
import { ControlledInput } from "../Maps/ControlledInput.tsx";
import { convertToAbbreviation, convertToStateName } from "../stateAbbreviations.ts";
import { RadioButtonGroup } from "./RadioButton.tsx";
import { county_data } from "../functions/CountyParse.ts";
import { mockOverlayData, sectionMockOverlayData, firstMockOverlayData} from "../functions/MockJSON.ts"
import mapboxgl from "mapbox-gl";
import { MapsInfo } from "../Maps/MapsInfo.tsx";
import { useColorScheme } from "../../darkModeComponents/usecolorScheme.ts";


interface CountyLoadResponse {
  data: number[]
  status: string;
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
  isDark;
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
  let initialZoom = 4;

  const mapOverlay = document.getElementById('county-overlay');

  async function onMapClick(e: MapLayerMouseEvent) {
    // gets lat and long from mouse click and turns it into a string
    var lat = e.lngLat.lat;
    var latitude = String(lat);
    var lon = e.lngLat.lng;
    var longitude = String(lon);

    var longLat = [lat, lon]
    setInfoLongLat(longLat);


    // begins the response so that even if an error occurs, 
    // the specific lat and lon from the map is still shown
    // var newResponse: string[][] = [
    //   ["latitude: ", latitude],
    //   ["longitude: ", longitude],
    // ];
    // var broadbandArray: Array<string> = [latitude, longitude];
    // var recommendationResponse:string[][] = [
    //   ["recommendation", "omg"],
    //   ["mouse click", "omg"]
    // ]
    if (mapRef.current) {
      const bbox: [PointLike, PointLike] = [
        [e.point.x, e.point.y],
        [e.point.x, e.point.y],
      ];
      // Find features intersecting the bounding box.
      const selectedFeatures = mapRef.current.queryRenderedFeatures(bbox);
      if (selectedFeatures && selectedFeatures[0] && selectedFeatures[0].properties && mapRef.current.getZoom() > 2.979504743200094) {
        console.log("asdfasdfasdfas", mapRef.current.getZoom());
        setCountyState([selectedFeatures[0].properties.COUNTYNAME, convertToStateName(selectedFeatures[0].properties.STATE)])
        // var featureInfo = getFeatureInfo(selectedFeatures[0]);
        // newResponse = newResponse.concat(featureInfo);
        const selectionArray = [
          "all",
          ["in", "COUNTYNAME", selectedFeatures[0].properties.COUNTYNAME],
          ["in", "STATE", selectedFeatures[0].properties.STATE],
        ];
        setFilterArray(selectionArray);
        setNotificationColor("success-notification")

        if (!(selectedFeatures[0].properties.COUNTYNAME === undefined)) {
          setSearchNotiText(selectedFeatures[0].properties.COUNTYNAME + " highlighted!")
          setClassVisible("visible");
        }

        setTimeout(() => {
          setClassVisible("hidden");
        }, 3000)
        
    }

    
    }
  }

  // this is for setting the visibililities of each layer for the radio buttons 
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
  const [thirdVisibility, setThirdVisiblity] =
    useState<mapboxgl.Visibility>("none");
  const [fourthVisibility, setFourthVisiblity] =
    useState<mapboxgl.Visibility>("none");
  var visibilityThree: Layout = {
    visibility: thirdVisibility,
  };
  var visibilityFour: Layout = {
    visibility: fourthVisibility,
  };

  function swtichVisibility(wantedLayer: string) {
    switch (wantedLayer) {
      case "Overlay 1": {
        setFirstVisiblity("visible");
        setSecondVisiblity("none");
        setThirdVisiblity("none");
        setFourthVisiblity("none");
        console.log("changed to overlay1");
        break;
      }
      case "Overlay 2": {
        setFirstVisiblity("none");
        setSecondVisiblity("visible");
        setThirdVisiblity("none");
        setFourthVisiblity("none");
        break;
      }
      case "Overlay 3": {
        setFirstVisiblity("none");
        setSecondVisiblity("none");
        setThirdVisiblity("visible");
        setFourthVisiblity("none");
        break;
      }
      case "Overlay 4": {
        setFirstVisiblity("none");
        setSecondVisiblity("none");
        setThirdVisiblity("none");
        setFourthVisiblity("visible");
        break;
      }
      default: {
        setFirstVisiblity("none");
        setSecondVisiblity("none");
        setThirdVisiblity("none");
        setFourthVisiblity("none");
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

  const [overlay, setOverlay] = useState<GeoJSON.FeatureCollection | undefined>(
    undefined
  );
  useEffect(() => {
    overlayData().then((data) => {
      setOverlay(data);
    });
  }, []);


  const mapRef = useRef<MapRef>(null);

  // items for the input
  const [commandString, setCommandList] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("no state");
  const [filterArray, setFilterArray] = useState<(string | (string | undefined)[])[]>([]);
  const [hoverArray, setHoverArray] = useState<(string | (string | undefined)[])[]>([]);
  const [selectedLatLong, setSelectedLatLong] = useState<LngLatLike>();
  const [classVisible, setClassVisible] = useState<string>("hidden");
  const [searchNotiText, setSearchNotiText] = useState<string>("");
  const [notificationColor, setNotificationColor] = useState<string>("success-notification");
  const [countyState, setCountyState] = useState<string[]>(["no-county", "no-state"]);
  const [infoLongLat, setInfoLongLat] = useState<number[]>();
  const { isDark, setIsDark } = useColorScheme();

  // useEffect(() => {
  //   if (mapRef.current == null) {
  //     return;
  //   }
  //   // const highlightedFeatures = mapRef.current.queryRenderedFeatures(undefined, { layers: ['counties-selected'] });
  //   // console.log(highlightedFeatures)

  //   const features = mapRef.current.querySourceFeatures('county-data', {
  //     sourceLayer: "c_19se23-4rtu37",
  //     filter: [
  //       "all",
  //       ["in", "COUNTYNAME", "Middlesex"],
  //       ["in", "STATE", "NJ"],
  //     ],
  //   });
  //   console.log(features);
  // })

  async function getCountyLatLonAPI(args: Array<string>): Promise<string> {
    if (args.length === 2) {
      const url: string = 
      "https://csci-term-project-backend.onrender.com/zoom?county=" + args[0] + "&state=" + args[1];
      const result = await fetch(url)
      .then((response) => response.json());
      return result;
    }
    return "";
  }
    
  
  async function getCountyLatLon(args: Array<string>): Promise<{ status: string, data?: any }> {
    try {
      const jsonResponse = await getCountyLatLonAPI(args);
      console.log("hi1", jsonResponse);
  
      if (isCountyLoadResponse(jsonResponse)) {
        if (jsonResponse.status === "success") {
          let lonLatCounty: number[] = [jsonResponse.data[1], jsonResponse.data[0]]
          let latLonCenter: LngLatLike = [jsonResponse.data[0], jsonResponse.data[1]];
          setInfoLongLat(lonLatCounty)
          setSelectedLatLong(latLonCenter)
          return { status: "success", data: latLonCenter };
        } else {
          return { status: "error" };
        }
      } else {
        return { status: "error" };
      }
    } catch (error) {
      return { status: "error" };
    }
  }
  

  useEffect(() => {
    mapRef.current?.flyTo({
      center: selectedLatLong,
      zoom: 7,
      speed: 2,
      essential: true,
    })
  }, [selectedLatLong])

  function formatCountyCommandString(commandString: string): string {
    const words = commandString.toLowerCase().split(' ');
    
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    
    const lastWord = capitalizedWords[capitalizedWords.length - 1];
   
    const suffixesToRemove = ['County', 'Parish', 'Borough'];
    
    if (suffixesToRemove.includes(lastWord)) {
      capitalizedWords.pop();
    }

    const formattedString = capitalizedWords.join(' ');

    return formattedString;
  }


  
  async function handleButtonClick(commandString: string, selectedState: string, updateHistory: (command: (string | string[][])[]) => void, setCommandString: React.Dispatch<React.SetStateAction<string>>, setFilterArray: React.Dispatch<React.SetStateAction<(string | (string | undefined)[])[]>>, mapRef: React.RefObject<MapRef>){  

    const formattedCounty = formatCountyCommandString(commandString);
    const formattedCountyURL = formattedCounty.replace(/ /g, "%20")
    const formattedState = selectedState.replace(/ /g, "%20")
    const stateAbbrv = convertToAbbreviation(selectedState);
      const selectionArray = [
        "all",
        ["in", "COUNTYNAME", formattedCounty],
        ["in", "STATE", stateAbbrv],
      ];
      setFilterArray(selectionArray);
      let zoomResult = await getCountyLatLon([formattedCountyURL, formattedState])
      // console.log("county=" + commandString, selectedLatLong)
      // console.log("state", selectedState.length);
      if ((selectedState === "no state")) {
        setNotificationColor("error-notification")
        setSearchNotiText("Please select a state!")
      }
      else if (zoomResult.status === "error") {
        setNotificationColor("error-notification")
        setSearchNotiText('"' + commandString + '" ' + "not found!")
      }
      else {
        setNotificationColor("success-notification")
        setSearchNotiText(formattedCounty + " highlighted!")
       
      }
      setClassVisible("visible");

      setTimeout(() => {
        setClassVisible("hidden");
      }, 3000)
      setCountyState([formattedCounty, selectedState])
      setCommandString("");
      setSelectedState("no state");
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
            mapStyle={
              props.isDark
                ? "mapbox://styles/mapbox/dark-v11"
                : "mapbox://styles/mapbox/streets-v12"
            }
            onClick={(ev: MapLayerMouseEvent) => onMapClick(ev)}
            onMouseMove={(ev: MapLayerMouseEvent) => onMouseMove(ev)}
            onMouseOut={(ev: MapLayerMouseEvent) => onMouseOut(ev)}
            ref={mapRef}
          >
            <Source id="number_data" type="geojson" data={overlay}>
              <Layer
                id={employmentLayer.id}
                type={employmentLayer.type}
                paint={employmentLayer.paint}
                layout={visibilityOne}
              />
              <Layer
                id={laborLayer.id}
                type={laborLayer.type}
                paint={laborLayer.paint}
                layout={visibilityTwo}
              />
              <Layer
                id={unemployedLayer.id}
                type={unemployedLayer.type}
                paint={unemployedLayer.paint}
                layout={visibilityThree}
              />
              <Layer
                id={employedLayer.id}
                type={employedLayer.type}
                paint={employedLayer.paint}
                layout={visibilityFour}
              />
            </Source>

            <Source id="county-data" type="vector" url={TILESET_ID}>
              <Layer {...countyLayer} paint={props.isDark? {
    "fill-outline-color": 'rgba(0,0,0,0.3)',
    "fill-color": 'rgba(0,0,0,0.0)'
  }: {
    "fill-outline-color": 'rgba(250, 245, 250,0.3)',
    "fill-color": 'rgba(0,0,0,0.0)'
  }} 
                />
              <Layer {...hoverCountyLayer} filter={hoverArray} />
              <Layer {...selectedCountyLayer} filter={filterArray} />
            </Source>
            <div id="county-overlay" className="county-overlay"></div>
          </Map>
        </div>
        <div className="right">
          {/* <MapsHistory history={props.history} mode={props.mode}/> */}
          <MapsInfo
            countyState={countyState}
            selectedLongLat={infoLongLat}
          ></MapsInfo>
          {/* <div className="side-panel">

          </div> */}
        </div>
        {/* <MapsInfo
            countyState={countyState}
            selectedLongLat={infoLongLat}></MapsInfo> */}
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
    if (!("status" in rjson)) return false;
    return true;
  }




export default MapBox;
