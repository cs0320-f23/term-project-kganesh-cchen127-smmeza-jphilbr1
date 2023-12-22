
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

