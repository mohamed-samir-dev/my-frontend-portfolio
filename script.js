// This is for navigating between pages or sections inside a Single Page Application (SPA)
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll("[data-nav-link]");
  const pages = {
    "About-btn": "about",
    "resume-btn": "resume",
    "Portfolio-btn": "portfolio",
    "Blog-btn": "blog",
    "Contact-btn": "contact",
  };

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      let targetPage = pages[this.id];

      document.querySelectorAll(".page").forEach((page) => {
        page.classList.remove("active");
      });

      document.getElementById(targetPage).classList.add("active");

    });
  });
});
// Filtering portfolio items based on category (like HTML/CSS or React)
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const portfolioContainer = document.querySelector(".portfolio-container");

  // Initialize counters for each category
  updateCategoryCounters();

  // Set up filter button click handlers
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Get selected category
      const category = this.getAttribute("data-filter");

      // Get filter text for more specific filtering
      const filterText = this.querySelector(".filter-text")?.textContent || "";

      // Apply smooth filtering animation
      filterPortfolioItems(category, filterText);
    });
  });

  // Initialize with "All" filter active
  document.querySelector('.filter-btn[data-filter="all"]').click();

  // Function to filter portfolio items with animation
  function filterPortfolioItems(category, filterText) {
    // Add a class to indicate filtering is in progress
    portfolioContainer.classList.add("filtering");

    portfolioItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");
      const techTags = item.querySelectorAll(".tech-tag");
      let shouldShow = false;

      // Check if item should be shown based on category
      if (category === "all") {
        shouldShow = true;
      } else if (category === "frontend") {
        if (filterText === "HTML/CSS") {
          // For HTML/CSS filter, check if item has HTML and CSS tags but no JS
          const hasTags = Array.from(techTags).some((tag) =>
            ["HTML5", "CSS3"].includes(tag.textContent)
          );
          const hasNoJS = !Array.from(techTags).some(
            (tag) => tag.textContent === "JavaScript"
          );
          shouldShow = hasTags && hasNoJS && itemCategory === "web";
        } else if (filterText === "HTML/CSS/JS") {
          // For HTML/CSS/JS filter, check if item has all three tags
          const hasHTML = Array.from(techTags).some(
            (tag) => tag.textContent === "HTML5"
          );
          const hasCSS = Array.from(techTags).some(
            (tag) => tag.textContent === "CSS3"
          );
          const hasJS = Array.from(techTags).some(
            (tag) => tag.textContent === "JavaScript"
          );
          shouldShow = hasHTML && hasCSS && hasJS && itemCategory === "web";
        }
      } else if (category === "react") {
        // For react filter, check if item has React tag
        shouldShow = Array.from(techTags).some(
          (tag) => tag.textContent === "React"
        );
      }

      if (shouldShow) {
        // Show matching items with fade-in effect
        item.classList.remove("hidden");
        item.classList.add("show");

        // Use setTimeout for smooth transition
        setTimeout(() => {
          item.style.display = "block";
          item.style.opacity = "1";
        }, 50);
      } else {
        // Hide non-matching items with fade-out effect
        item.classList.add("hidden");
        item.classList.remove("show");

        item.style.opacity = "0";
        setTimeout(() => {
          item.style.display = "none";
        }, 300);
      }
    });

    // Remove filtering class after animations complete
    setTimeout(() => {
      portfolioContainer.classList.remove("filtering");
    }, 500);
  }

  // Function to update category counters
  // Function to update category counters
  function updateCategoryCounters() {
    filterButtons.forEach((button) => {
      const category = button.getAttribute("data-filter");
      const filterText =
        button.querySelector(".filter-text")?.textContent || "";
      const counter = button.querySelector(".filter-count");

      if (counter) {
        if (category === "all") {
          // Count all portfolio items regardless of category
          const count = portfolioItems.length;
          counter.textContent = count;
        } else if (category === "frontend") {
          if (filterText === "HTML/CSS") {
            // Count items with HTML/CSS tags but no JS
            const count = Array.from(portfolioItems).filter((item) => {
              const techTags = item.querySelectorAll(".tech-tag");
              const hasTags = Array.from(techTags).some((tag) =>
                ["HTML5", "CSS3"].includes(tag.textContent)
              );
              const hasNoJS = !Array.from(techTags).some(
                (tag) => tag.textContent === "JavaScript"
              );
              return (
                hasTags &&
                hasNoJS &&
                item.getAttribute("data-category") === "web"
              );
            }).length;
            counter.textContent = count;
          } else if (filterText === "HTML/CSS/JS") {
            // Count items with HTML, CSS, and JS tags
            const count = Array.from(portfolioItems).filter((item) => {
              const techTags = item.querySelectorAll(".tech-tag");
              const hasHTML = Array.from(techTags).some(
                (tag) => tag.textContent === "HTML5"
              );
              const hasCSS = Array.from(techTags).some(
                (tag) => tag.textContent === "CSS3"
              );
              const hasJS = Array.from(techTags).some(
                (tag) => tag.textContent === "JavaScript"
              );
              return (
                hasHTML &&
                hasCSS &&
                hasJS &&
                item.getAttribute("data-category") === "web"
              );
            }).length;
            counter.textContent = count;
          }
        } else if (category === "react") {
          // Count items with React tag
          const count = Array.from(portfolioItems).filter((item) => {
            const techTags = item.querySelectorAll(".tech-tag");
            return Array.from(techTags).some(
              (tag) => tag.textContent === "React"
            );
          }).length;
          counter.textContent = count;
        }
      }
    });
  }
});

