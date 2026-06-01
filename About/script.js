// Navbar toggle
const menuBtn = document.querySelector(".dropdownimg");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// reveal
const sections = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
      // else {
      //   entry.target.classList.remove("active");
      // }
    });
  },
  {
    threshold: 0.2,
  },
);

sections.forEach((section) => {
  revealObserver.observe(section);
});
