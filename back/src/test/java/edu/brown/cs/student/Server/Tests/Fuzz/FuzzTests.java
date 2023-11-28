package edu.brown.cs.student.Server.Tests.Fuzz;

import java.util.Random;
import org.junit.jupiter.api.Test;

public class FuzzTests {

  private static final int NUM_TRIALS = 100;
  private final static int MAX_RAND_VAL = 100;
  private final static int MAX_INTS = 10;


  @Test
  public void fuzzTestStars()  {
    for(int counter=0;counter<NUM_TRIALS;counter++) {
      int[] fuzzArray = generateArray(MAX_RAND_VAL, MAX_INTS);
      new FuzzMethod(fuzzArray);
    }
  }

  public static int[] generateArray(int max, int len){
    Random random = new Random();
    int[] array = new int[len];
    for (int i = 0; i < len; i++) {
      array[i] = random.nextInt(max);
    }
    return array;
  }

}
