/* Webworx Studio */
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

  /* ---------- build status bar ---------- */
  var fill = document.getElementById("build-fill");
  var pct = document.getElementById("build-pct");
  var msg = document.getElementById("build-msg");
  var DONE_MSG = "✓ all systems operational";
  var messages = [
    "initializing repo…",
    "installing dependencies…",
    "compiling ui components…",
    "optimizing assets…",
    "polishing pixels…",
    "deploying to production…"
  ];

  if (fill && pct && msg && !reducedMotion) {
    var progress = 0;
    var target = 100;
    var mi = 0;
    // this deferred script runs before first paint, so reset the CSS 100%
    // fallback to 0 without a visible backwards jump
    fill.style.transition = "none";
    fill.style.width = "0%";
    pct.textContent = "0%";
    msg.textContent = messages[0];
    void fill.offsetWidth;
    fill.style.transition = "";
    var tick = setInterval(function () {
      progress += Math.max(1, Math.round((target - progress) / 8));
      if (progress >= target) {
        progress = target;
        clearInterval(tick);
        msg.textContent = DONE_MSG;
      } else {
        // walk through the build messages as the bar climbs
        var step = Math.min(messages.length - 1, Math.floor((progress / target) * messages.length));
        if (step !== mi) {
          mi = step;
          msg.textContent = messages[mi];
        }
      }
      fill.style.width = progress + "%";
      pct.textContent = progress + "%";
    }, 110);
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
