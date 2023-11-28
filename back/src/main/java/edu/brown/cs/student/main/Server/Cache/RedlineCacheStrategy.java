package edu.brown.cs.student.main.Server.Cache;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

import edu.brown.cs.student.main.Server.Classes.RedlineHandler;
import org.jetbrains.annotations.NotNull;


//** Cache strategy object for adjusting settings of caching */
public class RedlineCacheStrategy implements CacheStrategy{
    private final LoadingCache<List<Double>, Map<String, Object>> graphs;

    /**
     * @param maximumSize maximum entries in cache
     * @param expiryMinutes minutes before entry is purged from cache
     */
    public RedlineCacheStrategy(long maximumSize, long expiryMinutes) {
        this.graphs =
                CacheBuilder.newBuilder()
                        .maximumSize(maximumSize)
                        .expireAfterWrite(expiryMinutes, TimeUnit.MINUTES)
                        .build(
                                new CacheLoader<>() {
                                    @NotNull
                                    @Override
                                    public Map<String, Object> load(@NotNull List<Double> box)
                                            throws IOException {
                                        return RedlineHandler.getFilteredFeatures(box);
                                    }
                                });
    }

    /**
     * Gets geodata from cache if present, otherwise finds it and caches
     *
     * @param box - the list of boundaries minLat,minLon,maxLat,maxLon
     * @return geodata for a given boundary box
     * @throws ExecutionException
     */
    @Override
    public Map<String, Object> get(List<Double> box) throws ExecutionException {
        return this.graphs.get(box);
    }
}