  // Функция, которая добавляет класс с ошибкой
  const showInputError = (formElement, inputElement, errorMessage, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.errorClass);
  };
  
  // Функция, которая удаляет класс с ошибкой
  const hideInputError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(obj.errorClass);
  };
  
  // Функция, которая проверяет валидность поля
  const isValid = (formElement, inputElement, obj) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
  
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      showInputError(formElement, inputElement, inputElement.validationMessage, obj);
    } else {
      // Если проходит, скроем
      hideInputError(formElement, inputElement, obj);
    }
  };
  
  
  // Функция для проверки всех полей
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
  
  //функция для откл и вкл кнопки
  const toggleButtonState = (inputList, buttonElement, obj) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(obj.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(obj.inactiveButtonClass);
    }
  };
  
  
  const setEventListeners = (formElement, obj) => {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, obj);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, obj);
        toggleButtonState(inputList, buttonElement, obj);
      });
    });
  }; 
  
  export const enableValidation = (obj) => {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement, obj);
    });
  };

  export const clearValidation = (form, obj) => {
    const inputListLKJ = Array.from(form.querySelectorAll(obj.inputSelector));
    inputListLKJ.forEach((inputElement) => {
      hideInputError(form, inputElement, obj)
      inputElement.value = ""
    })
  }