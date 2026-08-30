(function () {
  // Año en el footer
  document.querySelectorAll(".year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Menú móvil
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      toggle.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.classList.remove("open");
      });
    });
  }

  // Formulario: validación + envío a FormSubmit (compatible con GitHub Pages)
  var form = document.getElementById("contactForm");
  if (!form) return;

  var statusEl = document.getElementById("formStatus");
  var submitBtn = document.getElementById("submitBtn");

  function showStatus(msg, type) {
    statusEl.hidden = false;
    statusEl.textContent = msg;
    statusEl.className = "form-status " + type;
  }

  function clearInvalid() {
    form.querySelectorAll(".invalid").forEach(function (el) {
      el.classList.remove("invalid");
    });
  }

  form.addEventListener("submit", function (e) {
    clearInvalid();

    var nombre = form.nombre.value.trim();
    var email = form.email.value.trim();
    var tipo = form.tipo.value;
    var mensaje = form.mensaje.value.trim();

    var ok = true;
    if (!nombre) {
      form.nombre.classList.add("invalid");
      ok = false;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      form.email.classList.add("invalid");
      ok = false;
    }
    if (!tipo) {
      form.tipo.classList.add("invalid");
      ok = false;
    }
    if (!mensaje) {
      form.mensaje.classList.add("invalid");
      ok = false;
    }

    if (!ok) {
      e.preventDefault();
      showStatus("Revisa los campos obligatorios marcados.", "err");
      return;
    }

    // Actualizar asunto con el tipo de proyecto
    var subjectInput = form.querySelector('input[name="_subject"]');
    if (subjectInput) {
      subjectInput.value = "Pedido WebCorpPro — " + tipo;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando…";
    // El formulario se envía de forma normal a FormSubmit
  });
})();
