//выводим ошибку
function showInputError(formElement, inputElement, config) {
  //нашли span
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = inputElement.validationMessage; //у инпута если есть ошибка, там хранится текст ошибки (св-во validationMessage)
  inputElement.classList.add(config.inputErrorClass);
}


function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(config.inputErrorClass);
}


function checkInputValidity(formElement, inputElement, config) {
  //пишем проверку
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config); //прячем ошибку, если true
  } else {
    showInputError(formElement, inputElement, config); // иначе показываем
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}


function changeButtonState(buttonElement, buttonState) {
  buttonElement.disabled = buttonState;
  }

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass)
    changeButtonState(buttonElement, true);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass)
    changeButtonState(buttonElement, false);
  }
}


//находим списокинпутов, навешиваем обработчики на событие инпут
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector)); // у формы ищем инпуты
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config); //disabled кнопки по умолчанию(при 1й загрузке сайта)

  //деактивируем кнопку методом reset
  formElement.addEventListener('reset', () => {
    //setTimeout нужен, чтобы дождаться очищ. формы(вызов уйдет в конце стэка)
    setTimeout(() => {
      toggleButtonState(inputList, buttonElement, config);
    }, 0);
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => { //проверить валидность, вывести ошибку, если поле не валидно/скрыть
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    })
  })
}

//получаем список форм
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector)); // получили массив форм

  formList.forEach((formElement) => {
    setEventListeners(formElement, config) //передаем форму и конфиг
  })
}
