//package edu.brown.cs.student.CSV;
//
//import edu.brown.cs.student.main.CSV.Classes.Searcher;
//import edu.brown.cs.student.main.CSV.Creators.StringCreator;
//import java.io.FileReader;
//import java.io.IOException;
//import java.util.List;
//import org.junit.Assert;
//import org.junit.Before;
//import org.junit.Test;
//
public class SearcherTest {}
//  private Searcher d_searcher;
//  private Searcher h_searcher;
//
//  @Before
//  public void setUpData() {
//    // Parse testing file
//    String d_file =
//        "/Users/efratavigdor/Desktop/CS32/Sprint1-CSV/csv-ilanbrauns/data/census/dol_ri_earnings_disparity.csv";
//    try (FileReader d_reader = new FileReader(d_file)) {
//      StringCreator d_creator = new StringCreator();
//      Parser<List<String>> d_parser = new Parser<>(d_creator, d_reader, true);
//      this.d_searcher = new Searcher(d_parser);
//    } catch (IOException e) {
//      // TBD
//    }
//
//    // Parse file with headers
//    String h_file =
//        "/Users/efratavigdor/Desktop/CS32/Sprint1-CSV/csv-ilanbrauns/data/custom/header.csv";
//    try (FileReader h_reader = new FileReader(h_file)) {
//      StringCreator h_creator = new StringCreator();
//      Parser<List<String>> h_parser = new Parser<>(h_creator, h_reader, true);
//      this.h_searcher = new Searcher(h_parser);
//    } catch (IOException e) {
//      // TBD
//    }
//  }
//
//  /**
//   * Testing teh search all method of the first class. Testing by asserting equals for the method
//   * return with a creating list
//   */
//  @Test
//  public void test_searchAll() {
//    // Simple assertion to test if equality works
//    Assert.assertEquals(this.d_searcher.getData(), this.d_searcher.searchAll("RI"));
//
//    // Searching for value that is present in the CSV
//    List<List<String>> result1 =
//        List.of(List.of("RI", "Black", "$770.26", "30424.80376", "$0.73", "6%"));
//    Assert.assertEquals(result1, this.d_searcher.searchAll("Black"));
//
//    // Searching for value that is present without column specification
//    List<List<String>> result2 =
//        List.of(
//            List.of("Ilan", "19", "6 feet"),
//            List.of("Grant", "21", "6 feet"),
//            List.of("Karim", "20", "6 feet"));
//    Assert.assertEquals(result2, this.h_searcher.searchAll("6 feet"));
//
//    // Searching for value that is not present in the CSV
//    List<List<String>> result3 = List.of();
//    Assert.assertEquals(result3, this.d_searcher.searchAll("Jewish"));
//  }
//
//  @Test
//  public void test_searchSome() {
//    // Simple assertion to test if equality works
//    Assert.assertEquals(this.d_searcher.getData(), this.d_searcher.searchIndex("RI", "0"));
//
//    // Testing values that are present, but are in the wrong column
//    Assert.assertEquals(List.of(), this.d_searcher.searchIndex("RI", "1"));
//
//    // Search for values by column name
//    List<List<String>> result1 =
//        List.of(
//            List.of("RI", "White", "\" $1,058.47 \"", "395773.6521", "$1.00", "75%"),
//            List.of(
//                "RI", "Asian-Pacific Islander", "\" $1,080.09 \"", "18956.71657", "$1.00", "4%"));
//    Assert.assertEquals(result1, this.d_searcher.searchHeader("$1.00", "Earnings Disparity"));
//
//    // Search for values by index
//    Assert.assertEquals(result1, this.d_searcher.searchIndex("$1.00", "4"));
//  }
//}
