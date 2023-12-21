
import{ data} from "../mockedData/byte-sizedMockedData";

/**
 * This is the function that will check if the mocked data
 * is a FeatureCollection 
 * @returns a promise the will resolve to the mockedData
 */


export async function firstMockOverlayData(): Promise<
  GeoJSON.FeatureCollection | undefined
> {
  return Promise.resolve(data);
}

export async function recommendationData(
  status: number,
  data?: {
    [key: string]:
      | string
      | { [key: string]: string | string[] | { [key: string]: string } };
  }
) {
  const response = { status, json: () => Promise.resolve(data) };
  return response;
}



/**
 * 'searches' for the mocked data wth the keyword
 *  and returns the mocked data if the keyword is in the map
 */


/**
 * creates a map to search for certain words that correpsond to 
 * certain mocked data 
 */