//   // Get the sidebar button and contact container
//   const sidebarBtn = document.querySelector("[data-sidebar-btn]");
//   const contactContainer = document.querySelector(".contact-container");

//   // Function to check screen size and set initial state
//   function checkScreenSize() {
//     if (window.innerWidth <= 991) {
//       // On mobile/tablet, hide contacts by default
//       contactContainer.classList.remove("active");
//       if (sidebarBtn) {
//         sidebarBtn.classList.remove("active");
//         const btnText = sidebarBtn.querySelector("span");
//         if (btnText) {
//           btnText.textContent = "Show Contacts";
//         }
//       }
//     } else {
//       // On desktop, show contacts by default
//       contactContainer.classList.add("active");
//     }
//   }

//   // Run on page load
//   checkScreenSize();

//   // Add click event to sidebar button
//   if (sidebarBtn) {
//     sidebarBtn.addEventListener("click", function () {
//       // Toggle active class on contact container
//       contactContainer.classList.toggle("active");

//       // Toggle active class on button
//       this.classList.toggle("active");

//       // Change button text based on state
//     });
//   }

//   // Handle window resize
//   let resizeTimer;
//   window.addEventListener("resize", function () {
//     // Debounce the resize event
//     clearTimeout(resizeTimer);
//     resizeTimer = setTimeout(function () {
//       checkScreenSize();
//     }, 250);
//   });

//   // Optional: Add smooth scrolling for anchor links
//   document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
//     anchor.addEventListener("click", function (e) {
//       e.preventDefault();

//       const targetId = this.getAttribute("href");
//       if (targetId === "#") return;

//       const targetElement = document.querySelector(targetId);
//       if (targetElement) {
//         targetElement.scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });

//         // On mobile, close the sidebar after navigation
//         if (
//           window.innerWidth <= 991 &&
//           contactContainer.classList.contains("active")
//         ) {
//           contactContainer.classList.remove("active");
//           if (sidebarBtn) {
//             sidebarBtn.classList.remove("active");
//             const btnText = sidebarBtn.querySelector("span");
//             if (btnText) {
//               btnText.textContent = "Show Contacts";
//             }
//           }
//         }
//       }
//     });
//   });
// });

