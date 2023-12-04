// import fs from 'fs'; // npm install @types/node
// import csv from 'csv-parser'; // npm install csv-parser


// // Specify the path to your CSV file
// const csvFilePath = 'front/data/uscounties.csv';

// // Create an object to store the parsed data
// const county_data: Record<string, string>[] = [];

// // Use csv-parser to parse the CSV file
// fs.createReadStream(csvFilePath)
//   .pipe(csv())
//   .on('data', (row: Record<string, string>) => {
//     county_data.push(row);
//   })
//   .on('end', () => {
//     console.log(county_data);
//   });

//   export { county_data }