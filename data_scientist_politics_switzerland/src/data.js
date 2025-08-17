export async function loadData(){
  // Placeholder synthetic dataset; replace with OFS/Open Data Swiss requests
  const cantonIdToName = { CH:'Suisse', GE:'Genève', BE:'Berne', ZH:'Zurich', VD:'Vaud' };
  const years = [2016, 2018, 2020, 2022, 2024];
  function genSeries(base){
    return years.map((y,i)=>({ year:y, kpi: Math.round((base + i* (Math.random()*4+1)) * 10)/10 }));
  }
  const series = {
    CH: genSeries(60),
    GE: genSeries(62),
    BE: genSeries(58),
    ZH: genSeries(65),
    VD: genSeries(61)
  };

  const cantons = [
    {
      id:'GE', name:'Genève',
      projects:[
        { title:'Suivi des motions cantonales', period:'2021–2023', description:'Extraction NLP des textes, suivi de l’avancement et visualisation des impacts.' },
        { title:'Simulation de budget par secteur', period:'2022', description:'Modèles de scénarios et dashboards interactifs pour décision publique.' }
      ],
      skills:['NLP','Dashboards','Storytelling','Python','Three.js']
    },
    {
      id:'BE', name:'Berne',
      projects:[
        { title:'Analyse emploi & mobilité', period:'2020–2022', description:'Fusion données OFS et mobilité, cartes et indicateurs spatio-temporels.' }
      ],
      skills:['Pandas','Spatial join','Time series','Plotly','ETL']
    },
    {
      id:'ZH', name:'Zurich',
      projects:[
        { title:'Satisfaction citoyenne', period:'2019–2024', description:'Modèles de sentiment & tableau de bord KPI.' }
      ],
      skills:['Sentiment analysis','Survey analytics','ML','D3.js']
    },
    {
      id:'VD', name:'Vaud',
      projects:[
        { title:'Impact mesures environnement', period:'2021', description:'Indices pollution et politiques publiques; corrélations et visualisations.' }
      ],
      skills:['Causal inference','Visualization','Statistics']
    }
  ];

  return { cantonIdToName, years, series, cantons };
}


