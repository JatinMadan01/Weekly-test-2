const fs = require('fs');
const csv = require('csv-parser');

const results = [];
fs.createReadStream('top_players_runs_2023.csv')
  .pipe(csv())
  .on('data', (row) => results.push(row))
  .on('end', () => {
    console.log('CSV file successfully processed');
    console.log(results);
    
  });
