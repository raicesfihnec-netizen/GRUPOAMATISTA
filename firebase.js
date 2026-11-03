import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCij-oz4oKmi1DPj3YTB1Pw_msfuhDRnGA",
  authDomain: "formulario-907a2.firebaseapp.com",
  projectId: "formulario-907a2",
  storageBucket: "formulario-907a2.firebasestorage.app",
  messagingSenderId: "102668785292",
  appId: "1:102668785292:web:be3651275e83f1b364cda9",
  measurementId: "G-HQBJB5MFB6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("survey-form");
const submitBtn = document.getElementById("submit-btn");
const formMessage = document.getElementById("form-message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  formMessage.textContent = "";
  formMessage.className = "form-message";

  const nombre = document.getElementById("name").value.trim();
  const telefono = document.getElementById("phone").value.trim();
  const edad = Number(document.getElementById("age").value);
  const presupuesto = Number(document.getElementById("budget").value);

  const bebidas = Array.from(
    document.querySelectorAll('input[name="drinks"]:checked')
  ).map((input) => input.value);

  const comidas = Array.from(
    document.querySelectorAll('input[name="foods"]:checked')
  ).map((input) => input.value);

  const horarioViernes = document.getElementById("friday-time").value;

  const modalidadAlimentacion = document.querySelector(
    'input[name="foodPayment"]:checked'
  )?.value;

  // Validaciones de campos y opciones
  if (!nombre || !telefono || !horarioViernes || !modalidadAlimentacion) {
    mostrarMensaje("Completa todos los campos obligatorios.", "error");
    return;
  }

  if (!Number.isFinite(edad) || edad < 12 || edad > 100) {
    mostrarMensaje("Ingresa una edad válida.", "error");
    return;
  }

  if (
    !Number.isFinite(presupuesto) ||
    presupuesto < 0 ||
    presupuesto > 100000
  ) {
    mostrarMensaje("Ingresa un presupuesto válido.", "error");
    return;
  }

  if (bebidas.length === 0) {
    mostrarMensaje("Selecciona al menos una bebida.", "error");
    return;
  }

  if (comidas.length === 0) {
    mostrarMensaje("Selecciona al menos una comida.", "error");
    return;
  }

  // Nombres de campos que esperan tus reglas de Firestore
  const respuesta = {
    nombre: nombre,
    telefono: telefono,
    edad: edad,
    presupuestoLempiras: presupuesto,
    bebidas: bebidas,
    comidas: comidas,
    horarioViernes: horarioViernes,
    modalidadAlimentacion: modalidadAlimentacion,
    creadoEn: serverTimestamp()
  };

  submitBtn.disabled = true;

  try {
    await addDoc(collection(db, "respuestas_fihnec"), respuesta);

    mostrarMensaje(
      "¡Gracias! Tus respuestas se enviaron correctamente.",
      "success"
    );

    form.reset();
  } catch (error) {
    console.error("Error al guardar la encuesta:", error);

    mostrarMensaje(
      "No se pudo enviar la encuesta. Revisa tu conexión e inténtalo nuevamente.",
      "error"
    );
  } finally {
    submitBtn.disabled = false;
  }
});

function mostrarMensaje(mensaje, tipo) {
  formMessage.textContent = mensaje;
  formMessage.className = `form-message ${tipo}`;
}