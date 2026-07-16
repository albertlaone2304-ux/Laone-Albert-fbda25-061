
document.addEventListener("DOMContentLoaded", function () {

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

  function setupFormConfirmation(formId, confirmationId, buildMessage) {
    var form = document.getElementById(formId);
    var confirmationBox = document.getElementById(confirmationId);
    if (!form || !confirmationBox) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      confirmationBox.textContent = buildMessage(form);
      confirmationBox.classList.add("show");
      confirmationBox.setAttribute("role", "status");

      form.reset();
      confirmationBox.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  setupFormConfirmation("reservationForm", "formConfirmation", function (form) {
    var nameField = form.querySelector("#fullName");
    var guestName = nameField && nameField.value ? nameField.value : "there";
    return "Thank you, " + guestName + "! Your reservation request has been received. " +
      "Our team will contact you shortly to confirm.";
  });

  setupFormConfirmation("feedbackForm", "feedbackConfirmation", function (form) {
    var nameField = form.querySelector("#feedbackName");
    var guestName = nameField && nameField.value ? nameField.value : "there";
    return "Thank you, " + guestName + "! We appreciate you taking the time to share your feedback.";
  });

  var filterButtons = document.querySelectorAll(".bt-btn-outline-filter[data-filter]");
  var menuItems = document.querySelectorAll(".bt-menu-item");

  if (filterButtons.length && menuItems.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = this.getAttribute("data-filter");

        filterButtons.forEach(function (b) {
          b.classList.remove("active");
          b.setAttribute("aria-pressed", "false");
        });
        this.classList.add("active");
        this.setAttribute("aria-pressed", "true");

        menuItems.forEach(function (item) {
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
