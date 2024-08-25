fetch('top_players_runs_2023.csv')
  .then(response => response.text())
  .then(data => {
    const rows = data.split('\n').slice(1);  // Skip header row
    const players = [];
    const runs = [];
    
    rows.forEach(row => {
      const [player, run] = row.split(',');
      if (player && run) {
        players.push(player);
        runs.push(parseInt(run, 10));
      }
    });

    const ctx = document.getElementById('runsChart').getContext('2d');
    const runsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: players,
        datasets: [{
          label: 'Runs',
          data: runs,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });
