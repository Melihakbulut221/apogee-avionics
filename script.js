// ===== Config: set these to your real contact details =====
const CONTACT_EMAIL = "melihakbulut92@gmail.com"; // <-- change to your email
// Optional: paste your Calendly (or other scheduling) link to show a "Book a call"
// button in the contact section. Leave empty to hide it.
const BOOKING_URL = ""; // e.g. "https://calendly.com/your-name/intro-call"

// ===== Year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Wire up email link =====
(function () {
  const link = document.getElementById("emailLink");
  if (link && CONTACT_EMAIL) {
    link.href =
      "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent("CubeSat project inquiry");
    link.textContent = CONTACT_EMAIL;
  }
})();

// ===== Booking link (shows the "Book a call" button only if BOOKING_URL is set) =====
(function () {
  const block = document.getElementById("bookBlock");
  const link = document.getElementById("bookLink");
  if (block && link && BOOKING_URL) {
    link.href = BOOKING_URL;
    block.hidden = false;
  }
})();

// ===== Mobile nav toggle =====
(function () {
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
})();

// ===== Contact form (AJAX submit to Formspree) =====
(function () {
  const form = document.getElementById("quoteForm");
  const note = document.getElementById("formNote");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    // If the Formspree endpoint hasn't been set yet, fall back to a mailto draft
    // so the site still "works" before you finish setup.
    if (form.action.includes("YOUR_FORM_ID")) {
      e.preventDefault();
      const data = new FormData(form);
      const body =
        "Name: " + (data.get("name") || "") +
        "\nEmail: " + (data.get("email") || "") +
        "\nOrganization: " + (data.get("organization") || "") +
        "\nForm factor: " + (data.get("form_factor") || "") +
        "\nSubsystem: " + (data.get("subsystem") || "") +
        "\n\n" + (data.get("message") || "");
      window.location.href =
        "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent("CubeSat project inquiry") +
        "&body=" + encodeURIComponent(body);
      note.className = "form__note ok";
      note.textContent = "Opening your email app… (set up Formspree to receive messages on the site directly)";
      return;
    }

    e.preventDefault();
    note.className = "form__note";
    note.textContent = "Sending…";
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        form.reset();
        note.className = "form__note ok";
        note.textContent = "Thanks! Your inquiry was sent — we'll reply within one business day.";
      } else {
        throw new Error("bad status");
      }
    } catch (err) {
      note.className = "form__note err";
      note.textContent = "Something went wrong. Please email us directly at " + CONTACT_EMAIL + ".";
    }
  });
})();

// ===== Subtle reveal on scroll =====
(function () {
  if (!("IntersectionObserver" in window)) return;
  const els = document.querySelectorAll(".card, .product, .step, .why__stat, .tier");
  els.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = "opacity .5s ease, transform .5s ease";
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "none";
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
})();
