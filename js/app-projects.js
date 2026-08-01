const githubIcon = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.79 10.78.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.17.69-3.84-1.35-3.84-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.06-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.14 1.17a10.9 10.9 0 0 1 2.86-.39c.97 0 1.95.13 2.86.39 2.18-1.48 3.14-1.17 3.14-1.17.62 1.58.23 2.75.11 3.04.73.8 1.17 1.82 1.17 3.06 0 4.37-2.66 5.34-5.2 5.62.41.36.77 1.06.77 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A11.03 11.03 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5Z"/></svg>';

fetch('assets/projects.json')
  .then(res => res.json())
  .then(projects => {
    const container = document.getElementById('projects-list');
    container.innerHTML = '';
    projects.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'project-detail-card';
      card.id = `project-${i + 1}`;
      card.innerHTML = `
        <img class="project-image2" src="${p.image2}" alt="${p.title} preview" />
        <div class="project-body">
         <!-- <p class="project-index">PRJ_0${i + 1} / 0${projects.length}</p> -->
          <h3>${p.title}</h3>
          <p>${p.details || p.description}</p>
          <div class="project-links">
            <a class="btn-github" href="${p.github}" target="_blank" rel="noopener noreferrer">${githubIcon} View repository</a>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView();
    }
  })
  .catch(() => {
    document.getElementById('projects-list').innerText = 'Could not load projects.json.';
  });
