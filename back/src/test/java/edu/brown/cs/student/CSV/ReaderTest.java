//package edu.brown.cs.student.CSV;
//
//import edu.brown.cs.student.main.CSV.Classes.Searcher;
//import edu.brown.cs.student.main.CSV.Creators.StringCreator;
//import java.io.FileReader;
//import java.io.IOException;
//import java.io.StringReader;
//import java.nio.file.Files;
//import java.nio.file.Paths;
//import java.util.List;
//import org.junit.Assert;
//import org.junit.Before;
//import org.junit.Test;
//
public class ReaderTest {}
//  private Searcher f_searcher;
//  private Searcher s_searcher;
//
//  @Before
//  public void setUpData() {
//
//    // Parse file with no headers
//    String file =
//        "/Users/efratavigdor/Desktop/CS32/Sprint1-CSV/csv-ilanbrauns/data/custom/header.csv";
//
//    // creates generic file reader similar to the main method of the program
//    try (FileReader f_reader = new FileReader(file)) {
//
//      // creates different string reader to test the reader functionality
//      String fileContents = readFileToString(file);
//      StringReader s_reader = new StringReader(fileContents);
//
//      StringCreator creator = new StringCreator();
//      Parser<List<String>> f_parser = new Parser<>(creator, f_reader, true);
//      this.f_searcher = new Searcher(f_parser);
//      Parser<List<String>> s_parser = new Parser<>(creator, s_reader, true);
//      this.s_searcher = new Searcher(s_parser);
//
//    } catch (IOException e) {
//      // TBD
//    }
//  }
//
//  @Test
//  public void testReaders() {
//    // tests to make sure the two readers always output the same information
//    Assert.assertEquals(this.f_searcher.searchAll("Ilan"), this.s_searcher.searchAll("Ilan"));
//    Assert.assertEquals(
//        this.f_searcher.searchIndex("Ilan", "2"), this.s_searcher.searchIndex("Ilan", "2"));
//  }
//
//  @Test(expected = IndexOutOfBoundsException.class)
//  public void testSimpleError() {
//    // index out of bounds, written to fail because we can assume user input is proper
//    Assert.assertEquals(
//        this.f_searcher.searchIndex("Ilan", "4"), this.s_searcher.searchIndex("Ilan", "4"));
//  }
//
//  public static String readFileToString(String filePath) throws IOException {
//    byte[] bytes = Files.readAllBytes(Paths.get(filePath));
//    return new String(bytes);
//  }
//}
