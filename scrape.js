const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  
  const url = 'https://www.iplt20.com/stats/2023';

  await page.goto(url);
  await page.waitForSelector('.top-players');  
  const playersData = await page.evaluate(() => {
    const rows = document.querySelectorAll('.top-players tbody tr');
    const data = [];

    rows.forEach(row => {
      const player = row.querySelector('.player-name').innerText;
      const runs = row.querySelector('.runs').innerText;
      data.push({ player, runs });
    });

    return data;
  });

  const csv = playersData.map(item => `${item.player},${item.runs}`).join('\n');
  fs.writeFileSync('top_players_runs_2023.csv', csv);

  await browser.close();
})();
