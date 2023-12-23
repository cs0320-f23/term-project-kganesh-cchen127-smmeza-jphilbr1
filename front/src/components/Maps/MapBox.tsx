import React from "react";
import Map, {
  Layer,
  MapLayerMouseEvent,
  Source,
  ViewStateChangeEvent,
  MapRef,
  PointLike,
  LngLatLike,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState, useRef } from "react";
import { ACCESS_TOKEN } from "../../private/API";
import {
  overlayData,
  countyLayer,
  selectedCountyLayer,
  hoverCountyLayer,
  employmentLayer,
  laborLayer,
  employedLayer,
  unemployedLayer,
} from "../functions/overlay.ts";
import "../../styles/main.css";
import { TILESET_ID } from "../../private/TilesetID.ts";
import { ControlledInput } from "../Maps/ControlledInput.tsx";
import {
  convertToAbbreviation,
  convertToStateName,
} from "../functions/stateAbbreviations.ts";
import { RadioButtonGroup } from "./RadioButton.tsx";
import mapboxgl from "mapbox-gl";
import { MapsInfo } from "../Maps/MapsInfo.tsx";

/**
 * Interface for a call to the backend for a county
 */
interface CountyLoadResponse {
  data: number[];
  status: string;
}


interface LatLong {
  lat: number;
  long: number;
}

interface Layout {
  visibility: mapboxgl.Visibility;
}

interface MapBoxprops {
  isDark: boolean;
}

export var popupCoords: LatLong = { long: -71.4128, lat: 41.824 };

export function setPopupCoords(newCoords: LatLong) {
  popupCoords = newCoords;
}

