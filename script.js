// Navbar toggle
const menuBtn = document.querySelector(".dropdownimg");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// About Section Counter Animation
const counters = document.querySelectorAll(".counter");

const startCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  const suffix = counter.getAttribute("data-suffix") || "";

  let current = 0;

  const updateCounter = () => {
    const increment = target / 100;

    current += increment;

    if (current < target) {
      counter.innerText = `${Math.ceil(current).toLocaleString()}${suffix}`;
      requestAnimationFrame(updateCounter);
    } else {
      counter.innerText = `${target.toLocaleString()}${suffix}`;
    }
  };

  updateCounter();
};

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.5,
  },
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

// FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  item.addEventListener("click", () => {
    // close other items
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
        otherItem.querySelector(".faq-answer").style.maxHeight = null;
      }
    });

    const answer = item.querySelector(".faq-answer");

    if (item.classList.contains("active")) {
      item.classList.remove("active");
      answer.style.maxHeight = null;
    } else {
      item.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// contact
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
