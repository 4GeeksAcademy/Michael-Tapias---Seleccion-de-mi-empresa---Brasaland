const form = document.getElementById("brasaPointsForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const country = document.getElementById("country");
const city = document.getElementById("city");
const favoriteLocation = document.getElementById("favoriteLocation");
const referral = document.getElementById("referral");
const birthDate = document.getElementById("birthDate");
const terms = document.getElementById("terms");
const successMessage = document.getElementById("successMessage");

/* ----------------------------------
   DATOS DE CIUDADES
---------------------------------- */

const citiesByCountry = {
  colombia: [
    {
      value: "medellin",
      label: "Medellín",
    },
    {
      value: "bogota",
      label: "Bogotá",
    },
    {
      value: "cali",
      label: "Cali",
    },
  ],

  "estados-unidos": [
    {
      value: "miami",
      label: "Miami",
    },
    {
      value: "orlando",
      label: "Orlando",
    },
  ],
};

/* ----------------------------------
   UBICACIONES FAVORITAS
---------------------------------- */

const locationsByCountryAndCity = {
  colombia: {
    medellin: [
      "Brasaland El Poblado",
      "Brasaland Laureles",
      "Brasaland Envigado",
      "Brasaland Sabaneta",
    ],

    bogota: [
      "Brasaland Usaquén",
      "Brasaland Chapinero",
      "Brasaland Zona Rosa",
    ],

    cali: [
      "Brasaland Granada",
      "Brasaland Ciudad Jardín",
      "Brasaland Unicentro",
    ],
  },

  "estados-unidos": {
    miami: [
      "Brasaland Brickell",
      "Brasaland Coral Gables",
    ],

    orlando: [
      "Brasaland Downtown",
      "Brasaland International Drive",
    ],
  },
};

/* ----------------------------------
   MOSTRAR ERROR
---------------------------------- */

function showError(input, errorId, message) {
  const errorElement = document.getElementById(errorId);

  errorElement.textContent = message;
  errorElement.classList.remove("hidden");

  input.setAttribute("aria-invalid", "true");

  input.classList.remove(
    "border-stone-300",
    "focus:border-orange-600"
  );

  input.classList.add(
    "border-red-500",
    "focus:border-red-500",
    "focus:ring-red-200"
  );
}

/* ----------------------------------
   LIMPIAR ERROR
---------------------------------- */

function clearError(input, errorId) {
  const errorElement = document.getElementById(errorId);

  errorElement.textContent = "";
  errorElement.classList.add("hidden");

  input.removeAttribute("aria-invalid");

  input.classList.remove(
    "border-red-500",
    "focus:border-red-500",
    "focus:ring-red-200"
  );

  input.classList.add(
    "border-stone-300",
    "focus:border-orange-600"
  );
}

/* ----------------------------------
   VALIDAR NOMBRE
---------------------------------- */

function validateFullName() {
  const value = fullName.value.trim();

  const words = value
    .split(/\s+/)
    .filter((word) => word.length > 0);

  if (words.length < 2) {
    showError(
      fullName,
      "fullNameError",
      "Introduzca su nombre completo (nombre y apellido)"
    );

    return false;
  }

  clearError(fullName, "fullNameError");

  return true;
}

/* ----------------------------------
   VALIDAR CORREO
---------------------------------- */

function validateEmail() {
  const value = email.value.trim();

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(value)) {
    showError(
      email,
      "emailError",
      "Introduzca un correo electrónico válido (ejemplo: nombre@correo.com)"
    );

    return false;
  }

  clearError(email, "emailError");

  return true;
}

/* ----------------------------------
   VALIDAR TELÉFONO
---------------------------------- */

function validatePhone() {
  const value = phone.value.trim();

  const phonePattern =
    /^\+(57|1)\s\d[\d\s-]{6,18}$/;

  if (!phonePattern.test(value)) {
    showError(
      phone,
      "phoneError",
      "El número de teléfono debe incluir el código de país (ejemplo: +57 300 123 4567 o +1 305 123 4567)"
    );

    return false;
  }

  clearError(phone, "phoneError");

  return true;
}

/* ----------------------------------
   VALIDAR PAÍS
---------------------------------- */

function validateCountry() {
  if (country.value === "") {
    showError(
      country,
      "countryError",
      "Seleccione su país"
    );

    return false;
  }

  clearError(country, "countryError");

  return true;
}

/* ----------------------------------
   VALIDAR CIUDAD
---------------------------------- */

