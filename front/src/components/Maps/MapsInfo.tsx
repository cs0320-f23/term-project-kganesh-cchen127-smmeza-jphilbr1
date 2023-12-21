import React from "react";
import "../../styles/main.css";
import { StageSpinner } from "react-spinners-kit"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser, faQuestion, faOilWell, faFire, faTree, faCubes, faPercent, faBottleWater, faDroplet, faAtom, faCube, faBolt, faIndustry, faCoins, faGasPump, faSeedling, faMicrochip, faBattery, faRing, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import Tooltip from '@mui/material/Tooltip';

interface MapsInfoProps {
    countyState: string[]
    selectedLongLat: number[] | undefined;
}

/**
 * Interface that defines the shape of the result from the call to the backend
 */
interface UnemploymentLoadResponse {
    breakdown: UnemploymentDataResponse;
    rec: RecommendationData;
}

/**
 * Interface defining one of the properties of the UnemploymentLoadResponse
 */
interface UnemploymentDataResponse {
    data: UnemploymentData;
    status: string;
}

interface UnemploymentData {
    [key: string]: string;
}

/**
 * Interface defining one of the properties of the UnemploymentLoadResponse
 */
interface RecommendationData {
  longs: string[];
  shorts: string[],
}

export function MapsInfo(props: MapsInfoProps) {
    const [unemploymentData, setUnemploymentData] = useState<UnemploymentData>({});
    const [maxValue, setMaxValue] = useState<number>(10000);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [recommendationData, setRecommendationData] = useState<RecommendationData>();
    const [initialLoad, setInitialLoad] = useState<boolean>(true);
    const [county, setCounty] = useState<string>("no county");
    const [state, setState] = useState<string>("no state");

    // Whenever a new county + state is selected by the user, activate this effect
    useEffect(() => {
        retrieveUnemploymentData(props.selectedLongLat);
        setTimeout(() => {
            setCounty(props.countyState[0]);
            setState(props.countyState[1]);
        }, 100)
        console.log("whaddup", state);
    }, [props.countyState])

    /**
     * Function that generates the request to the backend for data on the selected lat and long.
     */
    async function accessUnemploymentData(args: number[]): Promise<string> {
        if (args.length === 2) {
            const url: string =
            "https://csci-term-project-backend.onrender.com/detailed_data?latitude=" + args[0] + "&longitude=" + args[1];
            const result = await fetch(url);
            if (result.status === 500) {
                // Handles the default load screen on start up
                setInitialLoad(true);
            } 
            else {
               return result.json();
            }
        }
        return "";
    }

    const [selectedTab, setSelectedTab] = useState("recommendPanel");

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };


    /**
     * Function that handles the request to the backend
     */
    async function retrieveUnemploymentData(lngLat: number[] | undefined) {
        if (lngLat) {
            try {
                // Activate hte loading screen
                setInitialLoad(false);
                setIsLoading(true);
                const jsonResponse = await accessUnemploymentData(lngLat);
                if (isUnemploymentLoadResopnse(jsonResponse)) {
                    let data = jsonResponse.breakdown.data
                    let rec = jsonResponse.rec;

                    // Set the data and deactivate the loading screen
                    setUnemploymentData(data);
                    setRecommendationData(rec);
                    setIsLoading(false);
                }
            } catch (error) {
        }
    }
    }

    function isUnemploymentLoadResopnse(rjson: any): rjson is UnemploymentLoadResponse {
        if (!("breakdown" in rjson)) return false;
        return true;
    }


    let keys = Object.keys(unemploymentData);
    let values: number[] = []

    // Consolidates all of the resulting values into an array
    keys.forEach((key) => {
        if (!(unemploymentData[key] === "-")) {
            values.push(parseInt(unemploymentData[key]))
        }
        else {
            values.push(-1)
        }
    })

    // Finds the maximum value of the data
    useEffect(() => {
        let maximum = findMaxValue(values);
        if (maximum) {
            setMaxValue(maximum);
        }
    }, [unemploymentData])


    // Effect that sets the height of all the bars in the bar group as well as creating the animation
    useEffect(() => {
        const bars = document.querySelectorAll('.bars li .bar') as NodeListOf<HTMLDivElement>;
        let index = 0
        bars.forEach((bar) => {
        let amount = (values[index] / (maxValue * 1.1)) * 100; // Get the value dynamically

        if (!(values[index] === -1)) {
            bar.style.height = `${amount}%`;
            bar.style.background = "#FFC0CB";
            bar.style.opacity = "1";
            bar.animate(
            { height: [0, amount] },
            {
                duration: 1000,
                easing: 'ease-out',
                fill: 'forwards',
            }
            );
            bar.animate(
                { opacity: [1, 1]},
                {
                    duration: 1000,
                    easing: 'ease-out',
                    fill: 'forwards',
                }
                );
            
        }
        // Handles the case if there is no employment data provided
        else if (values[index] === -1) {
            bar.style.height = "100%";
            bar.style.background = "repeating-linear-gradient(45deg,#e5cece,#ccbdbd 10px,#968f8f 10px,#7c7575 20px)";
            bar.style.opacity = "0";
            bar.animate(
                { opacity: [0, 0.35] },
                {
                    duration: 1000,
                    easing: 'ease-out',
                    fill: 'forwards',
                }
                );
        }
        index ++
        });

      }, [maxValue]);


      function findMaxValue(numbers: number[]): number | undefined {
        if (numbers.length === 0) {
          // Return undefined for an empty list
          return undefined;
        }
      
        // Use the reduce function to find the maximum value
        const maxValue = numbers.reduce((max, current) => (current > max ? current : max), numbers[0]);
      
        return maxValue;
      }



    return (
      <>
        <div
          id="maps-info"
          className="maps-info"
          tabIndex={0}
          aria-label="County information"
        >
          <div className="maps-info-container">
            {isLoading && (
              <div className="loading-screen">
                <StageSpinner size="100" color="#EB9FEF" loading={isLoading} />
              </div>
            )}
            {initialLoad && (
              <div className="default-screen">
                <i>Select a US county on the map to view data!</i>
              </div>
            )}

            <div className="tab-container">
              <button
                className={selectedTab === "recommendPanel" ? "active" : ""}
                onClick={() => handleTabClick("recommendPanel")}
                aria-label="Recommendation Button"
                aria-roledescription="Click here to see the hold and short recommendations for the county"
              >
                Recommendations
              </button>
              <button
                className={selectedTab === "unempPanel" ? "active" : ""}
                onClick={() => handleTabClick("unempPanel")}
                aria-label="Unemployment Button"
                aria-roledescription="Click here to see the employment data for the county"
              >
                Employment Data
              </button>
            </div>

            <div className="side-panels">
              <div
                className={`side-panel ${
                  selectedTab === "recommendPanel" ? "active" : ""
                }`}
              >
                <div className="info-header">
                  <b>
                    {county}{" "}
                    {state === "Louisiana"
                      ? "Parish"
                      : state === "Alaska"
                      ? "Borough"
                      : "County"}{" "}
                  </b>
                </div>
                <div className="info-subheader">{state}</div>

                <div className="two-sided-table">
                    <div className="table-section-left">
                        <h2>Hold</h2>
                        <table>
                        <tbody>
                            {recommendationData?.longs.map((cellData, index) => (
                                <tr key={index}>
                                    <td>
                                    <Tooltip arrow placement="top" title={commodityHover(cellData)}>
                                    <FontAwesomeIcon className="icon" icon={chooseIcon(cellData)} />     
                                    </Tooltip>                                   
                                    {(cellData.charAt(0).toUpperCase() + cellData.slice(1)).replace(/_/g, ' ')}
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="table-section-right">
                        <h2>Short</h2>
                        <table>
                        <tbody>
                            {recommendationData?.shorts.map((cellData, index) => (
                                    <tr key={index}>                                      
                                        <td>
                                            <Tooltip arrow placement="top" title={commodityHover(cellData)}>
                                            <FontAwesomeIcon className="icon" icon={chooseIcon(cellData)} />  
                                            </Tooltip>
                                            {(cellData.charAt(0).toUpperCase() + cellData.slice(1)).replace(/_/g, ' ')}
                                            
                                        </td>
                                    </tr>
                                    ))}
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
              </div>

              <div
                className={`side-panel ${
                  selectedTab === "unempPanel" ? "active" : ""
                }`}
              >
                <div className="info-header">
                  <b>
                    {county}{" "}
                    {state === "Louisiana"
                      ? "Parish"
                      : state === "Alaska"
                      ? "Borough"
                      : "County"}{" "}
                  </b>
                </div>
                <div className="info-subheader">{state}</div>
                <div className="chart">
                  <ul className="numbers">
                    <li>
                      <span>{maxValue}</span>
                    </li>
                    <li>
                      <span>{maxValue / 2}</span>
                    </li>
                    <li>
                      <span>0</span>
                    </li>
                  </ul>
                  <ul className="bars">
                    <li>
                      <div
                        className="bar"
                        unemp-amount={
                          values[0] === -1
                            ? "no employment data"
                            : `${values[0]} employed`
                        }
                      ></div>
                      <span>Construction</span>
                    </li>
                    <li>
                      <div
                        className="bar"
                        unemp-amount={
                          values[1] === -1
                            ? "no employment data"
                            : `${values[1]} employed`
                        }
                      ></div>
                      <span>Education & Health</span>
                    </li>
                    <li>
                      <div
                        className="bar"
                        unemp-amount={
                          values[2] === -1
                            ? "no employment data"
                            : `${values[2]} employed`
                        }
                      ></div>
                      <span>Finance</span>
                    </li>
                    <li>
                      <div
                        className="bar"
                        unemp-amount={
                          values[3] === -1
                            ? "no employment data"
                            : `${values[3]} employed`
                        }
                      ></div>
                      <span>Information</span>
                    </li>
                    <li>
                      <div
                        className="bar"
                        unemp-amount={
                          values[4] === -1
                            ? "no employment data"
                            : `${values[4]} employed`
                        }
                      ></div>
                      <span>Leisure & Hospitality</span>
                    </li>
                    <li>
                      <div
                        className="bar"
                        unemp-amount={
                          values[5] === -1
                            ? "no employment data"
                            : `${values[5]} employed`
                        }
                      ></div>
                      <span>Manufacturing</span>
                    </li>
                    <li>
                      <div
                        className="bar"
                        unemp-amount={
                          values[6] === -1
                            ? "no employment data"
                            : `${values[6]} employed`
                        }
                      ></div>
                      <span>Mining</span>
                    </li>
                    <li>
                      <div
                        className="bar"
                        unemp-amount={
                          values[7] === -1
                            ? "no employment data"
                            : `${values[7]} employed`
                        }
                      ></div>
                      <span>Other services</span>
                    </li>
                    <li>
                      <div
                        className="bar"
                        unemp-amount={
                          values[8] === -1
                            ? "no employment data"
                            : `${values[8]} employed`
                        }
                      ></div>
                      <span>Professional services</span>
                    </li>
                    <li>
                      <div
                        className="bar"
                        unemp-amount={
                          values[9] === -1
                            ? "no employment data"
                            : `${values[9]} employed`
                        }
                      ></div>
                      <span>Trade, Transport & Utilities</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
      </>
    );
}

/**
 * Function that sets the icon for the appropriate commodity
 */
function chooseIcon(commodity: string): IconDefinition {
    switch (commodity) {
        case "oil":
            return faOilWell;
        case "coal":
            return faFire;
        case "timber":
            return faTree;
        case "copper":
            return faCoins;
        case "interest_rates":
            return faPercent;
        case "plastic":
            return faBottleWater;
        case "propane":
            return faDroplet;
        case "molybdenum":
            return faAtom;
        case "iron":
            return faCube;
        case "electricity":
            return faBolt;
        case "steel":
            return faIndustry;
        case "aluminum":
            return faCubes;
        case "gasoline":
            return faGasPump;
        case "ethanol":
            return faSeedling;
        case "silicon":
            return faMicrochip;
        case "cobalt":
            return faBattery;
        case "gold":
            return faRing;
        case "rubber":
            return faEraser;
    default:
        return faQuestion
    }
}

/**
 * Function that sets the proper tooltip description for the appropriate commodity
 */
function commodityHover(commodity: string): string {
    switch (commodity) {
        case "oil":
            return "Oil commodities include West Texas Intermediate Crude, Brent Crude, Light Crude, Middle East Sour Crude, MACI Crude, BCI Crude, Oman Crude, and JADE Palm Crude. Additional due diligence should be performed to verify precise commodity exposure."
        case "coal":
            return "Coal commodities include Rotterdam Coal and Richard Bay Coal. Additional due diligence should be performed to verify precise commodity exposure.";
        case "timber":
            return "Timber commodities include Random Length Lumber, Hardwood Pulp, and Softwood Pulp. Additional due diligence should be performed to verify precise commodity exposure."
        case "copper":
            return "Copper commodities include Copper, High Grade Copper, and GradeA Copper. Additional due diligence should be performed to verify precise commodity exposure."
        case "plastic":
            return "Plastic is traded as a commodity. Additional due diligence should be performed to verify precise commodity.";
        case "propane":
            return "Propane is traded as a commodity. Additional due diligence should be performed to verify precise commodity.";
        case "molybdenum":
            return "Molybdenum is traded as a commodity. Additional due diligence should be performed to verify precise commodity exposure."
        case "iron":
            return "Iron is traded as a commodity. Additional due diligence should be performed to verify precise commodity exposure.";
        case "electricity":
            return "Electricity is traded as a commodity. Additional due diligence should be performed to verify precise commodity exposure.";
        case "steel":
            return "Steel is traded as a commodity. Additional due diligence should be performed to verify precise commodity.";
        case "aluminum":
            return "Aluminum is traded as a commodity. Additional due diligence should be performed to verify precise commodity.";
        case "gasoline":
            return "Gasoline commodities include Gasoline RBOB, Gasoline Gulf Coast, and Gasoline Unleaded. Additional due diligence should be performed to verify precise commodity.";
        case "rubber":
            return "Rubber commodities include JADE TSR 20 Rubber. Additional due diligence should be performed to verify precise commodity.";
        case "ethanol":
            return "Ethanol commodities include Ethanol Gulf Coast, Ethanol Los Angeles, and Ethanol New York. Additional due diligence should be performed to verify precise commodity.";
        case "silicon":
            return "Silicon is traded as a commodity. Additional due diligence should be performed to verify precise commodity.";
        case "gold":
            return "Gold commodities include Mini-Sized Gold, 100 oz CBOT Gold, Gold TRAKRS Index, Gold, and Gold Asian. Additional due diligence should be performed to verify precise commodity exposure."
        case "cobalt":
            return "Cobalt is traded as a commodity. Additional due diligence should be performed to verify precise commodity exposure."
        case "interest_rates":
            return "Interest rate commodities include differing durations of interest rate swaps, differing durations of US Dollar and other sovereign bonds, and differing durations of Eurodollar deposits. Additional due diligence should be performed to verify precise commodity.";
        default:
            return "no info"
    }
}