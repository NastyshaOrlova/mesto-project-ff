function toggleButtonState(formElement, config) {
  const submitButton = formElement.querySelector(config.submitButtonSelector);
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  const isFormValid = inputList.every(
    (inputElement) => inputElement.validity.valid
  );

  if (isFormValid) {
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.disabled = false;
  } else {
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.disabled = true;
  }
}

function showInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(
    `#${inputElement.name}-input-error`
  );
  inputElement.classList.add(config.inputErrorClass);
  if (inputElement.validity.patternMismatch) {
    errorElement.textContent = inputElement.dataset.errorMessage;
  } else {
    errorElement.textContent = inputElement.validationMessage;
  }

  errorElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(
    `#${inputElement.name}-input-error`
  );
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        if (!inputElement.validity.valid) {
          showInputError(formElement, inputElement, config);
        } else {
          hideInputError(formElement, inputElement, config);
        }
        toggleButtonState(formElement, config);
      });
    });

    toggleButtonState(formElement, config);
  });
}

function clearValidation(formElement, config) {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });
}

export { enableValidation, clearValidation, toggleButtonState };