function MapBox(props: MapBoxprops) {
  // Items for Map box
  let initialZoom = 4;

  // Retreive the map overlay component
  const mapOverlay = document.getElementById("county-overlay");

  async function onMapClick(e: MapLayerMouseEvent) {
    // gets lat and long from mouse click
    var lat = e.lngLat.lat;
    var lon = e.lngLat.lng;

    var longLat = [lat, lon];
    
    // Sets the long lat of the mouse click that will be sent to the mapsInfo component
    setInfoLongLat(longLat);

    if (mapRef.current) {
      const bbox: [PointLike, PointLike] = [
        [e.point.x, e.point.y],
        [e.point.x, e.point.y],
      ];
      // Find features intersecting the bounding box.
      const selectedFeatures = mapRef.current.queryRenderedFeatures(bbox);
      if (
        selectedFeatures &&
        selectedFeatures[0] &&
        selectedFeatures[0].properties &&
        mapRef.current.getZoom() > 2.979504743200094
      ) {
        setCountyState([
          selectedFeatures[0].properties.COUNTYNAME,
          convertToStateName(selectedFeatures[0].properties.STATE),
        ]);

        // Constructs a filter array for the overlay to highlight the selected county outline on the map
        const selectionArray = [
          "all",
          ["in", "COUNTYNAME", selectedFeatures[0].properties.COUNTYNAME],
          ["in", "STATE", selectedFeatures[0].properties.STATE],
        ];
        setFilterArray(selectionArray);

        // Sets the notification for the county that was selected
        setNotificationColor("success-notification");

        if (!(selectedFeatures[0].properties.COUNTYNAME === undefined)) {
          setSearchNotiText(
            selectedFeatures[0].properties.COUNTYNAME + " highlighted!"
          );
          setClassVisible("visible");
        }

        // Hides the notification after a short delay
        setTimeout(() => {
          setClassVisible("hidden");
        }, 3000);
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

  /**
   * Function that switches the visibitlitye of each employment/labor data layer 
   * @param wantedLayer the layer that should have the visible layer
   */
  function swtichVisibility(wantedLayer: string) {
    switch (wantedLayer) {
      case "Overlay 1": {
        setFirstVisiblity("visible");
        setSecondVisiblity("none");
        setThirdVisiblity("none");
        setFourthVisiblity("none");
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

  /**
   * Function that handles the hovering of the mouse over the map
   */
  async function onMouseMove(e: MapLayerMouseEvent) {
    if (mapRef.current) {
      mapRef.current.getCanvas().style.cursor = "pointer";
      const bbox: [PointLike, PointLike] = [
        [e.point.x, e.point.y],
        [e.point.x, e.point.y],
      ];

      // Queries the current features of the map
      const selectedFeatures = mapRef.current.queryRenderedFeatures(bbox);
      if (
        selectedFeatures &&
        selectedFeatures[0] &&
        selectedFeatures[0].properties &&
        mapOverlay
      ) {
        var hoveredCounty = selectedFeatures[0].properties.COUNTYNAME;
        var hoveredState = selectedFeatures[0].properties.STATE;

        // Generates the appropriate filter array for the overlay to highlight the county that was selected on the map
        if (hoveredCounty === undefined) {
          mapRef.current.getCanvas().style.cursor = "";
          const blankHoverArray = ["all", ["in", "COUNTYNAME", ""]];
          setHoverArray(blankHoverArray);
          mapOverlay.style.display = "none";
        } else {
          const selectedHoverArray = [
            "all",
            ["in", "COUNTYNAME", hoveredCounty],
            ["in", "STATE", hoveredState],
          ];
          setHoverArray(selectedHoverArray);

          // Construct the overlay to display in the top left of the map detailing the county and state that is currently being hovered over
          const title = document.createElement("strong");

          if (hoveredState === "LA") {
            title.textContent = hoveredCounty + " Parish";
          } else if (hoveredState === "AK") {
            title.textContent = hoveredCounty + " Borough";
          } else {
            title.textContent = hoveredCounty + " County";
          }
          const state = document.createElement("div");
          state.textContent = hoveredState;

          mapOverlay.innerHTML = "";
          mapOverlay.style.display = "block";

          mapOverlay.appendChild(title);
          mapOverlay.appendChild(state);
        }
      }
    }
  }

  /**
   * Function that handles what should happen when the user's cursor leaves the map
   */
  function onMouseOut(e: MapLayerMouseEvent) {
    if (mapRef.current && mapOverlay) {
      mapRef.current.getCanvas().style.cursor = "";
      const bbox: [PointLike, PointLike] = [
        [e.point.x, e.point.y],
        [e.point.x, e.point.y],
      ];
      const selectedFeatures = mapRef.current.queryRenderedFeatures(bbox);
      if (
        selectedFeatures &&
        selectedFeatures[0] &&
        selectedFeatures[0].properties &&
        mapOverlay
      ) {
        var hoveredCounty = selectedFeatures[0].properties.COUNTYNAME;
        const blankHoverArray = ["all", ["in", "COUNTYNAME", ""]];
        setHoverArray(blankHoverArray);
        mapOverlay.style.display = "none";
      }
    }
  }

  // Sets the initial state of the map
  const [viewState, setViewState] = useState({
    longitude: -95.7129,
    latitude: 37.0902,
    zoom: initialZoom,
  });

  const [overlay, setOverlay] = useState<GeoJSON.FeatureCollection | undefined>(
    undefined
  );

  // Initializes the overlay
  useEffect(() => {
    overlayData().then((data) => {
      setOverlay(data);
    });
  }, []);

  const mapRef = useRef<MapRef>(null);

  // items for the input
  const [commandString, setCommandList] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("no state");
  const [filterArray, setFilterArray] = useState<
    (string | (string | undefined)[])[]
  >([]);
  const [hoverArray, setHoverArray] = useState<
    (string | (string | undefined)[])[]
  >([]);
  const [selectedLatLong, setSelectedLatLong] = useState<LngLatLike>();
  const [classVisible, setClassVisible] = useState<string>("hidden");
  const [searchNotiText, setSearchNotiText] = useState<string>("");
  const [notificationColor, setNotificationColor] = useState<string>(
    "success-notification"
  );
  const [countyState, setCountyState] = useState<string[]>([
    "no-county",
    "no-state",
  ]);
  const [infoLongLat, setInfoLongLat] = useState<number[]>();

  // Helper function that creates the request to the backend with the selected county and state and returns the result
  async function getCountyLatLonAPI(args: Array<string>): Promise<string> {
    if (args.length === 2) {
      const url: string =
        "https://csci-term-project-backend.onrender.com/zoom?county=" +
        args[0] +
        "&state=" +
        args[1];
      const result = await fetch(url).then((response) => response.json());
      return result;
    }
    return "";
  }

  // Helper function that utilizes the backend to retrieve the lat-lon coordinates of a selected county
  async function getCountyLatLon(
    args: Array<string>
  ): Promise<{ status: string; data?: any }> {
    try {
      const jsonResponse = await getCountyLatLonAPI(args);

      if (isCountyLoadResponse(jsonResponse)) {
        if (jsonResponse.status === "success") {
          let lonLatCounty: number[] = [
            jsonResponse.data[1],
            jsonResponse.data[0],
          ];
          let latLonCenter: LngLatLike = [
            jsonResponse.data[0],
            jsonResponse.data[1],
          ];
          setInfoLongLat(lonLatCounty);
          setSelectedLatLong(latLonCenter);
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

  // Effect that pan the map over to the selected county that the user entered through the search bar
  useEffect(() => {
    mapRef.current?.flyTo({
      center: selectedLatLong,
      zoom: 7,
      speed: 2,
      essential: true,
    });
  }, [selectedLatLong]);

  // Helper function that formats the command string to the county we want
  function formatCountyCommandString(commandString: string): string {
    const words = commandString.toLowerCase().split(" ");

    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );

    const lastWord = capitalizedWords[capitalizedWords.length - 1];

    const suffixesToRemove = ["County", "Parish", "Borough"];

    if (suffixesToRemove.includes(lastWord)) {
      capitalizedWords.pop();
    }

    const formattedString = capitalizedWords.join(" ");

    return formattedString;
  }

  /**
   * Function that handles search bar functionality
   */
  async function handleButtonClick(
    commandString: string,
    selectedState: string,
    setCommandString: React.Dispatch<React.SetStateAction<string>>,
    setFilterArray: React.Dispatch<
      React.SetStateAction<(string | (string | undefined)[])[]>
    >,
    mapRef: React.RefObject<MapRef>
  ) {
    // Standardizes the command string/dropdown selected state in order to use later on
    const formattedCounty = formatCountyCommandString(commandString);
    const formattedCountyURL = formattedCounty.replace(/ /g, "%20");
    const formattedState = selectedState.replace(/ /g, "%20");
    const stateAbbrv = convertToAbbreviation(selectedState);

    // Generate the filter array
    const selectionArray = [
      "all",
      ["in", "COUNTYNAME", formattedCounty],
      ["in", "STATE", stateAbbrv],
    ];
    setFilterArray(selectionArray);

    // Get the lat-long result from the call to the backend with the help of this helper function
    let zoomResult = await getCountyLatLon([
      formattedCountyURL,
      formattedState,
    ]);

    // Prepares the notification to be shown depending on the result
    if (selectedState === "no state") {
      setNotificationColor("error-notification");
      setSearchNotiText("Please select a state!");
    } else if (zoomResult.status === "error") {
      setNotificationColor("error-notification");
      setSearchNotiText('"' + commandString + '" ' + "not found!");
    } else {
      setNotificationColor("success-notification");
      setSearchNotiText(formattedCounty + " highlighted!");
    }
    setClassVisible("visible");

    setTimeout(() => {
      setClassVisible("hidden");
    }, 3000);

    setCountyState([formattedCounty, selectedState]);
    // these reset th inputs so that each time something is entered
    // it goes back to the original state/erases the other input data
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
            {/* these are the overlays that correlate to the radio
            buttons, they all use the same source */}
            <Source id="number_data" type="geojson" data={overlay}>
              <Layer {...employmentLayer} layout={visibilityOne} />
              <Layer {...laborLayer} layout={visibilityTwo} />
              <Layer {...unemployedLayer} layout={visibilityThree} />
              <Layer {...employedLayer} layout={visibilityFour} />
            </Source>

            <Source id="county-data" type="vector" url={TILESET_ID}>
              {/* This layer changes outline colors depending on if the app
              is in dark mode or now */}
              <Layer
                {...countyLayer}
                paint={
                  props.isDark
                    ? {
                        "fill-outline-color": "rgba(250, 245, 250,0.3)",
                        "fill-color": "rgba(0,0,0,0.0)",
                      }
                    : {
                        "fill-outline-color": "rgba(0,0,0,0.3)",
                        "fill-color": "rgba(0,0,0,0.0)",
                      }
                }
              />
              <Layer {...hoverCountyLayer} filter={hoverArray} />
              <Layer {...selectedCountyLayer} filter={filterArray} />
            </Source>
            <div id="county-overlay" className="county-overlay"></div>
          </Map>
        </div>
        <div className="right" aria-label="">
          <MapsInfo
            countyState={countyState}
            selectedLongLat={infoLongLat}
          ></MapsInfo>
        </div>
      </div>
      <div className="bottom">
        <div className={classVisible}>
          <p
            className={notificationColor}
            aria-label="Notification"
            aria-roledescription="Used to show if a county is able to be found"
          >
            {searchNotiText}
          </p>
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
