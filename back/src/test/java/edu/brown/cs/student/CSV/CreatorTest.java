//package edu.brown.cs.student.CSV;
//
//import edu.brown.cs.student.main.CSV.Creators.BadCreator;
//import edu.brown.cs.student.main.CSV.Creators.Student;
//import edu.brown.cs.student.main.CSV.Creators.StudentCreator;
//import java.io.FileReader;
//import java.io.IOException;
//import org.junit.Test;
//
public class CreatorTest {}
//
//  /**
//   * Tests creators. There are two types of creators: one that turns the csv rows into students
//   * properly and one that does it improperly and throws factory failure. Each creator class has
//   * implemented a print function to test easily the proper fields are being allocated.
//   */
//  @Test
//  public void setUpData() {
//    // Parse file with no headers successfully with good creator object
//    String file =
//        "/Users/efratavigdor/Desktop/CS32/Sprint1-CSV/csv-ilanbrauns/data/custom/noheaders.csv";
//    try (FileReader reader = new FileReader(file)) {
//      StudentCreator good_creator = new StudentCreator();
//      Parser<Student> good_parser = new Parser<>(good_creator, reader, false);
//      good_parser.transform();
//    } catch (IOException e) {
//      // TBD
//    }
//
//    // Parse same file with bad reader and receive error
//    try (FileReader reader = new FileReader(file)) {
//      BadCreator bad_creator = new BadCreator();
//      Parser<Student> bad_parser = new Parser<>(bad_creator, reader, false);
//      bad_parser.transform();
//    } catch (IOException e) {
//      // TBD
//    }
//  }
//}
