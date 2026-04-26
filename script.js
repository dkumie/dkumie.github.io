// Minimal progressive enhancement only.
// The site should remain readable even if JavaScript fails.

const navToggle = document.querySelector(".nav-toggle");
const headerPanel = document.querySelector(".header-panel");
const yearNode = document.querySelector("#year");
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (navToggle && headerPanel) {
  navToggle.addEventListener("click", () => {
    const isOpen = headerPanel.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  headerPanel.addEventListener("click", (event) => {
    const clickedLink = event.target.closest('a[href^="#"]');
    if (clickedLink) {
      headerPanel.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Highlight the active section in the header as the user scrolls.
const sections = [...document.querySelectorAll("main section[id]")];

if ("IntersectionObserver" in window && sections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    {
      rootMargin: "-35% 0px -50% 0px",
      threshold: 0.01,
    }
  );

  sections.forEach((section) => observer.observe(section));
}
