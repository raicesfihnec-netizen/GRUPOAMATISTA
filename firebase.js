// Firebase Web SDK. La configuración web puede estar visible en el navegador.
// La protección de los datos se realiza mediante las reglas de Firestore.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
const message = document.getElementById("form-message");

function selectedValues(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(el => el.value);
}

function showMessage(text, type) {
  message.textContent = text;
  message.className = `form-message ${type}`;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  showMessage("", "");
  const drinks = selectedValues("drinks");
  const foods = selectedValues("foods");
  const foodPayment = document.querySelector('input[name="foodPayment"]:checked')?.value || "";
  const budget = Number(document.getElementById("budget").value);
  const fridayTime = document.getElementById("friday-time").value;

  if (!drinks.length) {
    showMessage("Selecciona al menos una opción de bebida.", "error");
    return;
  }
  if (!foods.length) {
    showMessage("Selecciona al menos una opción de comida.", "error");
    return;
  }
  if (!foodPayment) {
    showMessage("Selecciona una modalidad de alimentación.", "error");
    return;
  }
  if (!Number.isFinite(budget) || budget < 0) {
    showMessage("Escribe un presupuesto válido.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.classList.add("loading");

  try {
    await addDoc(collection(db, "respuestas_fihnec"), {
      presupuestoLempiras: budget,
      bebidas: drinks,
      comidas: foods,
      horarioViernes: fridayTime,
      modalidadAlimentacion: foodPayment,
      creadoEn: serverTimestamp()
    });
    form.reset();
    showMessage("¡Respuestas enviadas correctamente! Muchas gracias por participar.", "success");
  } catch (error) {
    console.error("Error al guardar la respuesta:", error);
    showMessage("No se pudo enviar la respuesta. Verifica tu conexión y la configuración de Firebase.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.classList.remove("loading");
  }
});
