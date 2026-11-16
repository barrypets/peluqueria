// ÚNICO archivo que se toca por cliente. index.html no se toca nunca.
// Sección sin datos = sección que desaparece sola. Deja [] o borra la clave.
// ponytail: .js y no .json para que index.html abra con doble clic (file:// bloquea fetch)
// WEB DE EJEMPLO (16 nov 2026) para una peluquería canina que aún no ha abierto: marca, logo,
// teléfono y precios son inventados. Fotos de nuestra galería (Materials/demo-gallery).
const CONFIG = {
  url: "https://barrypets.github.io/peluqueria",
  demo: true,
  nombre: "Cepillo",
  claim: "Tu perro, como recién salido de casa",
  subclaim: "Peluquería canina con cita previa. Baño, corte y deslanado adaptados a cada perro, de uno en uno y sin prisas.",
  color: "#2F7D6D",
  logo: "assets/logo.svg",
  logoAlto: 46,

  // Datos de ejemplo: se cambian por los suyos al abrir.
  telefono: "+34 600 000 000",
  whatsapp: "34600000000",
  whatsappMensaje: "Hola, he visto vuestra web y quería pedir cita",
  email: "",
  direccion: "Calle de Ejemplo 12",
  mapa: "",
  instagram: "",

  // Reserva de DEMO (assets/reserva-demo.js): imita barrypets con datos de ejemplo, no guarda nada.
  barrypets: {
    negocio: "demo",
    formato: "servicios",
    local: "",
    tarjeta: false,
    titulo: "Pide cita en un minuto",
    texto: "Elige el servicio y el día, sin crear cuenta. La confirmación te llega al momento."
  },

  hero: "assets/hero.jpg",

  cifras: [
    ["1", "perro cada vez"],
    ["24 h", "para pedir cita online"],
    ["4", "tamaños, precio claro"],
    ["L a S", "abierto"]
  ],

  servicios: [
    { icono: "sparkles",  titulo: "Baño",            texto: "Cepillado previo, champú según su piel, secado y cepillado final." },
    { icono: "scissors",  titulo: "Baño y corte",    texto: "A máquina o a tijera, como te guste, con cuidado en las zonas sensibles." },
    { icono: "paw-print", titulo: "Deslanado",       texto: "Quitamos el pelo muerto de la muda para un manto sano y ligero." },
    { icono: "heart",     titulo: "Higiene",         texto: "Oídos, ojos, almohadillas y zona íntima, entre baño y baño." },
    { icono: "check",     titulo: "Corte de uñas",   texto: "Sin cita larga: en un momento." },
    { icono: "smile",     titulo: "Gatos también",   texto: "Baño y cepillado con calma, a una hora sin perros." }
  ],

  puntos: [
    "Un perro cada vez, sin jaulas de espera",
    "Productos según su piel y su tipo de pelo",
    "Te avisamos cuando está listo para recoger",
    "Recordatorio antes de cada cita"
  ],

  galeria: ["assets/1.jpg", "assets/2.jpg", "assets/3.jpg", "assets/4.jpg", "assets/5.jpg", "assets/6.jpg"],

  faq: [
    { p: "¿Cuánto cuesta?",                 r: "Depende del tamaño y del tipo de pelo. Al pedir cita ves el precio de tu perro antes de confirmar." },
    { p: "¿Cuánto tarda?",                  r: "Entre 45 minutos y 2 horas según el servicio. Te avisamos cuando está listo." },
    { p: "¿Y si mi perro está nervioso?",   r: "Trabajamos de uno en uno y sin prisas. Cuéntanoslo al pedir cita y lo tenemos en cuenta." },
    { p: "¿Puedo cambiar o anular la cita?", r: "Sí, desde el enlace que te llega al reservar." }
  ],

  horario: [
    ["Lunes a viernes", "10:00 – 20:00"],
    ["Sábado", "10:00 – 14:00"],
    ["Domingo", "Cerrado"]
  ],

  formulario: {
    intro: "Hola, quería pedir cita:",
    boton: "Enviar por WhatsApp",
    campos: [
      { id: "nombre", etiqueta: "Tu nombre", tipo: "texto", pista: "Tu nombre", requerido: true },
      { id: "perro",  etiqueta: "Tu perro (nombre y raza)", tipo: "texto", pista: "Coco, bichón maltés", requerido: true },
      { id: "asunto", etiqueta: "Qué necesitas", tipo: "lista", requerido: true,
        opciones: ["Baño", "Baño y corte", "Deslanado", "Higiene", "Corte de uñas", "Gato"] },
      { id: "cuando", etiqueta: "Cuándo te viene bien", tipo: "area", max: 300, pista: "Mañanas entre semana, este sábado..." }
    ]
  },

  cta: "Pide tu primera cita",
  ctaTexto: "Escríbenos por WhatsApp o reserva online en un minuto.",

  legal: { razonSocial: "", nif: "", domicilio: "", registro: "" }
};
