package edu.brown.cs.student.main.Server.Records;

import java.util.Objects;

/**
 * Class for a geolocation, or just a state and a county. Used to query data in organized fashion. Overrides
 * @param state - state to be queried
 * @param county - county to be queried in given state
 */
public record Geolocation(String state, String county) { }
