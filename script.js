// Language Detection and Translation
const lang = navigator.language || navigator.userLanguage;
const translations = {
  en: {
    registrationTitle: "Registration",
    emailLabel: "Email:",
    passwordLabel: "Password:",
    passwordConfirmLabel: "Confirm Password:",
    firstNameLabel: "First Name:",
    lastNameLabel: "Last Name (optional):",
    usernameLabel: "Username:",
    signupButton: "Sign Up",
    emailError: "Invalid email address",
    passwordError: "Password must be at least 8 characters",
    passwordConfirmError: "Passwords do not match",
    usernameError: "Invalid username. Only letters, numbers, hyphens, and underscores allowed (3-16 characters).",
    registrationSuccessful: "Registration successful!" 
  },
  ru: {
    registrationTitle: "Регистрация",
    emailLabel: "Электронная почта:",
    passwordLabel: "Пароль:",
    passwordConfirmLabel: "Подтвердите пароль:",
    firstNameLabel: "Имя:",
    lastNameLabel: "Фамилия (необязательно):",
    usernameLabel: "Имя пользователя:",
    signupButton: "Зарегистрироваться",
    emailError: "Неверный адрес электронной почты",
    passwordError: "Пароль должен содержать не менее 8 символов",
    passwordConfirmError: "Пароли не совпадают",
    usernameError: "Недопустимое имя пользователя. Разрешены только буквы, цифры, дефисы и подчеркивания (3-16 символов).",
    registrationSuccessful: "Регистрация прошла успешно!" 
  },
  uk: {
    registrationTitle: "Реєстрація",
    emailLabel: "Електронна пошта:",
    passwordLabel: "Пароль:",
    passwordConfirmLabel: "Підтвердіть пароль:",
    firstNameLabel: "Ім'я:",
    lastNameLabel: "Прізвище (необов'язково):",
    usernameLabel: "Ім'я користувача:",
    signupButton: "Зареєструватися",
    emailError: "Невірна адреса електронної пошти",
    passwordError: "Пароль повинен містити не менше 8 символів",
    passwordConfirmError: "Паролі не співпадають",
    usernameError: "Неприпустиме ім'я користувача. Дозволені лише літери, цифри, дефіси та підкреслення (3-16 символів).",
    registrationSuccessful: "Реєстрація пройшла успішно!" 
  }
};

function translatePage() {
  const currentLang = lang.startsWith('ru') ? 'ru' : lang.startsWith('uk') ? 'uk' : 'en';
  const elementsToTranslate = document.querySelectorAll('[id]');

  elementsToTranslate.forEach(element => {
    const translationKey = element.id;
    if (translations[currentLang][translationKey]) {
      element.textContent = translations[currentLang][translationKey];
    }
  });
}

translatePage(); 

// Form Elements
const emailField = document.getElementById('emailField');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');

const passwordField = document.getElementById('passwordField');
const passwordInput = document.getElementById('password');
const passwordError = document.getElementById('passwordError');

const passwordConfirmField = document.getElementById('passwordConfirmField');
const passwordConfirmInput = document.getElementById('passwordConfirm');
const passwordConfirmError = document.getElementById('passwordConfirmError');

const nameField = document.getElementById('nameField');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');

const usernameField = document.getElementById('usernameField');
const usernameInput = document.getElementById('username');
const usernameError = document.getElementById('usernameError');

// Validation Functions
function validateEmail() {
  const email = emailInput.value;
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (re.test(email)) {
    emailError.textContent = '';
    emailError.style.display = 'none';
    emailField.classList.add('valid');
    showField(passwordField);
    return true; 
  } else {
    emailError.textContent = translations[lang.startsWith('ru') ? 'ru' : lang.startsWith('uk') ? 'uk' : 'en'].emailError;
    emailError.style.display = 'block';
    emailField.classList.remove('valid');
    hideField(passwordField);
    hideField(passwordConfirmField);
    hideField(nameField);
    hideField(usernameField);
    return false; 
  }
}

