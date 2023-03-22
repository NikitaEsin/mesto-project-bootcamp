/* DOM */ 
const popupEdit = document.querySelector('#popup-edit');
const buttonCloseEdit = document.querySelector('#popup-edit-button');
const profileEditButton = document.querySelector('#profile-edit-button');
const popupAdd = document.querySelector('#popup-add');
const buttonCloseAdd = document.querySelector('#popup-add-button');
const profileAddButton = document.querySelector('#profile-add-button');
const profileName = document.querySelector('.profile__name');
const profileHobby = document.querySelector('.profile__hobby');
const popupName = document.querySelector('#popup-name');
const popupDescription = document.querySelector('#popup-description');
const popupSave = document.querySelector('#popup-save');
const cardTemplate = document.querySelector('#element-template').content;
const popupImage = document.querySelector('.popup__image');
const popupPlace = document.querySelector('.popup__place');
const imagePopup = document.querySelector('#image-popup');
const elements = document.querySelector('.elements');
const popupImageButton = document.querySelector('#popup-image-button');
const popupInputHeading = document.querySelector('#popup-input-heading');
const popupInputPicture = document.querySelector('#popup-input-picture');
const popupCreate = document.querySelector('#popup-create');
const popupEditForm = document.querySelector('#popup-edit-form');
const popupAddForm = document.querySelector('#popup-add-form');
const popups = document.querySelectorAll('.popup');

/* Buttons */
const openPopup = (item) => {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscape);
};
const closePopup = (item) => {
    item.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscape);
};

/* Edit-button */
buttonCloseEdit.addEventListener('click', () => {
    closePopup(popupEdit);
});
profileEditButton.addEventListener('click', () => {
    openPopup(popupEdit);
});
/* Add-button */
buttonCloseAdd.addEventListener('click', () => {
    closePopup(popupAdd);
});
profileAddButton.addEventListener('click', () => {
    openPopup(popupAdd);
});
/* Image-button */
popupImageButton.addEventListener('click', () => {
    closePopup(imagePopup)
});

/* Popup-edit event */
profileEditButton.addEventListener('click', () => {
    openPopup(popupEdit);
    popupName.value = profileName.textContent;
    popupDescription.value = profileHobby.textContent;
});
buttonCloseEdit.addEventListener('click', () => {
    closePopup(popupEdit);
});

/* Popup-edit form */
const handlePopupFormSubmit = (evt) => {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileHobby.textContent = popupDescription.value
    closePopup(popupEdit);
  };

  popupEditForm.addEventListener('submit', handlePopupFormSubmit);

/* Elements */
const createCard = (link, name) => {
    const card = cardTemplate.querySelector('.element').cloneNode(true);
    const cardTrashButton = card.querySelector('.element__trash');
    const cardImage = card.querySelector('.element__image');
    const cardTitle = card.querySelector('.element__title');
    const cardLikeButtoon = card.querySelector('.element__like-button');
  
    cardTrashButton.addEventListener('click', () => {
      card.remove();
    });
  
    cardImage.src = link;
  
    cardImage.addEventListener('click', () => {
      popupImage.src = link;
      popupImage.alt = name;
      popupPlace.textContent = name;
      openPopup(imagePopup);
    });
  
    cardTitle.textContent = name;

  /* Like-button */
    cardLikeButtoon.addEventListener('click', () => {
      cardLikeButtoon.classList.toggle('element__like-button_active');
    });
    return card;
  };
  
  const renderCards = (item) => {
    item.forEach((card) => {
      elements.prepend(createCard(card.link, card.name));
    });
  };
  renderCards(initialCards);

/* Add link image */
  const handleItemFormSubmit = (evt) => {
    evt.preventDefault();
  
    const newElement = {
      name: popupInputHeading.value,
      link: popupInputPicture.value,
    };
  
    closePopup(popupAdd);
    renderCards([newElement]);
    popupInputHeading.value = '';
    popupInputPicture.value = '';
  

  };

  popupAddForm.addEventListener('submit', handleItemFormSubmit);

/* Input-Error */
const popupForm = document.querySelector('.popup__form');
const formInput = popupForm.querySelector('.popup__input');
const formError = popupForm.querySelector(`.${formInput.id}-error`);

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_deactiv');
  } else {
    buttonElement.classList.remove('popup__button_deactiv');
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement)
  });
};

enableValidation();

/* Background */
popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      closePopup(event.currentTarget);
    }
  });
});

/* ESC */
const handleEscape = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};


