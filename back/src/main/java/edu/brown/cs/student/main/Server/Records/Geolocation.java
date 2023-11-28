package edu.brown.cs.student.main.Server.Records;

import java.util.Objects;

/**
 * Class for a geolocation, or just a state and a county. Used to query data in organized fashion. Overrides
 * @param state - state to be queried
 * @param county - county to be queried in given state
 */
public record Geolocation(String state, String county) {


//  public String toOurServerParams() {
//    return "state=" + state + "&county=" + county;
//  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Geolocation that = (Geolocation) o;
    return Objects.equals(state, that.state) && Objects.equals(county, that.county);
  }

  @Override
  public int hashCode() {
    return Objects.hash(state, county);
  }
}
