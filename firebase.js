
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("survey-form");
const submitBtn = document.getElementById("submit-btn");
const message = document.getElementById("form-message");

function selectedValues(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)]
    .map(el => el.value);
}

function showMessage(text, type) {
  message.textContent = text;
  message.className = `form-message ${type}`;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  showMessage("", "");

  // Obtener los datos personales del formulario
  const nombre = document.getElementById("name").value.trim();
  const telefono = document.getElementById("phone").value.trim();
  const edad = Number(document.getElementById("age").value);

  const drinks = selectedValues("drinks");
  const foods = selectedValues("foods");
  const foodPayment =
    document.querySelector('input[name="foodPayment"]:checked')?.value || "";

  const budget = Number(document.getElementById("budget").value);
  const fridayTime = document.getElementById("friday-time").value;

  if (!nombre) {
    showMessage("Escribe tu nombre.", "error");
    return;
  }

  if (!telefono) {
    showMessage("Escribe tu teléfono.", "error");
    return;
  }

  if (!Number.isFinite(edad) || edad <= 0) {
    showMessage("Escribe una edad válida.", "error");
    return;
  }

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
      nombre: nombre,
      telefono: telefono,
      edad: edad,

      presupuestoLempiras: budget,
      bebidas: drinks,
      comidas: foods,
      horarioViernes: fridayTime,
      modalidadAlimentacion: foodPayment,
      creadoEn: serverTimestamp()
    });

    form.reset();

    showMessage(
      "¡Respuestas enviadas correctamente! Muchas gracias por participar.",
      "success"
    );
  } catch (error) {
    console.error("Error al guardar la respuesta:", error);
    showMessage(
      "No se pudo enviar la respuesta. Verifica tu conexión y la configuración de Firebase.",
      "error"
    );
  } finally {
    submitBtn.disabled = false;
    submitBtn.classList.remove("loading");
  }
});
