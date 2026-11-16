// Reserva de DEMO para la web de ejemplo de peluquería (16 nov 2026), copiada de la de Happy Pet. Imita la reserva de barrypets paso a paso
// (tú, tu perro, día y hora, resumen) con datos de ejemplo. No guarda nada ni llama a ningún
// servidor: al vender, se borra este archivo y se usa la caja real de barrypets (config.js).
(function () {
  var host = document.querySelector(".barrypets-reservar");
  if (!host) return;
  var C = (window.CONFIG || {}), COLOR = host.getAttribute("data-color") || "#E5534F";
  var NEGOCIO = { nombre: C.nombre || "Cepillo", dir: "Calle de Ejemplo 12", logo: "assets/marca.svg" };
  var SIZES = ["pequeño", "mediano", "grande", "gigante"];
  // unit: slot (cita con hora), day (día completo), hour (por horas), night (noches). Solo pequeños: small.
  var SERVICIOS = [
    { id: "bano", nombre: "Baño", foto: "assets/1.jpg", precio: 18, porTam: [18, 24, 30, 38], unit: "slot", dur: 60, desc: "Cepillado previo, champú según su piel, limpieza de oídos, secado y cepillado final." },
    { id: "corte", nombre: "Baño y corte", foto: "assets/2.jpg", precio: 30, porTam: [30, 38, 48, 60], unit: "slot", dur: 105, desc: "El baño completo más corte a máquina o a tijera, como te guste, con cuidado en las zonas sensibles." },
    { id: "deslanado", nombre: "Deslanado", foto: "assets/3.jpg", precio: 35, porTam: [35, 45, 55, 70], unit: "slot", dur: 90, desc: "Quitamos el pelo muerto de la muda para un manto sano y ligero." },
    { id: "higiene", nombre: "Higiene", foto: "assets/4.jpg", precio: 12, unit: "slot", dur: 30, desc: "Oídos, ojos, almohadillas y zona íntima, entre baño y baño." },
    { id: "unas", nombre: "Corte de uñas", foto: "assets/5.jpg", precio: 8, unit: "slot", dur: 15, desc: "Sin cita larga: en un momento." }
  ];
  // Horario real: L-V 8-20, S 9-16, D cerrado.
  var HORARIO = { 1: [10, 20], 2: [10, 20], 3: [10, 20], 4: [10, 20], 5: [10, 20], 6: [10, 14] };
  var DIAS = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"], MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

  var css = document.createElement("style");
  css.textContent = [
    ".rd{font-family:inherit;color:#1c1917}",
    ".rd-li{display:flex;gap:14px;padding:16px 0;border-bottom:1px solid rgba(0,0,0,.1);cursor:pointer;text-align:left}",
    ".rd-li img{flex:0 0 64px;width:64px;height:64px;border-radius:14px;object-fit:cover;background:#eee}",
    ".rd-li b{display:block;font-size:17px;line-height:1.3}",
    ".rd-li p{font-size:14px;line-height:1.45;opacity:.75;margin:4px 0 0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}",
    ".rd-foot{display:flex;align-items:center;justify-content:space-between;margin-top:10px;font-size:14px;font-weight:600}",
    ".rd-btn{border:0;border-radius:999px;background:var(--rd);color:#fff;font:700 15px/1 inherit;padding:11px 18px;cursor:pointer;transition:transform .12s ease,filter .2s}",
    ".rd-btn:active{transform:scale(.97)}.rd-btn:disabled{opacity:.45;cursor:default}",
    ".rd-bg{position:fixed;inset:0;z-index:2147483000;background:rgba(28,25,23,.55);display:flex;align-items:center;justify-content:center;animation:rdf .2s ease-out}",
    ".rd-box{position:relative;background:#fafaf9;width:480px;max-width:calc(100% - 32px);height:min(760px,calc(100% - 48px));border-radius:16px;overflow:auto;box-shadow:0 20px 60px rgba(0,0,0,.3);animation:rdu .24s cubic-bezier(.23,1,.32,1)}",
    "@media(max-width:599px){.rd-box{width:100%;max-width:100%;height:100%;border-radius:0}}",
    "@keyframes rdf{from{opacity:0}}@keyframes rdu{from{opacity:0;transform:scale(.96)}}",
    "@media(prefers-reduced-motion:reduce){.rd-bg,.rd-box{animation:none}}",
    ".rd-x{position:absolute;top:10px;right:10px;width:40px;height:40px;border-radius:50%;border:0;background:#fff;font:600 22px/40px system-ui;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.2);z-index:2}",
    ".rd-head{display:flex;gap:12px;align-items:center;padding:22px 60px 14px 20px}",
    ".rd-head img{width:52px;height:52px;border-radius:50%;object-fit:cover}",
    ".rd-head small{display:block;font-size:13px;opacity:.7}.rd-head b{display:block;font-size:20px;line-height:1.2}",
    ".rd-card{background:#fff;margin:0 16px 16px;border-radius:16px;border:1px solid rgba(0,0,0,.08);padding:18px 20px}",
    ".rd-prog{display:flex;align-items:center;gap:12px;margin-bottom:18px;font-size:13px;opacity:.85}",
    ".rd-prog i{flex:1;height:5px;border-radius:9px;background:#eee;overflow:hidden}.rd-prog i span{display:block;height:100%;background:var(--rd);transition:width .3s}",
    ".rd-back{border:0;background:none;font-size:22px;cursor:pointer;padding:0 4px}",
    ".rd h3{font-size:19px;margin:0 0 4px}.rd .rd-sub{font-size:14px;opacity:.7;margin:0 0 16px}",
    ".rd label{display:block;font-weight:600;font-size:14px;margin:14px 0 6px}",
    ".rd input{width:100%;box-sizing:border-box;border:1px solid #d6d3d1;border-radius:12px;padding:13px 14px;font:16px inherit;background:#fff}",
    ".rd input:focus{outline:2px solid var(--rd);border-color:transparent}",
    ".rd-chips{display:flex;gap:8px;flex-wrap:wrap}",
    ".rd-chip{border:1px solid #d6d3d1;background:#fff;border-radius:12px;padding:10px 12px;font:600 14px inherit;cursor:pointer;min-width:64px}",
    ".rd-chip[aria-pressed=true]{background:var(--rd);border-color:var(--rd);color:#fff}",
    ".rd-row{display:flex;justify-content:space-between;gap:12px;padding:10px 0;border-bottom:1px solid #f0efee;font-size:15px}.rd-row span{opacity:.7}",
    ".rd-total{display:flex;justify-content:space-between;font-weight:800;font-size:17px;padding:14px 0 4px}",
    ".rd-go{width:100%;margin-top:18px;padding:16px;font-size:16px;border-radius:12px}",
    ".rd-note{font-size:12.5px;opacity:.65;margin-top:12px;line-height:1.45}",
    ".rd-ok{text-align:center;padding:10px 0}.rd-ok .rd-tick{width:64px;height:64px;border-radius:50%;background:var(--rd);color:#fff;font-size:34px;line-height:64px;margin:6px auto 14px;animation:rdu .3s ease-out}",
    ".rd-demo{font-size:12px;text-align:center;opacity:.6;padding:0 20px 20px}"
  ].join("");
  document.head.appendChild(css);

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function eur(n) { return n === 0 ? "Gratis" : n.toFixed(2).replace(".", ",").replace(",00", "") + " €"; }
  function desde(s) { return s.precio === 0 ? "Gratis" : (s.porTam ? "desde " : "") + eur(s.precio) + (s.unit === "hour" ? " / hora" : s.unit === "night" ? " / noche" : ""); }
  function hhmm(m) { return String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0"); }
  function diaTxt(d) { return DIAS[d.getDay()] + ", " + d.getDate() + " " + MESES[d.getMonth()]; }
  function abiertos(n) { var out = [], d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + 1); while (out.length < n) { if (HORARIO[d.getDay()]) out.push(new Date(d)); d.setDate(d.getDate() + 1); } return out; }
  function tamano(kg) { return kg < 10 ? 0 : kg < 25 ? 1 : kg < 45 ? 2 : 3; }

  // La lista, como la caja de barrypets.
  host.className += " rd";
  host.style.setProperty("--rd", COLOR);
  SERVICIOS.forEach(function (s) {
    var li = el("div", "rd-li");
    li.innerHTML = '<img src="' + s.foto + '" alt=""><div style="flex:1;min-width:0"><b>' + esc(s.nombre) + "</b><p>" + esc(s.desc) + '</p><div class="rd-foot"><span>' + desde(s) + '</span><button type="button" class="rd-btn">Reservar</button></div></div>';
    li.onclick = function () { abrir(s); };
    host.appendChild(li);
  });

  function abrir(s) {
    var st = { paso: 1, email: "", tel: "", nombre: "", perro: "", kg: "", dia: null, hora: null, horas: 4, noches: 2 };
    var bg = el("div", "rd-bg rd"), box = el("div", "rd-box"), x = el("button", "rd-x", "×");
    bg.style.setProperty("--rd", COLOR);
    x.type = "button"; x.setAttribute("aria-label", "Cerrar");
    box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true"); box.setAttribute("aria-label", "Reservar " + s.nombre);
    var cuerpo = el("div");
    box.appendChild(x); box.appendChild(cuerpo); bg.appendChild(box);
    var antes = document.documentElement.style.overflow;
    function cerrar() { bg.remove(); document.documentElement.style.overflow = antes; document.removeEventListener("keydown", tecla); }
    function tecla(e) { if (e.key === "Escape") cerrar(); }
    x.onclick = cerrar; bg.onclick = function (e) { if (e.target === bg) cerrar(); };
    document.addEventListener("keydown", tecla);
    document.documentElement.style.overflow = "hidden";
    document.body.appendChild(bg);

    function precio() {
      var base = s.porTam && st.kg ? s.porTam[tamano(+st.kg)] : s.precio;
      return s.unit === "hour" ? base * st.horas : s.unit === "night" ? base * st.noches : base;
    }
    function pinta() {
      var titulos = ["Tú", "¿Para quién?", "Día y hora", "Resumen"];
      cuerpo.innerHTML = "";
      var head = el("div", "rd-head", '<img src="' + NEGOCIO.logo + '" alt=""><div><small>' + esc(s.nombre) + "</small><b>" + esc(NEGOCIO.nombre) + "</b><small>" + NEGOCIO.dir + "</small></div>");
      cuerpo.appendChild(head);
      var card = el("div", "rd-card");
      cuerpo.appendChild(card);
      if (st.paso === 5) return hecho(card);
      var prog = el("div", "rd-prog", '<button type="button" class="rd-back" aria-label="Atrás">‹</button><i><span style="width:' + st.paso * 25 + '%"></span></i>Paso ' + st.paso + " de 4 · " + titulos[st.paso - 1]);
      prog.firstChild.onclick = function () { if (st.paso > 1) { st.paso--; pinta(); } else cerrar(); };
      card.appendChild(prog);
      var go = el("button", "rd-btn rd-go");
      go.type = "button";
      var listo = function () { return true; };
      if (st.paso === 1) {
        card.appendChild(el("h3", "", "¿Quién reserva?"));
        card.appendChild(el("p", "rd-sub", "Con tu correo y tu teléfono vemos si " + esc(NEGOCIO.nombre) + " ya te conoce, para no preguntarte nada dos veces."));
        campo(card, "Tu correo", "email", "email", "tu@correo.com");
        campo(card, "Tu teléfono", "tel", "tel", "600 00 00 00");
        go.textContent = "Continuar";
        listo = function () { return /\S+@\S+\.\S+/.test(st.email) && st.tel.replace(/\D/g, "").length >= 9; };
      } else if (st.paso === 2) {
        card.appendChild(el("h3", "", "¿Para quién es?"));
        card.appendChild(el("p", "rd-sub", "Dinos cómo te llamas y quién viene a " + esc(NEGOCIO.nombre) + "."));
        campo(card, "Tu nombre y apellidos", "nombre", "text", "");
        campo(card, "Nombre de tu perro", "perro", "text", "");
        campo(card, "¿Cuánto pesa? (kg)", "kg", "number", "6");
        if (s.small) card.appendChild(el("p", "rd-note", "Este servicio es para perros pequeños (hasta 10 kg)."));
        go.textContent = "Siguiente: día y hora";
        listo = function () { return st.nombre.trim() && st.perro.trim() && +st.kg > 0 && (!s.small || +st.kg < 10); };
      } else if (st.paso === 3) {
        card.appendChild(el("h3", "", s.unit === "night" ? "¿Qué día llega?" : "Elige día y hora"));
        var dias = el("div", "rd-chips");
        abiertos(7).forEach(function (d) {
          var c = chip(diaTxt(d), st.dia && st.dia.getTime() === d.getTime(), function () { st.dia = d; st.hora = null; pinta(); });
          dias.appendChild(c);
        });
        card.appendChild(dias);
        if (st.dia && s.unit !== "night" && s.unit !== "day") {
          var h = HORARIO[st.dia.getDay()], dur = s.unit === "hour" ? st.horas * 60 : s.dur;
          card.appendChild(el("label", "", s.unit === "hour" ? "¿A qué hora entra?" : "Huecos libres"));
          var horas = el("div", "rd-chips");
          for (var m = h[0] * 60; m + dur <= h[1] * 60; m += s.unit === "hour" ? 60 : 90) (function (m) {
            horas.appendChild(chip(hhmm(m), st.hora === m, function () { st.hora = m; pinta(); }));
          })(m);
          card.appendChild(horas);
        }
        if (s.unit === "hour") contador(card, "¿Cuántas horas?", "horas", 1, 8);
        if (s.unit === "night") contador(card, "¿Cuántas noches?", "noches", 1, 14);
        if (s.unit === "day" && st.dia) card.appendChild(el("p", "rd-note", "Entrada de 8:00 a 10:30, recogida hasta las " + (st.dia.getDay() === 6 ? "16:00" : "20:00") + "."));
        go.textContent = "Siguiente: resumen";
        listo = function () { return st.dia && (s.unit === "night" || s.unit === "day" || st.hora != null); };
      } else {
        card.appendChild(el("h3", "", "Repasa tu reserva"));
        var cuando = diaTxt(st.dia) + (s.unit === "slot" || s.unit === "hour" ? " a las " + hhmm(st.hora) : "");
        if (s.unit === "hour") cuando += " (" + st.horas + " h)";
        if (s.unit === "night") cuando += ", " + st.noches + (st.noches === 1 ? " noche" : " noches");
        [["Quién", esc(st.perro) + " · " + esc(st.nombre)], ["Servicio", esc(s.nombre)], ["Cuándo", cuando]].forEach(function (r) {
          card.appendChild(el("div", "rd-row", "<span>" + r[0] + "</span><b>" + r[1] + "</b>"));
        });
        card.appendChild(el("div", "rd-total", "<span>Total</span><span>" + eur(precio()) + "</span>"));
        card.appendChild(el("p", "rd-note", "Lo que pagues lo cobra " + esc(NEGOCIO.nombre) + " directamente, en el centro. Te llegará la confirmación y un recordatorio el día antes."));
        go.textContent = "Confirmar la reserva";
      }
      go.disabled = !listo();
      go.onclick = function () { st.paso++; pinta(); box.scrollTop = 0; };
      card.appendChild(go);
      card._go = go; card._listo = listo;
    }
    function hecho(card) {
      var cuando = diaTxt(st.dia) + (st.hora != null ? ", " + hhmm(st.hora) : "");
      card.innerHTML = '<div class="rd-ok"><div class="rd-tick">✓</div><h3>¡Reserva confirmada!</h3><p class="rd-sub" style="margin-top:8px">' + esc(s.nombre) + " para " + esc(st.perro) + " · " + cuando +
        ". Te lo hemos enviado a " + esc(st.email) + ".</p><p class=\"rd-note\">Recibirás un recordatorio el día antes y sumarás un sello en tu tarjeta de cliente de " + esc(NEGOCIO.nombre) + ".</p></div>";
      var ok = el("button", "rd-btn rd-go", "Listo");
      ok.type = "button"; ok.onclick = cerrar;
      card.appendChild(ok);
      cuerpo.appendChild(el("p", "rd-demo", "Esto es una demostración: la reserva no se guarda ni se envía."));
      ok.focus();
    }
    function campo(card, etiqueta, k, type, pista) {
      var id = "rd-" + k;
      card.appendChild(el("label", "", etiqueta)).setAttribute("for", id);
      var i = el("input");
      i.id = id; i.type = type; i.value = st[k]; i.placeholder = pista;
      if (type === "number") { i.min = "0.5"; i.step = "0.5"; i.inputMode = "decimal"; }
      if (type === "email") i.autocomplete = "email";
      if (type === "tel") i.autocomplete = "tel";
      i.oninput = function () { st[k] = i.value; card._go.disabled = !card._listo(); };
      card.appendChild(i);
    }
    function chip(txt, on, fn) { var c = el("button", "rd-chip", txt); c.type = "button"; c.setAttribute("aria-pressed", on ? "true" : "false"); c.onclick = fn; return c; }
    function contador(card, etiqueta, k, min, max) {
      card.appendChild(el("label", "", etiqueta));
      var row = el("div", "rd-chips");
      for (var n = min; n <= Math.min(max, min + 7); n++) (function (n) { row.appendChild(chip(String(n), st[k] === n, function () { st[k] = n; st.hora = null; pinta(); })); })(n);
      card.appendChild(row);
    }
    pinta();
    x.focus();
  }
})();
