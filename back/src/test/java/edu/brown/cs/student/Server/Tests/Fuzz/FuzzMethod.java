package edu.brown.cs.student.Server.Tests.Fuzz;

import java.util.HashSet;
import java.util.Set;

public class FuzzMethod {

  public FuzzMethod(int[] array) {
    try {
      this.errorDoubles(array);
    }
    catch (Exception e){
      System.out.println(e.getMessage());
    }
  }

  public void errorDoubles(int[] array) throws Exception{
      Set<Integer> seen = new HashSet<>();
      for (int num : array) {
        if (seen.contains(num)) {
          throw new Exception("Exception Handled Gracefully!");
        }
        seen.add(num);
      }
    }
  }
