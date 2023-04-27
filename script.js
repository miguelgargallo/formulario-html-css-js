const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const dateInput = document.getElementById("date");
const subjectInput = document.getElementById("subject");
const communicationMethodInput = document.getElementById(
  "communication-method"
);
const humanValidationInput = document.getElementById("human-validation");
const humanValidationCode = Math.random()
  .toString(36)
  .substring(2, 10)
  .toUpperCase(); //genera un código random alfanumérico de 8 caracteres

//función que valida el formato de la fecha
function isValidDate(dateString) {
  const regEx = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (!dateString.match(regEx)) return false;
  const d = new Date(dateString);
  if (!d.getTime()) return false;
  return d.toISOString().slice(0, 10) === dateString;
}

//función que muestra un mensaje de error en el campo
function showError(input, message) {
  const parent = input.parentNode;
  const error = parent.querySelector(".error-message");
  if (error) {
    error.textContent = message;
  } else {
    const errorElement = document.createElement("p");
    errorElement.className = "error-message";
    errorElement.textContent = message;
    parent.appendChild(errorElement);
  }
}

//función que elimina el mensaje de error del campo
function clearError(input) {
  const parent = input.parentNode;
  const error = parent.querySelector(".error-message");
  if (error) {
    parent.removeChild(error);
  }
}

//función que valida el formulario
function validateForm(event) {
  event.preventDefault();

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const phoneValue = phoneInput.value.trim();
  const dateValue = dateInput.value.trim();
  const subjectValue = subjectInput.value.trim();
  const communicationMethodValue = communicationMethodInput.value.trim();
  const humanValidationValue = humanValidationInput.value.trim();

  //validar nombre
  if (nameValue === "") {
    showError(nameInput, "Por favor, introduce tu nombre.");
  } else if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(nameValue)) {
    showError(nameInput, "El nombre solo puede contener letras.");
  } else if (nameValue.length < 2) {
    showError(nameInput, "El nombre debe tener al menos 2 caracteres.");
  } else {
    clearError(nameInput);
  }

  //validar email
  if (emailValue === "") {
    showError(emailInput, "Por favor, introduce tu correo electrónico.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    showError(emailInput, "Por favor, introduce un correo electrónico válido.");
  } else {
    clearError(emailInput);
  }

  //validar teléfono
  if (phoneValue === "") {
    showError(phoneInput, "Por favor, introduce tu número de móvil.");
  } else if (!/^[0-9]{9}$/.test(phoneValue)) {
    showError(phoneInput, "El número de móvil debe tener 9 dígitos numéricos.");
  } else {
    clearError(phoneInput);
  }

  //validar fecha
  if (dateValue === "") {
    showError(dateInput, "Por favor, introduce una fecha.");
  } else if (!isValidDate(dateValue)) {
    showError(
      dateInput,
      "Por favor, introduce una fecha válida en formato dd/mm/aaaa."
    );
  } else {
    clearError(dateInput);
  }

  //validar asunto
  if (subjectValue === "") {
    showError(subjectInput, "Por favor, introduce un asunto.");
  } else {
    clearError(subjectInput);
  }

  //validar comunicación
  if (communicationMethodValue === "") {
    showError(
      communicationMethodInput,
      "Por favor, selecciona un medio de comunicación."
    );
  } else {
    clearError(communicationMethodInput);
  }

  //validar validación humana
  if (humanValidationValue === "") {
    showError(
      humanValidationInput,
      "Por favor, introduce el código de validación."
    );
  } else if (humanValidationValue.toUpperCase() !== humanValidationCode) {
    showError(humanValidationInput, "El código de validación no es correcto.");
  } else {
    clearError(humanValidationInput);
  }

  //validar GDPR
  const gdprCheckbox = document.getElementById("gdpr");
  if (!gdprCheckbox.checked) {
    showError(
      gdprCheckbox,
      "Debes aceptar la política de privacidad para poder enviar el formulario."
    );
  } else {
    clearError(gdprCheckbox);
  }

  //enviar formulario si no hay errores
  if (contactForm.checkValidity()) {
    alert("El formulario se ha enviado correctamente.");
    contactForm.reset();
    const humanValidationCodeElement = document.getElementById(
      "human-validation-code"
    );
    humanValidationCodeElement.textContent =
      "Código de validación: " + humanValidationCode;
  }
}

//generar código de validación al cargar la página
window.onload = function () {
  const humanValidationCodeElement = document.getElementById(
    "human-validation-code"
  );
  humanValidationCodeElement.textContent =
    "Código de validación: " + humanValidationCode;
};

//validar formulario al enviarlo
contactForm.addEventListener("submit", validateForm);
