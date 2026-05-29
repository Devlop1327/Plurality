const navButtons = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');

function setActiveSection(targetId) {
  sections.forEach((section) => {
    section.classList.toggle('active', section.id === targetId);
  });

  navButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.target === targetId);
  });
}

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetSection = button.dataset.target;
    setActiveSection(targetSection);
    if (navigation.classList.contains('open')) {
      navigation.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

menuToggle.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

setActiveSection('inicio');
