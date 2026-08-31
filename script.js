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

  // Formulario de pedido → abre el correo del cliente con el mensaje listo
  // Compatible con cualquier hosting (GitHub Pages, dominio propio, etc.)
  // Destino: badredinazzahraoui52@gmail.com
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
    e.preventDefault();
    clearInvalid();

    var nombre = form.nombre.value.trim();
    var email = form.email.value.trim();
    var telefono = form.telefono.value.trim();
    var tipo = form.tipo.value;
    var presupuesto = form.presupuesto.value;
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
      showStatus("Revisa los campos obligatorios marcados.", "err");
      return;
    }

    var subject = "Pedido WebCorpPro — " + tipo;
    var body =
      "Nombre: " + nombre + "\n" +
      "Email: " + email + "\n" +
      "Teléfono: " + (telefono || "—") + "\n" +
      "Tipo de proyecto: " + tipo + "\n" +
      "Presupuesto aproximado: " + (presupuesto || "—") + "\n\n" +
      "Detalle del proyecto:\n" + mensaje;

    var mailto =
      "mailto:badredinazzahraoui52@gmail.com" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    submitBtn.disabled = true;
    submitBtn.textContent = "Abriendo correo…";

    showStatus(
      "Se ha abierto tu aplicación de correo con el mensaje listo. Pulsa Enviar y te responderemos a " + email + ".",
      "ok"
    );

    window.location.href = mailto;

    setTimeout(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar mensaje";
    }, 1500);
  });
})();
