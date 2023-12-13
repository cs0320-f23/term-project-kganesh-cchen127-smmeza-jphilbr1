import React from "react";
import "../../styles/main.css";
import { LngLatLike } from "mapbox-gl";
import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";
import { json } from "stream/consumers";
import { Helmet } from "react-helmet";
import $ from "jquery";

interface MapsInfoProps {
    countyState: string[]
    selectedLongLat: number[] | undefined;
}

interface UnemploymentLoadResponse {
    breakdown: UnemploymentDataResponse;
}

interface UnemploymentDataResponse {
    data: UnemploymentData;
    status: string;
}

interface UnemploymentData {
    // employees_construction: string;
    // employees_educationandhealth: string;
    // employees_finance: string;
    // employees_information: string;
    // employees_leisureandhospiatlity: string;
    // employees_manufacturing: string;
    // employees_mining: string;
    // employees_otherservices: string;
    // employees_professionalservices: string;
    // employees_tradetransportutilities: string;
    [key: string]: string;
}

export function MapsInfo(props: MapsInfoProps) {
    const [unemploymentData, setUnemploymentData] = useState<UnemploymentData>({});
    const [maxValue, setMaxValue] = useState<number>(10000);

    useEffect(() => {
        retrieveUnemploymentData(props.selectedLongLat);
    }, [props.countyState])


    async function accessUnemploymentData(args: number[]): Promise<string> {
        if (args.length === 2) {
            const url: string =
            "http://127.0.0.1:5000/detailed_data?latitude=" + args[0] + "&longitude=" + args[1];
            const result = await fetch(url)
            .then((response) => response.json());
            return result;
        }
        return "";
    }


    async function retrieveUnemploymentData(lngLat: number[] | undefined) {
        if (lngLat) {
            try {
                const jsonResponse = await accessUnemploymentData(lngLat);
                console.log("please", isUnemploymentLoadResopnse(jsonResponse))
                if (isUnemploymentLoadResopnse(jsonResponse)) {
                    let data = jsonResponse.breakdown.data
                    setUnemploymentData(data);
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

    keys.forEach((key) => {
        values.push(parseInt(unemploymentData[key]))
    })

    useEffect(() => {
        let maximum = findMaxValue(values);
        if (maximum) {
            setMaxValue(maximum + 1000);
        }
    }, [unemploymentData])


    useEffect(() => {
        const bars = document.querySelectorAll('.bars li .bar') as NodeListOf<HTMLDivElement>;
        console.log("yo", props.selectedLongLat);
        let index = 0
        bars.forEach((bar) => {
        let amount = (values[index] / maxValue) * 100; // Get the value dynamically
        console.log(maxValue);
        console.log("buh", amount)
        if (amount) {
            bar.style.height = `${amount}%`;
            bar.animate(
            { height: [0, amount] },
            {
                duration: 1000,
                easing: 'ease-out',
                fill: 'forwards',
            }
            );
            index ++
        }
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
            <b className="info-header">Information for {props.countyState[0]} County:</b>


            <div className="chart">
                <ul className="numbers">
                    <li><span>{maxValue}</span></li>
                    <li><span>{maxValue / 2}</span></li>
                    <li><span>0</span></li>
                </ul>
                <ul className="bars">
                    <li><div className="bar" unemp-amount={values[0]}></div><span>Construction</span></li>
                    <li><div className="bar" unemp-amount={values[1]}></div><span>Education & Health</span></li>
                    <li><div className="bar" unemp-amount={values[2]}></div><span>Finance</span></li>
                    <li><div className="bar" unemp-amount={values[3]}></div><span>Information</span></li>
                    <li><div className="bar" unemp-amount={values[4]}></div><span>Leisure & Hospitality</span></li>
                    <li><div className="bar" unemp-amount={values[5]}></div><span>Manufacturing</span></li>
                    <li><div className="bar" unemp-amount={values[6]}></div><span>Mining</span></li>
                    <li><div className="bar" unemp-amount={values[7]}></div><span>Other services</span></li>
                    <li><div className="bar" unemp-amount={values[8]}></div><span>Professional services</span></li>
                    <li><div className="bar" unemp-amount={values[9]}></div><span>Trade, Transport & Utilities</span></li>
                </ul>
            </div>

        </div>
        </>
    )
}