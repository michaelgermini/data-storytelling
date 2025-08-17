function $(id){ return document.getElementById(id); }

export function openSidebar(){
  $('sidebar').classList.remove('hidden');
}

export function closeSidebar(){
  $('sidebar').classList.add('hidden');
}

export function setSidebarData({ title, projects, skills }){
  $('sidebar-title').textContent = title ?? 'Sélection';
  const projectsEl = $('sidebar-projects');
  projectsEl.innerHTML = '';
  (projects ?? []).forEach(p => {
    const item = document.createElement('div');
    item.className = 'item';
    item.innerHTML = `<strong>${p.title}</strong><div class="muted">${p.period}</div><div>${p.description}</div>`;
    projectsEl.appendChild(item);
  });

  const skillsEl = $('sidebar-skills');
  skillsEl.innerHTML = '';
  (skills ?? []).forEach(s => {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = s;
    skillsEl.appendChild(tag);
  });
}


