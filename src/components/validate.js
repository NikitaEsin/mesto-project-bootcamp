

/* Input-Error */
export const showInputError = (formElement, inputElement, errorMessage, { elementSelectors } ) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(elementSelectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(elementSelectors.errorClass);
};

export const hideInputError = (formElement, inputElement, { elementSelectors }) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(elementSelectors.inputErrorClass);
  errorElement.classList.remove(elementSelectors.errorClass);
  errorElement.textContent = '';
};

export const checkInputValidity = (
  formElement,
  inputElement,
  { elementSelectors }
) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, {
      elementSelectors,
    });
  } else {
    hideInputError(formElement, inputElement, { elementSelectors });
  }
};

export const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

export const toggleButtonState = (
  inputList,
  buttonElement,
  inactiveButtonClass
) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

export const setEventListeners = (formElement, { elementSelectors }) => {
  const inputList = Array.from(
    formElement.querySelectorAll(elementSelectors.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    elementSelectors.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, elementSelectors.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, { elementSelectors });
      toggleButtonState(
        inputList,
        buttonElement,
        elementSelectors.inactiveButtonClass
      );
    });
  });
};

export const enableValidation = ({ elementSelectors }) => {
  const formList = Array.from(
    document.querySelectorAll(elementSelectors.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, { elementSelectors });
  });
};