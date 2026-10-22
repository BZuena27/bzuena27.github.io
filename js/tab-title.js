const pageTitle = document.title;

function updatePageTitle() {
  document.title = document.hidden ? "reviens vite !" : pageTitle;
}

document.addEventListener("visibilitychange", updatePageTitle);
updatePageTitle();
