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
} from './components/utils';
import {
  handlePopupFormSubmit,
  handleItemFormSubmit,
} from './components/form';
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

const elementSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_deactiv',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_activ',
}; 

enableValidation({
  elementSelectors,
});