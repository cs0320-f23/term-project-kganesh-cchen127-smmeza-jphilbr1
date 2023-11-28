//package edu.brown.cs.student.CSV;
//
//import edu.brown.cs.student.main.CSV.Classes.Searcher;
//import edu.brown.cs.student.main.CSV.Creators.StringCreator;
//import java.io.FileReader;
//import java.io.IOException;
//import java.util.List;
//import org.junit.Before;
//import org.junit.Test;
//
public class ErrorTest {}
//  private Searcher searcher;
//  private Parser<List<String>> parser;
//
//  @Before
//  public void setUpData() {
//    // Parse file with no headers
//    String file =
//        "/Users/efratavigdor/Desktop/CS32/Sprint1-CSV/csv-ilanbrauns/data/custom/noheaders.csv";
//    try (FileReader reader = new FileReader(file)) {
//      StringCreator creator = new StringCreator();
//      this.parser = new Parser<>(creator, reader, false);
//      this.searcher = new Searcher(this.parser);
//    } catch (IOException e) {
//      // TBD
//    }
//
//    // Test catch exception. All other tests have catch body omitted because we know the files
//    // exist.
//
//    String bad_file =
//        "/Users/efratavigdor/Desktop/CS32/Sprint1-CSV/csv-ilanbrauns/data/custom/filedoesnotexist.csv";
//    try (FileReader reader = new FileReader(bad_file)) {
//      StringCreator creator = new StringCreator();
//      this.parser = new Parser<>(creator, reader, false);
//      this.searcher = new Searcher(this.parser);
//    } catch (IOException e) {
//      System.err.println("It is broken");
//    }
//  }
//
//  /**
//   * Test to confirm we can not search a headerless file. Throws an error ungracefully, which is
//   * fine because we assume user uses terminal properly.
//   */
//  @Test(expected = NullPointerException.class)
//  public void testHeaderless() {
//    this.searcher.searchHeader("Ilan", "size");
//  }
//}