// This is for the testimonial carousel functionality
document.addEventListener("DOMContentLoaded", function () {
  // Testimonial carousel functionality
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".testimonial-dot");
  const prevBtn = document.querySelector(".prev-testimonial");
  const nextBtn = document.querySelector(".next-testimonial");
  const testimonialSection = document.querySelector(".testimonial");

  let currentIndex = 0;
  let isAnimating = false;
  let autoplayInterval;

  // Initialize the carousel
  function initTestimonials() {
    // Position cards
    testimonialCards.forEach((card, index) => {
      // Set initial positions
      if (index === currentIndex) {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.display = "block";
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.display = "none";
      }

      // Add transition properties
      card.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    });

    // Animate the first card with a slight delay
    setTimeout(() => {
      animateCardEntrance(testimonialCards[currentIndex]);
    }, 300);

    // Start autoplay
    startAutoplay();
  }

  // Animate card entrance with a staggered effect
  function animateCardEntrance(card) {
    // Main card animation
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";

    // Get elements for staggered animation
    const img = card.querySelector(".testimonial-img");
    const name = card.querySelector(".testimonial-card-header-name");
    const date = card.querySelector(".time");
    const text = card.querySelector(".testimonial-card-header-position");

    // Reset elements for animation
    img.style.opacity = "0";
    img.style.transform = "scale(0.7) rotate(-5deg)";

    name.style.opacity = "0";
    name.style.transform = "translateY(20px)";

    date.style.opacity = "0";
    date.style.transform = "translateX(-20px)";

    text.style.opacity = "0";
    text.style.clipPath = "inset(0 100% 0 0)";

    // Animate image with bounce effect
    setTimeout(() => {
      img.style.transition =
        "opacity 0.5s ease, transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)";
      img.style.opacity = "1";
      img.style.transform = "scale(1) rotate(0deg)";
    }, 100);

    // Animate name with fade up
    setTimeout(() => {
      name.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      name.style.opacity = "1";
      name.style.transform = "translateY(0)";
    }, 300);

    // Animate date with slide in
    setTimeout(() => {
      date.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      date.style.opacity = "1";
      date.style.transform = "translateX(0)";
    }, 500);

    // Animate text with reveal effect
    setTimeout(() => {
      text.style.transition = "opacity 0.8s ease, clip-path 1.2s ease";
      text.style.opacity = "1";
      text.style.clipPath = "inset(0 0 0 0)";
    }, 700);

    // Add a subtle highlight sweep animation
    setTimeout(() => {
      const highlight = document.createElement("div");
      highlight.style.position = "absolute";
      highlight.style.top = "0";
      highlight.style.left = "-100%";
      highlight.style.width = "100%";
      highlight.style.height = "100%";
      highlight.style.background =
        "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)";
      highlight.style.zIndex = "1";
      highlight.style.pointerEvents = "none";

      card.style.position = "relative";
      card.style.overflow = "hidden";
      card.appendChild(highlight);

      highlight.animate([{ left: "-100%" }, { left: "100%" }], {
        duration: 1500,
        easing: "ease-in-out",
      }).onfinish = () => {
        card.removeChild(highlight);
      };
    }, 1200);
  }

  // Animate card exit
  function animateCardExit(card) {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
  }

  // Go to a specific slide
  function goToSlide(index) {
    if (isAnimating || index === currentIndex) return;
    isAnimating = true;

    // Update dots
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");

    // Animate dot selection
    dots[index].animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.5)" },
        { transform: "scale(1.3)" },
      ],
      {
        duration: 500,
        easing: "ease-out",
      }
    );

    // Determine direction for animation
    const direction = index > currentIndex ? 1 : -1;

    // Animate current card exit
    animateCardExit(testimonialCards[currentIndex]);

    // After exit animation, switch cards
    setTimeout(() => {
      testimonialCards[currentIndex].style.display = "none";

      // Set up next card for entrance
      testimonialCards[index].style.display = "block";
      testimonialCards[index].style.opacity = "0";
      testimonialCards[index].style.transform = `translateY(${
        30 * direction
      }px)`;

      // Force a reflow
      void testimonialCards[index].offsetWidth;

      // Animate the new card entrance
      animateCardEntrance(testimonialCards[index]);

      // Update current index
      currentIndex = index;

      // Reset animation flag after transition completes
      setTimeout(() => {
        isAnimating = false;
      }, 1000);
    }, 600);
  }

  // Next slide
  function nextSlide() {
    const nextIndex = (currentIndex + 1) % testimonialCards.length;
    goToSlide(nextIndex);
  }

  // Previous slide
  function prevSlide() {
    const prevIndex =
      (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
    goToSlide(prevIndex);
  }

  // Start autoplay
  function startAutoplay() {
    stopAutoplay(); // Clear any existing interval
    autoplayInterval = setInterval(nextSlide, 6000);
  }

  // Stop autoplay
  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
  }

  // Animate arrow buttons on hover
  function setupArrowAnimations() {
    const arrows = document.querySelectorAll(".testimonial-arrow");

    arrows.forEach((arrow) => {
      arrow.addEventListener("mouseenter", function () {
        this.animate(
          [
            { transform: "translateY(-50%)" },
            { transform: "translateY(-50%) scale(1.1)" },
            { transform: "translateY(-50%) scale(1.05)" },
          ],
          {
            duration: 400,
            easing: "ease-out",
            fill: "forwards",
          }
        );
      });

      arrow.addEventListener("mouseleave", function () {
        this.animate(
          [
            { transform: "translateY(-50%) scale(1.05)" },
            { transform: "translateY(-50%)" },
          ],
          {
            duration: 300,
            easing: "ease-out",
            fill: "forwards",
          }
        );
      });
    });
  }

  // Event listeners
  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      goToSlide(index);
      stopAutoplay();
      startAutoplay(); // Reset autoplay timer
    });
  });

  prevBtn.addEventListener("click", function () {
    prevSlide();
    stopAutoplay();
    startAutoplay(); // Reset autoplay timer
  });

  nextBtn.addEventListener("click", function () {
    nextSlide();
    stopAutoplay();
    startAutoplay(); // Reset autoplay timer
  });

  // Add keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      prevSlide();
      stopAutoplay();
      startAutoplay();
    } else if (e.key === "ArrowRight") {
      nextSlide();
      stopAutoplay();
      startAutoplay();
    }
  });

  //  Initialize animations
  setupArrowAnimations();
  initTestimonials();

  // Add intersection observer for animation when scrolled into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate title when scrolled into view
          const title = testimonialSection.querySelector(".testimonial-title");
          title.style.opacity = "0";
          title.style.transform = "translateY(20px)";

          setTimeout(() => {
            title.style.transition = "opacity 0.8s ease, transform 0.8s ease";
            title.style.opacity = "1";
            title.style.transform = "translateY(0)";

            // Animate the underline
            const underline = document.createElement("span");
            underline.style.position = "absolute";
            underline.style.bottom = "-12px";
            underline.style.left = "50%";
            underline.style.transform = "translateX(-50%)";
            underline.style.width = "0";
            underline.style.height = "3px";
            underline.style.background = "hsl(45, 100%, 72%)";
            underline.style.borderRadius = "3px";

            title.appendChild(underline);

            underline.animate([{ width: "0" }, { width: "60px" }], {
              duration: 800,
              easing: "ease-out",
              fill: "forwards",
            });
          }, 300);

          observer.disconnect(); // Only animate once
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(testimonialSection);
});

