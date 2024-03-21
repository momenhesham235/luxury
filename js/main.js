let isDarkMode = localStorage.getItem("isDarkMode") === "true";

function applyMode() {
  if (isDarkMode) {
    document.documentElement.style.setProperty(
      "--current-bg-color",
      "var(--bg-color-dark)"
    );
    document.documentElement.style.setProperty(
      "--current-text-color",
      "var(--text-color-dark)"
    );
    document.documentElement.style.setProperty(
      "--current-bg-img",
      "var(--bg-img-dark)"
    );
  } else {
    document.documentElement.style.setProperty(
      "--current-bg-color",
      "var(--bg-color-light)"
    );
    document.documentElement.style.setProperty(
      "--current-text-color",
      "var(--text-color-light)"
    );
    document.documentElement.style.setProperty(
      "--current-bg-img",
      "var(--bg-img-light)"
    );
  }
  document.body.style.backgroundImage = "var(--current-bg-img)";
  document.body.style.backgroundColor = "var(--current-bg-color)";
  document.body.style.color = "var(--current-text-color)";
}

function toggleMode() {
  isDarkMode = !isDarkMode;
  localStorage.setItem("isDarkMode", isDarkMode);
  applyMode();
}

applyMode();
