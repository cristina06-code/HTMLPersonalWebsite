/* ---------- About me text ---------- */
fetch('assets/about-me.txt')
  .then(response => response.text())
  .then(data => {
    document.getElementById('text-container').innerText = data;
  })
  .catch(() => {
    document.getElementById('text-container').innerText =
      'Could not load about-me.txt — check that the resources folder was uploaded alongside index.html.';
  });

/* ---------- Skills chips ---------- */
fetch('assets/skills.json')
  .then(response => response.json())
  .then(skills => {
    const container = document.querySelector('#skills .skills');
    skills.forEach(skill => {
      const div = document.createElement('div');
      div.className = 'skill';
      div.textContent = skill;
      container.appendChild(div);
    });
  })
  .catch(() => {
    document.querySelector('#skills .skills').innerText =
      'Could not load skills.json.';
  });

/* ---------- Projects carousel ---------- */
const githubIcon = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.79 10.78.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.17.69-3.84-1.35-3.84-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.06-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.14 1.17a10.9 10.9 0 0 1 2.86-.39c.97 0 1.95.13 2.86.39 2.18-1.48 3.14-1.17 3.14-1.17.62 1.58.23 2.75.11 3.04.73.8 1.17 1.82 1.17 3.06 0 4.37-2.66 5.34-5.2 5.62.41.36.77 1.06.77 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A11.03 11.03 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5Z"/></svg>';

let projects = [];
let currentIndex = 0;

const cardEl = document.getElementById('project-card');
const counterEl = document.getElementById('project-counter');

function renderProject (i) {
  if (!projects.length) return;
  const p = projects[i];
  cardEl.innerHTML = `
    <img class="project-image" src="${p.image}" alt="${p.title} preview" />
    <div class="project-body">
      <!-- <p class="project-index">PRJ_0${i + 1} / 0${projects.length}</p> -->
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="project-links">
        <a class="btn-view" href="projects.html#project-${i + 1}">View project</a>
        <a class="btn-github" href="${p.github}" target="_blank" rel="noopener noreferrer">${githubIcon} Repository</a>
      </div>
    </div>
  `;
  counterEl.textContent = `${i + 1} / ${projects.length}`;
}

fetch('assets/projects.json')
  .then(response => response.json())
  .then(data => {
    projects = data;
    renderProject(currentIndex);
  })
  .catch(() => {
    cardEl.innerHTML = '<div class="project-body"><p>Could not load projects.json.</p></div>';
  });

document.getElementById('prev-project').addEventListener('click', () => {
  if (!projects.length) return;
  currentIndex = (currentIndex - 1 + projects.length) % projects.length;
  renderProject(currentIndex);
});

document.getElementById('next-project').addEventListener('click', () => {
  if (!projects.length) return;
  currentIndex = (currentIndex + 1) % projects.length;
  renderProject(currentIndex);
});

/* ---------- Scroll-spy: highlight active nav link ---------- */
const navLinks = document.querySelectorAll('.menu a');
const sections = document.querySelectorAll('.RightSide > div[id]');

const observer = new window.IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.dataset.section === entry.target.id
          );
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(section => observer.observe(section));