document.addEventListener("DOMContentLoaded", function () {
  // Get the expand button and contact container elements
  const expandBtn = document.querySelector(".profile-expand-btn");
  const contactContainer = document.querySelector(".contact-container");

  // Check if elements exist before adding event listeners
  if (expandBtn && contactContainer) {
    // Set initial state (closed on mobile)
    if (window.innerWidth <= 1024) {
      contactContainer.style.maxHeight = "0";
      contactContainer.style.opacity = "0";
      contactContainer.style.transform = "translateY(-10px)";
      contactContainer.style.overflow = "hidden";
      expandBtn.style.display = "flex";
      expandBtn.setAttribute("aria-expanded", "false");
    }

    // Toggle contact info when button is clicked
    expandBtn.addEventListener("click", function () {
      const isExpanded = expandBtn.getAttribute("aria-expanded") === "true";

      if (isExpanded) {
        // Collapse
        contactContainer.style.maxHeight = "0";
        contactContainer.style.opacity = "0";
        contactContainer.style.transform = "translateY(-10px)";
        expandBtn.setAttribute("aria-expanded", "false");
        expandBtn.innerHTML = '<i class="fas fa-chevron-down"></i> ';
      } else {
        // Expand
        contactContainer.style.maxHeight = contactContainer.scrollHeight + "px";
        contactContainer.style.opacity = "1";
        contactContainer.style.transform = "translateY(0)";
        expandBtn.setAttribute("aria-expanded", "true");
        expandBtn.innerHTML = '<i class="fas fa-chevron-up"></i> ';
      }
    });

    // Update on window resize
    window.addEventListener("resize", function () {
      if (window.innerWidth <= 1024) {
        // Mobile view - check if button is already set up
        if (expandBtn.style.display !== "flex") {
          expandBtn.style.display = "flex";

          // Only collapse if it wasn't manually expanded
          if (expandBtn.getAttribute("aria-expanded") !== "true") {
            contactContainer.style.maxHeight = "0";
            contactContainer.style.opacity = "0";
            contactContainer.style.transform = "translateY(-10px)";
            expandBtn.setAttribute("aria-expanded", "false");
            expandBtn.innerHTML = '<i class="fas fa-chevron-down"></i> ';
          }
        }
      } else {
        // Desktop view - always show contact info
        expandBtn.style.display = "none";
        contactContainer.style.maxHeight = "none";
        contactContainer.style.opacity = "1";
        contactContainer.style.transform = "none";
        contactContainer.style.overflow = "visible";
      }
    });
  }
});


  // Initialize EmailJS with your public key
  (function () {
    emailjs.init("_HJYVVKxjrh7VA7zc");
  })();

  // Handle form submission
  document.querySelector(".message-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Show loading state
    const submitButton = this.querySelector(".action-button");
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = `
  <span class="button-label">Sending...</span>
  <span class="button-graphic">
    <i class="fas fa-spinner fa-spin"></i>
  </span>
`;

    // Collect form data
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value
    };

    // Send email using EmailJS
    emailjs.send("service_1wqg8cc", "template_a28nf2m", formData)
      .then(function (response) {
        // Reset form
        document.querySelector(".message-form").reset();

        // Reset button state
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;

        // Show success message with SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Your message has been delivered successfully.',
          confirmButtonText: 'Great!',
          confirmButtonColor: 'hsl(45, 100%, 72%)',
          background: 'hsl(240, 2%, 12%)',
          color: '#ffffff',
          iconColor: 'hsl(45, 100%, 72%)',
          showClass: {
            popup: 'animate__animated animate__fadeInUp animate__faster'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutDown animate__faster'
          },
          customClass: {
            confirmButton: 'swal-confirm-button'
          }
        });
      })
      .catch(function (error) {
        // Reset button state
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;

        // Show error message with SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Message Not Sent',
          text: 'There was a problem sending your message. Please try again.',
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#e74c3c',
          background: 'hsl(240, 2%, 12%)',
          color: '#ffffff',
          iconColor: '#e74c3c',
          showClass: {
            popup: 'animate__animated animate__fadeInUp animate__faster'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutDown animate__faster'
          },
          customClass: {
            confirmButton: 'swal-confirm-button'
          }
        });

        console.error("EmailJS Error:", error);
      });
  });
