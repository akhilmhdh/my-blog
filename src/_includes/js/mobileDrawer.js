const toggleMobileDrawer = (toggleBtn) => {
  const drawer = document.querySelector('.mobile-drawer');
  if (drawer.classList.contains('close')) {
    drawer.classList.remove('close');
    toggleBtn.classList.remove('close');
    toggleBtn.classList.add('open');
  } else {
    drawer.classList.add('close');
    toggleBtn.classList.remove('open');
    toggleBtn.classList.add('close');
  }
};
