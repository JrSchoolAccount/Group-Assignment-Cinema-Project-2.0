const hamburgerMenu = document.getElementById('toggleMenu');

hamburgerMenu.addEventListener('click', () => {
  const navBar = document.getElementById('navbarNav');
  navBar.classList.toggle('hidden');
});