function validatePassword() {
  const password = passwordInput.value;
  if (password.length >= 8) { 
    passwordError.textContent = '';
    passwordError.style.display = 'none';
    passwordField.classList.add('valid');
    showField(passwordConfirmField);
    return true; 
  } else {
    passwordError.textContent = translations[lang.startsWith('ru') ? 'ru' : lang.startsWith('uk') ? 'uk' : 'en'].passwordError;
    passwordError.style.display = 'block';
    passwordField.classList.remove('valid');
    hideField(passwordConfirmField);
    hideField(nameField);
    hideField(usernameField);
    return false; 
  }
}

function validatePasswordConfirmation() {
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;

  if (password === passwordConfirm) {
    passwordConfirmError.textContent = '';
    passwordConfirmError.style.display = 'none';
    passwordConfirmField.classList.add('valid');
    showField(nameField);
    return true; 
  } else {
    passwordConfirmError.textContent = translations[lang.startsWith('ru') ? 'ru' : lang.startsWith('uk') ? 'uk' : 'en'].passwordConfirmError;
    passwordConfirmError.style.display = 'block';
    passwordConfirmField.classList.remove('valid');
    hideField(nameField);
    hideField(usernameField);
    return false; 
  }
}

// Username Generation
function generateUsername(firstName, lastName) {
  let username = firstName.toLowerCase();
  if (lastName) {
    username += lastName.charAt(0).toLowerCase();
  }

  const transliterationMap = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts',
    'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
    'я': 'ya', 'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'YO',
    'Ж': 'ZH', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N',
    'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'KH',
    'Ц': 'TS', 'Ч': 'CH', 'Ш': 'SH', 'Щ': 'SHCH', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E',
    'Ю': 'YU', 'Я': 'YA'
  };

  username = username.split('').map(char => transliterationMap[char] || char).join('');

  username += Math.floor(Math.random() * 1000);
  return username;
}

function showUsernameField() {
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  
  // Only generate username if the field is empty
  if (usernameInput.value === '') {
    const username = generateUsername(firstName, lastName);
    usernameInput.value = username; 
  }

  showField(usernameField);
  validateUsername(); 
}

// Validate Username
function validateUsername() {
  const username = usernameInput.value;
  // Check for Cyrillic characters
  const cyrillicRegex = /[\u0400-\u04FF]/; 

  if (cyrillicRegex.test(username)) {
    usernameError.textContent = "Please use only English letters for your username.";
    usernameError.style.display = 'block';
    usernameField.classList.remove('valid');
    return false;
  } else {
    // If no Cyrillic, proceed with regular validation
    const isValid = /^[a-z0-9_-]{3,16}$/.test(username); 
    if (isValid) {
      usernameError.textContent = '';
      usernameError.style.display = 'none';
      usernameField.classList.add('valid');
      return true;
    } else {
      usernameError.textContent = translations[lang.startsWith('ru') ? 'ru' : lang.startsWith('uk') ? 'uk' : 'en'].usernameError;
      usernameError.style.display = 'block';
      usernameField.classList.remove('valid');
      return false; 
    }
  }
}

// Event Listeners
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);
passwordConfirmInput.addEventListener('input', validatePasswordConfirmation);
firstNameInput.addEventListener('input', function() {
  if (this.value.trim() !== '') {
    showUsernameField();
  } else {
    hideField(usernameField);
  }
});

lastNameInput.addEventListener('input', showUsernameField);
usernameInput.addEventListener('input', validateUsername); 


document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault();

  if (validateEmail() && validatePassword() && validatePasswordConfirmation() && validateUsername()) {
    alert(translations[lang.startsWith('ru') ? 'ru' : lang.startsWith('uk') ? 'uk' : 'en'].registrationSuccessful);
  } 
});

// Show/Hide Fields with Animation
function showField(field) {
  field.style.display = 'block'; 
  setTimeout(() => field.classList.add('active'), 10);
}

function hideField(field) {
  field.classList.remove('active');
  setTimeout(() => field.style.display = 'none', 10); 
}

// Initial State: Show email field
showField(emailField);