function validateCity() {
  if (city.value === "") {
    showError(
      city,
      "cityError",
      "Selecciona tu ciudad"
    );

    return false;
  }

  clearError(city, "cityError");

  return true;
}

/* ----------------------------------
   VALIDAR CÓMO NOS ENCONTRASTE
---------------------------------- */

function validateReferral() {
  if (referral.value === "") {
    showError(
      referral,
      "referralError",
      "Cuéntanos cómo conociste Brasaland"
    );

    return false;
  }

  clearError(referral, "referralError");

  return true;
}

/* ----------------------------------
   CALCULAR EDAD
---------------------------------- */

function calculateAge(dateString) {
  const today = new Date();
  const birthDateValue = new Date(
    `${dateString}T00:00:00`
  );

  let age =
    today.getFullYear() -
    birthDateValue.getFullYear();

  const monthDifference =
    today.getMonth() -
    birthDateValue.getMonth();

  if (
    monthDifference < 0 ||
    (
      monthDifference === 0 &&
      today.getDate() < birthDateValue.getDate()
    )
  ) {
    age--;
  }

  return age;
}

/* ----------------------------------
   VALIDAR FECHA DE NACIMIENTO
---------------------------------- */

function validateBirthDate() {
  const value = birthDate.value;

  if (value === "") {
    showError(
      birthDate,
      "birthDateError",
      "Debes tener 18 años o más para registrarte en Brasa Points"
    );

    return false;
  }

  const age = calculateAge(value);

  if (age < 18) {
    showError(
      birthDate,
      "birthDateError",
      "Debes tener 18 años o más para registrarte en Brasa Points"
    );

    return false;
  }

  clearError(
    birthDate,
    "birthDateError"
  );

  return true;
}

/* ----------------------------------
   VALIDAR TÉRMINOS
---------------------------------- */

function validateTerms() {
  if (!terms.checked) {
    showError(
      terms,
      "termsError",
      "Debe aceptar las condiciones del programa Brasa Points para continuar"
    );

    return false;
  }

  clearError(
    terms,
    "termsError"
  );

  return true;
}

/* ----------------------------------
   ACTUALIZAR CIUDADES
---------------------------------- */

function updateCities() {
  const selectedCountry = country.value;

  city.innerHTML = "";
  favoriteLocation.innerHTML = "";

  favoriteLocation.disabled = true;

  /* Si no hay país */
  if (selectedCountry === "") {
    city.disabled = true;

    const option = document.createElement("option");

    option.value = "";
    option.textContent =
      "Seleccione primero un país";

    city.appendChild(option);

    const locationOption =
      document.createElement("option");

    locationOption.value = "";
    locationOption.textContent =
      "Selecciona primero país y ciudad";

    favoriteLocation.appendChild(
      locationOption
    );

    clearError(
      city,
      "cityError"
    );

    return;
  }

  /* Activar ciudades */
  city.disabled = false;

  const defaultOption =
    document.createElement("option");

  defaultOption.value = "";
  defaultOption.textContent =
    "Selecciona tu ciudad";

  city.appendChild(defaultOption);

  citiesByCountry[selectedCountry].forEach(
    (cityData) => {
      const option =
        document.createElement("option");

      option.value = cityData.value;
      option.textContent = cityData.label;

      city.appendChild(option);
    }
  );

  /*
    IMPORTANTE:
    No validamos ciudad aquí porque
    el usuario todavía no ha elegido una.
  */

  clearError(
    city,
    "cityError"
  );
}

/* ----------------------------------
   ACTUALIZAR UBICACIONES FAVORITAS
---------------------------------- */

function updateFavoriteLocations() {
  const selectedCountry = country.value;
  const selectedCity = city.value;

  favoriteLocation.innerHTML = "";

  if (
    selectedCountry === "" ||
    selectedCity === ""
  ) {
    favoriteLocation.disabled = true;

    const option =
      document.createElement("option");

    option.value = "";
    option.textContent =
      "Selecciona primero país y ciudad";

    favoriteLocation.appendChild(option);

    return;
  }

  favoriteLocation.disabled = false;

  const defaultOption =
    document.createElement("option");

  defaultOption.value = "";
  defaultOption.textContent =
    "Selecciona tu ubicación favorita";

  favoriteLocation.appendChild(
    defaultOption
  );

  const locations =
    locationsByCountryAndCity[
      selectedCountry
    ][selectedCity];

  locations.forEach((location) => {
    const option =
      document.createElement("option");

    option.value = location;
    option.textContent = location;

    favoriteLocation.appendChild(option);
  });
}

