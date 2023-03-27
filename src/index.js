import './pages/index.css';
import {
  popupEdit,
  buttonCloseEdit,
  profileEditButton,
  popupAdd,
  buttonCloseAdd,
  profileAddButton,
  profileName,
  profileHobby,
  popupName,
  popupDescription,
  popupSave,
  cardTemplate,
  popupImage,
  popupPlace,
  imagePopup,
  elements,
  popupImageButton,
  popupInputHeading,
  popupInputPicture,
  popupCreate,
  popupEditForm,
  popupAddForm,
  popups,
} from './components/const';
import {
  popupForm,
  formInput,
  showInputError,
  hideInputError,
  checkInputValidity,
  hasInvalidInput,
  toggleButtonState,
  setEventListeners,
  enableValidation,
} from './components/validate';
import {
  openPopup,
  closePopup,
  handleEscape,
} from './components/modal';
import {
  createCard,
  renderCards,
} from './components/card';

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

/* Background */
popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      closePopup(event.currentTarget);
    }
  });
});

/* Popup-edit form */
export const handlePopupFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileHobby.textContent = popupDescription.value
  closePopup(popupEdit);
};
popupEditForm.addEventListener('submit', handlePopupFormSubmit);

/* Add link image */
export const handleItemFormSubmit = (evt) => {
  evt.preventDefault();

  const newElement = {
    name: popupInputHeading.value,
    link: popupInputPicture.value,
  };

  closePopup(popupAdd);
  renderCards([newElement]);
  popupInputHeading.value = '';
  popupInputPicture.value = '';
  evt.submitter.classList.add('popup__button_deactiv')
  evt.submitter.disabled = true;
};
popupAddForm.addEventListener('submit', handleItemFormSubmit);

const elementSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_deactiv',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'popup__input-error_activ',
}; 

enableValidation(
  elementSelectors
);