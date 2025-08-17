export function initCharts({ containerId }){
  const el = document.getElementById(containerId);
  const layout = {
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    margin: { l: 40, r: 10, t: 30, b: 30 },
    font: { color: '#e8f1fc' },
    xaxis: { gridcolor: '#1b2836' },
    yaxis: { gridcolor: '#1b2836' },
    legend: { orientation: 'h' }
  };
  const config = { displayModeBar: false, responsive: true };
  Plotly.newPlot(el, [{ x: [2016,2018,2020,2022,2024], y: [0,0,0,0,0], name:'KPI', mode:'lines+markers', line:{ color:'#49a3ff' } }], layout, config);
}

export function updateChartFor({ cantonId, year, data }){
  const el = document.getElementById('chart');
  const series = data.series[cantonId] ?? data.series['CH'];
  const xs = series.map(p => p.year);
  const ys = series.map(p => p.kpi);
  Plotly.react(el, [
    { x: xs, y: ys, name: 'Satisfaction citoyenne', mode:'lines+markers', line:{ color:'#49a3ff' } }
  ], {
    ...el.layout,
    title: `${data.cantonIdToName[cantonId] ?? 'Suisse'} – KPI (indicatif)`
  });
}