/* ----------------------------------
   FECHA MÁXIMA
   18 AÑOS
---------------------------------- */

function setMaximumBirthDate() {
  const today = new Date();

  const maximumDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  const year =
    maximumDate.getFullYear();

  const month =
    String(
      maximumDate.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      maximumDate.getDate()
    ).padStart(2, "0");

  birthDate.max =
    `${year}-${month}-${day}`;
}

/* ----------------------------------
   VALIDAR TODO EL FORMULARIO
---------------------------------- */

function validateAllFields() {
  const results = [
    validateFullName(),
    validateEmail(),
    validatePhone(),
    validateCountry(),
    validateCity(),
    validateReferral(),
    validateBirthDate(),
    validateTerms(),
  ];

  return results.every(
    (result) => result === true
  );
}

/* ----------------------------------
   EVENTOS PAÍS
---------------------------------- */

country.addEventListener(
  "change",
  () => {
    clearError(
      country,
      "countryError"
    );

    updateCities();
    updateFavoriteLocations();
  }
);

/* ----------------------------------
   EVENTOS CIUDAD
---------------------------------- */

city.addEventListener(
  "change",
  () => {
    if (city.value !== "") {
      clearError(
        city,
        "cityError"
      );
    }

    updateFavoriteLocations();
  }
);

/* ----------------------------------
   VALIDACIÓN EN TIEMPO REAL
---------------------------------- */

fullName.addEventListener(
  "input",
  validateFullName
);

fullName.addEventListener(
  "blur",
  validateFullName
);

email.addEventListener(
  "input",
  validateEmail
);

email.addEventListener(
  "blur",
  validateEmail
);

phone.addEventListener(
  "input",
  validatePhone
);

phone.addEventListener(
  "blur",
  validatePhone
);

country.addEventListener(
  "blur",
  validateCountry
);

city.addEventListener(
  "blur",
  validateCity
);

referral.addEventListener(
  "change",
  validateReferral
);

referral.addEventListener(
  "blur",
  validateReferral
);

birthDate.addEventListener(
  "change",
  validateBirthDate
);

birthDate.addEventListener(
  "blur",
  validateBirthDate
);

terms.addEventListener(
  "change",
  validateTerms
);

/* ----------------------------------
   ENVÍO DEL FORMULARIO
---------------------------------- */

form.addEventListener(
  "submit",
  (event) => {
    event.preventDefault();

    successMessage.classList.add(
      "hidden"
    );

    const isValid =
      validateAllFields();

    if (!isValid) {
      const firstInvalidField =
        form.querySelector(
          '[aria-invalid="true"]'
        );

      if (firstInvalidField) {
        firstInvalidField.focus();
      }

      return;
    }

    /* Simular envío correcto */

    successMessage.classList.remove(
      "hidden"
    );

    successMessage.focus();

    form.reset();

    city.innerHTML =
      '<option value="">Seleccione primero un país</option>';

    city.disabled = true;

    favoriteLocation.innerHTML =
      '<option value="">Selecciona primero país y ciudad</option>';

    favoriteLocation.disabled = true;

    clearError(
      fullName,
      "fullNameError"
    );

    clearError(
      email,
      "emailError"
    );

    clearError(
      phone,
      "phoneError"
    );

    clearError(
      country,
      "countryError"
    );

    clearError(
      city,
      "cityError"
    );

    clearError(
      referral,
      "referralError"
    );

    clearError(
      birthDate,
      "birthDateError"
    );

    clearError(
      terms,
      "termsError"
    );
  }
);

/* ----------------------------------
   BOTÓN LIMPIAR
---------------------------------- */

form.addEventListener(
  "reset",
  () => {
    setTimeout(() => {
      successMessage.classList.add(
        "hidden"
      );

      city.innerHTML =
        '<option value="">Seleccione primero un país</option>';

      city.disabled = true;

      favoriteLocation.innerHTML =
        '<option value="">Selecciona primero país y ciudad</option>';

      favoriteLocation.disabled = true;

      clearError(
        fullName,
        "fullNameError"
      );

      clearError(
        email,
        "emailError"
      );

      clearError(
        phone,
        "phoneError"
      );

      clearError(
        country,
        "countryError"
      );

      clearError(
        city,
        "cityError"
      );

      clearError(
        referral,
        "referralError"
      );

      clearError(
        birthDate,
        "birthDateError"
      );

      clearError(
        terms,
        "termsError"
      );
    }, 0);
  }
);

/* ----------------------------------
   INICIALIZACIÓN
---------------------------------- */

setMaximumBirthDate();