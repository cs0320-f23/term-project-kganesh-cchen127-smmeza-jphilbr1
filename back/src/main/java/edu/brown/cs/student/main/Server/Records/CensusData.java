package edu.brown.cs.student.main.Server.Records;

import java.util.Objects;

/**
 * Class for census data, or just a double representing the broadband coverage in a given county.
 * Overrides equals, hashcode, and to string for trivial reasons.
 * @param broadband - double returned as broadband data query
 */
public record CensusData(double broadband) {

    /**
     * Tests equality between a CensusData and a reference object
     * @param o   the reference object with which to compare.
     * @return boolean true if equals, false otherwise
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CensusData that = (CensusData) o;
        return Double.compare(this.broadband, that.broadband) == 0;
    }

    /**
     * Hashcode function to support HashMaps with broadband
     * @return - returns hash value for a broadband object
     */
    @Override
    public int hashCode() {
        return Objects.hash(broadband);
    }

    /**
     * Converts broadband object to string by printing String version of broadband field
     * @return - String of broadband field
     */
    @Override
    public String toString() {
        return String.valueOf(broadband);
    }
}
