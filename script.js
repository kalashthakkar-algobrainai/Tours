const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

// Typing Effect Script
// document.addEventListener('DOMContentLoaded', function () {
//     const textElement = document.getElementById('typing-text');
//     const originalText = "Surat To ";
//     const typingText = "Outstation Taxi Service.";
//     textElement.innerHTML = originalText;

//     function type() {
//         let i = 0;
//         function addNextCharacter() {
//             if (i < typingText.length) {
//                 const textColor = 'rgb(255, 196, 54)';
//                 textElement.innerHTML += `<span style="color: ${textColor};">${typingText.charAt(i)}</span>`;
//                 i++;
//                 setTimeout(addNextCharacter, 50); // Adjust typing speed (in milliseconds)
//             } else {
//                 // Typing completed, reset for the next iteration
//                 setTimeout(resetText, 1000); // Adjust delay before starting again (in milliseconds)
//             }
//         }

//         function resetText() {
//             textElement.innerHTML = originalText;
//             i = 0;
//             setTimeout(type, 500); // Adjust delay before starting the next typing (in milliseconds)
//         }

//         addNextCharacter();
//     }

//     // Start the typing effect and create an infinite loop
//     function startTypingLoop() {
//         type();
//     }

//     startTypingLoop();

//     // Set the text color of "Surat To" to black
//     textElement.style.color = 'black';
// });

document.addEventListener("DOMContentLoaded", function () {
  const textElement = document.getElementById("typing-text");
  const originalText = "Surat To ";
  const typingText = "Outstation Taxi Service.";
  textElement.innerHTML = originalText;
  textElement.style.lineHeight = "1"; // Adjust line height as needed
  let i = 0;

  function type() {
    if (i < typingText.length) {
      const textColor = "var(--primary-txt-clr)";
      textElement.innerHTML += `<span style="color: ${textColor};">${typingText.charAt(
        i++
      )}</span>`;
      setTimeout(type, 50); // Adjust typing speed (in milliseconds)
    } else {
      setTimeout(resetText, 1000); // Adjust delay before starting again (in milliseconds)
    }
  }

  function resetText() {
    textElement.innerHTML = originalText;
    i = 0;
    setTimeout(type, 500); // Adjust delay before starting the next typing (in milliseconds)
  }

  // Start the typing effect and create an infinite loop
  function startTypingLoop() {
    type();
  }

  // Set the text color of "Surat To" to black
  textElement.style.color = "var(--primary-txt-clr)";

  // Wait for the DOM to be fully loaded
  var loader = document.getElementById("loader");

  // Function to hide the loader
  function hideLoader() {
    loader.style.display = "none";
    startTypingLoop();
  }

  // Set a timeout to hide the loader after 4 seconds (4000 milliseconds)
  setTimeout(hideLoader, 4000);
});

//Theme toggler

document.addEventListener("DOMContentLoaded", function () {
  //theme toggler logic
  document
    .querySelector(".theme-toggler")
    .addEventListener("click", function () {
      document.querySelector(".toggler").classList.toggle("active");
    });

  let sun = document.getElementById("sun");
  let moon = document.getElementById("moon");
  const html = document.querySelector("html");
  let toggler = document.querySelector(".toggler");
  function setTheme() {
    // Check local storage for the theme
    const currentTheme = localStorage.getItem("theme");
    console.log(currentTheme);

    if (currentTheme) {
      html.classList.add(currentTheme);
      if (currentTheme === "dark") {
        removeClass(moon, "translate-down");
        addClass(sun, "translate-up");
        addClass(html, "dark-theme");
      } else {
        removeClass(sun, "translate-up");
        addClass(moon, "translate-down");
        removeClass(html, "dark-theme");
      }
    }
  }

  // Helper functions to add and remove classes
  function addClass(element, className) {
    if (!element.classList.contains(className)) {
      element.classList.add(className);
    }
  }

  function removeClass(element, className) {
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    }
  }

  // Call the function to set the theme
  setTheme();
  toggler.addEventListener("click", function (e) {
    if (moon.classList.contains("translate-down")) {
      moon.classList.remove("translate-down");
      sun.classList.add("translate-up");
      localStorage.setItem("theme", "dark");
      console.log("set to dark");
      html.classList.add("dark");
    } else {
      sun.classList.remove("translate-up");
      moon.classList.add("translate-down");
      localStorage.setItem("theme", "light");
      console.log("set to light");

      html.classList.remove("dark");
    }
  });

  const header = document.getElementById("header");
  const wrapper = document.querySelector(".navbar-wrapper"); // Assuming your header has the ID "navbar-wrapper"
  // Function to update header background based on scroll position
  function updateHeaderBackground() {
    if (window.scrollY > 50) {
      // Adjust the scroll threshold as needed
      header.style.backgroundColor = "var(--secondary-clr)"; // Set your transparent background color
      wrapper.style.borderRadius = "500px";
      header.style.background = "rgba(255, 255, 255, 0.1)"; // Semi-transparent white background
      header.style.backdropFilter = "blur(10px)";
    } else {
      header.style.backgroundColor = ""; // Set your normal background color
      wrapper.style.borderRadius = "";
      header.style.background = ""; // Clear the background style
      header.style.backdropFilter = "";
    }
  }

  // Add scroll event listener to update header background on scroll
  window.addEventListener("scroll", updateHeaderBackground);

  // Initial call to set the initial background color based on the scroll position
  updateHeaderBackground();
});

//gsap animations
// Smooth Scroll Functionality
document.addEventListener("DOMContentLoaded", function () {
  const feBoxes = document.querySelectorAll(".fe-box");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  });

  feBoxes.forEach((el) => observer.observe(el));
});

// Script for About page scroll

// document.addEventListener("DOMContentLoaded", function() {
//     var paragraphs = document.querySelectorAll(".text-col p");

//     function revealParagraphs() {
//       paragraphs.forEach(function(paragraph, index) {
//         if (isElementInViewport(paragraph)) {
//           paragraph.classList.add("revealed");
//         }
//       });
//     }

//     function isElementInViewport(element) {
//       var rect = element.getBoundingClientRect();
//       return (
//         rect.top >= 0 &&
//         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
//       );
//     }

//     // Initial reveal check
//     revealParagraphs();

//     // Event listener for scroll
//     window.addEventListener("scroll", revealParagraphs);
//   });

// Scrolling script for chatbot

// document.addEventListener("scroll", function() {
//     const scrollPosition = window.scrollY || document.documentElement.scrollTop;
//     const chatbotLogoContainer = document.getElementById("chatbotLogoContainer");

//     // Adjust the top position based on the scroll position
//     chatbotLogoContainer.style.top = (10 + scrollPosition) + "px";
// });

// Add this JavaScript code to handle the scrolling
document.addEventListener("DOMContentLoaded", function () {
  var chatbotContainer = document.querySelector(".chatbot-container");
  var chatbotLogoContainer = document.querySelector(".chatbot-logo-container");

  window.addEventListener("scroll", function () {
    var scrollHeight = document.documentElement.scrollHeight;
    var clientHeight = window.innerHeight;
    var scrollTop = window.scrollY || window.pageYOffset;

    if (scrollHeight - scrollTop <= clientHeight) {
      chatbotContainer.style.bottom = "20px"; // Adjust as needed
    } else {
      chatbotContainer.style.bottom = "-100px"; // Adjust as needed
    }
  });
});
