/* ==========================================================================
   BLUE TIDE SEAFOOD RESTAURANT — MAIN SCRIPT
   Features: smooth scrolling, active nav highlighting, back-to-top button,
             form confirmation message, simple gallery interaction
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* ------------------------------------------------------------------
     1. SMOOTH SCROLLING for in-page anchor links (e.g. "#featured-dishes")
     ------------------------------------------------------------------ */
  var anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href");
      if (targetId.length > 1) {
        var targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  /* ------------------------------------------------------------------
     2. ACTIVE NAVIGATION HIGHLIGHTING
     Highlights the nav link that matches the current page filename.
     ------------------------------------------------------------------ */
  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  var navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  navLinks.forEach(function (link) {
    var linkPage = link.getAttribute("href");
    link.classList.remove("active");
    if (linkPage === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  /* ------------------------------------------------------------------
     3. BACK-TO-TOP BUTTON
     Shows the button after scrolling down, scrolls to top when clicked.
     ------------------------------------------------------------------ */
  var backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ------------------------------------------------------------------
     4. RESERVATION FORM CONFIRMATION MESSAGE
     Runs only on contact.html, where the form and confirmation box exist.
     ------------------------------------------------------------------ */
  var feedbackForm = document.getElementById("feedbackForm");
  var confirmationBox = document.getElementById("formConfirmation");

  if (feedbackForm && confirmationBox) {
    feedbackForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Rely on the browser's built-in HTML5 validation first
      if (!feedbackForm.checkValidity()) {
        feedbackForm.reportValidity();
        return;
      }

      var nameField = document.getElementById("fullName");
      var guestName = nameField ? nameField.value : "there";

      confirmationBox.textContent =
        "Thank you, " + guestName + "! Your reservation request has been received. " +
        "Our team will contact you shortly to confirm.";
      confirmationBox.classList.add("show");
      confirmationBox.setAttribute("role", "status");

      feedbackForm.reset();
      confirmationBox.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* ------------------------------------------------------------------
     5. SIMPLE GALLERY INTERACTION
     Clicking a gallery item filters the grid: shows only items in the
     same category, dims the rest. Clicking "All" resets the view.
     ------------------------------------------------------------------ */
  var filterButtons = document.querySelectorAll(".bt-gallery-filter [data-filter]");
  var galleryItems = document.querySelectorAll(".bt-gallery-item");

  if (filterButtons.length && galleryItems.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = this.getAttribute("data-filter");

        filterButtons.forEach(function (b) { b.classList.remove("active"); });
        this.classList.add("active");

        galleryItems.forEach(function (item) {
          var category = item.getAttribute("data-category");
          if (filter === "all" || filter === category) {
            item.style.display = "";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

});
