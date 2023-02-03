//выводим ошибку
function showInputError(formElement, inputElement, config) {
  //нашли span
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = inputElement.validationMessage; //у инпута если есть ошибка, там хранится текст ошибки (св-во validationMessage)
  inputElement.classList.add(config.inputErrorClass);
}


function hideInputError(formElement, inputElement, config) {
  console.log(`.${inputElement.id}-error`)
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (!errorElement) {
    return;
  }
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(config.inputErrorClass);
}

function buttonEnable() {

}
//
function checkInputValidity(formElement, inputElement, config) {
  console.log(inputElement.validity)
  //пишем проверку
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config); //прячем ошибку, если true
    //инабл
  } else {
    showInputError(formElement, inputElement, config); // иначе показываем
    // дисэбл батон
  }
  console.log(inputElement.validity)
}

function hasInvalidInput(inputList){
  return inputList.some((inputElement) => !inputElement.validity.valid);
}
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass)
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass)
    buttonElement.disabled = false;
  }
}

//находим списокинпутов, навешиваем обработчики на событие инпут
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));// у формы ищем инпуты
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config); //disabled кнопки по умолчанию
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {     //проверить валидность, вывести ошибку, если поле не валидно/скрыть
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    })
  })
}

//получаем список форм
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));  // получили массив форм

  formList.forEach((formElement) => {
    setEventListeners(formElement, config) //передаем форму и конфиг
  })
}
