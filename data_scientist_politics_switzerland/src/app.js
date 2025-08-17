import { initializeScene, animate, pickAtPointer, zoomToCanton, highlightCanton, clearHighlights, setYearUniform } from './scene.js';
import { openSidebar, closeSidebar, setSidebarData } from './sidebar.js';
import { initCharts, updateChartFor } from './charts.js';
import { playStory } from './story.js';
import { loadData } from './data.js';

const state = {
  data: null,
  selectedCantonId: null,
  hoveredCantonId: null,
  currentYear: 2020
};

function $(id){ return document.getElementById(id); }

window.addEventListener('DOMContentLoaded', async () => {
  state.data = await loadData();
  initializeScene({ container: $('scene-container'), data: state.data });
  initCharts({ containerId: 'chart' });
  updateChartFor({ cantonId: 'CH', year: state.currentYear, data: state.data });

  const yearSlider = $('year-slider');
  const yearValue = $('year-value');
  yearSlider.addEventListener('input', () => {
    state.currentYear = Number(yearSlider.value);
    yearValue.textContent = String(state.currentYear);
    setYearUniform(state.currentYear);
    updateChartFor({ cantonId: state.selectedCantonId ?? 'CH', year: state.currentYear, data: state.data });
  });

  $('playStoryBtn').addEventListener('click', () => {
    playStory({
      years: [2018, 2020, 2022, 2024],
      cantons: ['GE', 'BE', 'ZH', 'VD'],
      onEnterCanton: (cantonId) => {
        const canton = state.data.cantons.find(c => c.id === cantonId);
        if(canton){
          setSidebarData({ title: canton.name, projects: canton.projects, skills: canton.skills });
          openSidebar();
          updateChartFor({ cantonId, year: state.currentYear, data: state.data });
        }
      },
      onYear: (year) => {
        state.currentYear = year;
        yearSlider.value = String(year);
        $('year-value').textContent = String(year);
        setYearUniform(year);
        updateChartFor({ cantonId: state.selectedCantonId ?? 'CH', year, data: state.data });
      }
    });
  });

  $('sidebar-close').addEventListener('click', closeSidebar);

  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.style.display = 'none';
  document.body.appendChild(tooltip);

  const container = $('scene-container');
  container.addEventListener('pointermove', (ev) => {
    const hit = pickAtPointer(ev.clientX, ev.clientY);
    if(hit?.cantonId){
      if(state.hoveredCantonId !== hit.cantonId){
        state.hoveredCantonId = hit.cantonId;
        highlightCanton(hit.cantonId);
      }
      tooltip.textContent = state.data.cantonIdToName[hit.cantonId] ?? hit.cantonId;
      tooltip.style.left = `${ev.clientX}px`;
      tooltip.style.top = `${ev.clientY}px`;
      tooltip.style.display = 'block';
    } else {
      state.hoveredCantonId = null;
      clearHighlights();
      tooltip.style.display = 'none';
    }
  });

  container.addEventListener('click', (ev) => {
    const hit = pickAtPointer(ev.clientX, ev.clientY);
    if(hit?.cantonId){
      state.selectedCantonId = hit.cantonId;
      zoomToCanton(hit.cantonId);
      const canton = state.data.cantons.find(c => c.id === hit.cantonId);
      if(canton){
        setSidebarData({ title: canton.name, projects: canton.projects, skills: canton.skills });
        openSidebar();
        updateChartFor({ cantonId: hit.cantonId, year: state.currentYear, data: state.data });
      }
    }
  });

  animate();
});


