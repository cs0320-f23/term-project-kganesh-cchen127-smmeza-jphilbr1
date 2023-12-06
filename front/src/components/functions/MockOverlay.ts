import {
  SectionData,
  MediocreData,
  geoJSONData,
} from "../mockedData/mockedData";

/**
 * This is the function that will check if the mocked data
 * is a FeatureCollection 
 * @returns a promise the will resolve to the mockedData
 */
export async function mockOverlayData(): Promise<
  GeoJSON.FeatureCollection | undefined
> {
  return Promise.resolve(geoJSONData);
}

export async function sectionMockOverlayData(): Promise<
  GeoJSON.FeatureCollection | undefined
> {
  return Promise.resolve(SectionData);
}

/**
 * 'searches' for the mocked data wth the keyword
 *  and returns the mocked data if the keyword is in the map
 */
export async function searchMockedOverlayData(
  keyword: string[]
): Promise<GeoJSON.FeatureCollection | undefined> {
  return Promise.resolve(searchMap.get(keyword[0]));
}


/**
 * creates a map to search for certain words that correpsond to 
 * certain mocked data 
 */
var searchMap = new Map<string, GeoJSON.FeatureCollection | undefined>();
searchMap.set("section", SectionData);
searchMap.set("mediocre houses", MediocreData);
