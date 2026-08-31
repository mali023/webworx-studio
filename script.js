/* Webworx Studio — coming soon */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- typed code editor ---------- */
  var editor = document.querySelector(".editor");
  if (editor && !reducedMotion) {
    var lines = editor.querySelectorAll(".line");
    editor.classList.add("typing");
    lines.forEach(function (line, i) {
      setTimeout(function () {
        line.classList.add("typed");
      }, 350 + i * 260);
    });
    // stop hiding lines once everything has typed (safety net)
    setTimeout(function () {
      editor.classList.remove("typing");
      lines.forEach(function (l) { l.classList.add("typed"); });
    }, 350 + lines.length * 260 + 800);
  }

  /* ---------- build progress bar ---------- */
  var fill = document.getElementById("build-fill");
  var pct = document.getElementById("build-pct");
  var msg = document.getElementById("build-msg");
  var messages = [
    "initializing repo…",
    "installing dependencies…",
    "compiling ui components…",
    "optimizing assets…",
    "brewing coffee…",
    "polishing pixels…",
    "deploying to production…"
  ];

  if (fill && pct && !reducedMotion) {
    var progress = 0;
    var target = 87;
    // this deferred script runs before first paint, so reset the CSS 87%
    // fallback to 0 without a visible backwards jump
    fill.style.transition = "none";
    fill.style.width = "0%";
    pct.textContent = "0%";
    void fill.offsetWidth;
    fill.style.transition = "";
    var tick = setInterval(function () {
      progress += Math.max(1, Math.round((target - progress) / 8));
      if (progress >= target) {
        progress = target;
        clearInterval(tick);
        // idle wobble between 87–96%
        setInterval(function () {
          progress = Math.min(96, progress + (Math.random() > 0.6 ? 1 : 0));
          fill.style.width = progress + "%";
          pct.textContent = progress + "%";
        }, 2600);
      }
      fill.style.width = progress + "%";
      pct.textContent = progress + "%";
    }, 90);
  }

  if (msg && !reducedMotion) {
    var mi = 2; // index of the message already in the HTML
    setInterval(function () {
      mi = (mi + 1) % messages.length;
      msg.textContent = messages[mi];
    }, 2400);
  }

  /* ---------- footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- contact form ---------- */
  // Submissions are delivered by FormSubmit (formsubmit.co).
  // NOTE: the first submission triggers a one-time activation email
  // to CONTACT_EMAIL — click the link in it to start receiving messages.
  var CONTACT_EMAIL = "hello" + "@" + "moali.co.za"; // contact inbox — swap for a studio address any time
  var ENDPOINT = "https://formsubmit.co/ajax/" + CONTACT_EMAIL;

  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  var submitBtn = document.getElementById("f-submit");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = document.getElementById("f-name");
      var email = document.getElementById("f-email");
      var message = document.getElementById("f-message");
      var service = document.getElementById("f-service");
      var honey = form.querySelector('input[name="_honey"]');

      if (honey && honey.value) return; // bot

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      status.className = "form-status mono";
      status.textContent = "sending…";
      submitBtn.disabled = true;
      submitBtn.textContent = "> sending…";

      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: name.value.trim(),
          email: email.value.trim(),
          service: service.value,
          message: message.value.trim(),
          _subject: "New enquiry — Webworx Studio",
          _template: "table",
          _captcha: "false"
        })
      })
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          return res.json();
        })
        .then(function () {
          status.className = "form-status mono ok";
          status.textContent = "✓ message_sent — we'll get back to you soon.";
          form.reset();
          submitBtn.textContent = "> send_message()";
          submitBtn.disabled = false;
        })
        .catch(function () {
          status.className = "form-status mono err";
          var subject = encodeURIComponent("New enquiry — Webworx Studio");
          var body = encodeURIComponent(
            "Name: " + name.value.trim() +
            "\nEmail: " + email.value.trim() +
            "\nService: " + service.value +
            "\n\n" + message.value.trim()
          );
          status.innerHTML =
            '✗ send_failed — <a href="mailto:' + CONTACT_EMAIL +
            "?subject=" + subject + "&body=" + body +
            '">email us directly instead</a>.';
          submitBtn.textContent = "> send_message()";
          submitBtn.disabled = false;
        });
    });
  }
})();
