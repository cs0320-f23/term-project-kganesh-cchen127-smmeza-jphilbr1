package edu.brown.cs.student.main.Server.Cache;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

public interface CacheStrategy {

    Map<String, Object> get(List<Double> box) throws ExecutionException;
}