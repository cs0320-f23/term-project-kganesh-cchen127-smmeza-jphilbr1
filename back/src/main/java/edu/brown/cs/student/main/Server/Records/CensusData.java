package edu.brown.cs.student.main.Server.Records;

import java.util.Objects;

/**
 * Class for census data, or just a double representing the broadband coverage in a given county.
 * Overrides equals, hashcode, and to string for trivial reasons.
 * @param broadband - double returned as broadband data query
 */
public record CensusData(double broadband) { }
