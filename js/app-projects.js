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
            <a class="btn-github" href="${p.github}" target="_blank" rel="noopener noreferrer"><ion-icon name="logo-github"></ion-icon> View repository</a>
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
