
fetch('JSON Dashboard/revenue.json')
	.then(response => response.json())
	.then(data => {
		const labels = data.map(item => item.Country);
		const dataSet = data.map(item => item.total_revenue);
        

		const ctx = document.getElementById('chart').getContext('2d');
		const chart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: labels,
				datasets: [{
					label: 'Total Revenue',
					data: dataSet,
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(255, 159, 64, 0.2)'
					],
					borderColor: [
						'rgba(255, 99, 132, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
						'rgba(255, 159, 64, 1)'
					],
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
        
	})

    fetch('JSON Dashboard/agepie.json')
        .then(response => response.json())
        .then(data => {
          const ctx = document.getElementById('pie').getContext('2d');
          const chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: data.map(item => item.Age_Group),
              datasets: [{
                label: 'By Age ',
                data: data.map(item => item.order_percentage),
                backgroundColor: ['#0072f0', '#00b6cb', '#f10096','#f66f03'],
                borderColor: 'rgba(0, 0, 0, 0.1)',
                borderWidth: 1
              }]
            },
            options: {
              title: {
                display: true,
                text: 'Total Revenue by Age Group'
              },
              plugins: {
                doughnutlabel: {
                  labels: [
                    {
                      text: 'Percentage',
                      
                      font: {
                        size: '10'
                      },
                      color: '#fff',
                      align: 'center',
                      offsetY: -10
                    }
                  ],
                  formatter: (value, ctx) => {
                    const total = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                    const percentage = (value / total * 100).toFixed(2) + '%';
                    return percentage;
                  }
                }
              }
            }
          });
        })
        .catch(error => console.error(error));

        fetch('JSON Dashboard/mpq.json')
        .then(response => response.json())
        .then(data => {
          const limitedData = data.slice(0, 7);
          const tableBody = document.querySelector('#jtable tbody');
          limitedData.forEach(row => {
            const tableRow = document.createElement('tr');
            for (const key in row) {
              const tableCell = document.createElement('td');
              tableCell.textContent = row[key];
              tableRow.appendChild(tableCell);
            }
            tableBody.appendChild(tableRow);
          });
        })
        .catch(error => console.error('Error fetching data:', error));
