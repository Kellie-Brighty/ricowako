// Copy to clipboard functionality
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      // Create and show a notification
      const notification = document.createElement("div");
      notification.className = "copy-notification";
      notification.textContent = "Contract address copied!";
      document.body.appendChild(notification);

      // Animate and remove after delay
      setTimeout(() => {
        notification.classList.add("show");
        setTimeout(() => {
          notification.classList.remove("show");
          setTimeout(() => {
            notification.remove();
          }, 300);
        }, 2000);
      }, 10);
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}

// Add scroll animations
document.addEventListener("DOMContentLoaded", () => {
  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".family-card, .info-card, .stat, .about-image"
    );

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("animate");
      }
    });
  };

  // Add animate class to CSS for these animations
  const style = document.createElement("style");
  style.textContent = `
    .family-card, .info-card, .stat, .about-image {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .family-card.animate, .info-card.animate, .stat.animate, .about-image.animate {
      opacity: 1;
      transform: translateY(0);
    }
    
    .copy-notification {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background-color: var(--primary-color);
      color: var(--secondary-color);
      padding: 12px 20px;
      border-radius: 5px;
      font-weight: 500;
      opacity: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
      z-index: 1000;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    
    .copy-notification.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  `;
  document.head.appendChild(style);

  // Stagger animation for family cards
  const familyCards = document.querySelectorAll(".family-card");
  familyCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });

  // Initial check and scroll listener
  animateOnScroll();
  window.addEventListener("scroll", animateOnScroll);

  // Parallax effect for hero section
  const hero = document.querySelector(".hero");
  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;
    if (hero) {
      hero.style.backgroundPosition = `center ${scrollPos * 0.5}px`;
    }
  });
});
