import './pages/index.css';

import { openPopup, closePopup } from './components/modal';

import {
  handlePopupFormSubmit,
  handleItemFormSubmit,
  handleAvatarFormSubmit,
} from './components/handel';

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
  popupAvatarForm,
  popups,
  profilePhoto,
  avatarHover,
  avatarPopup,
  avatarCloseButton,
  avatarInput,
  avatarButton,
  popupButton,
} from './components/const';

import {
  createCard,
  renderCards,
} from './components/card';

import { 
  config,
  getResponse,
  getUserProfile,
  changeProfile,
  addNewCard,
  getInitialCards,
  changeAvatar,
} from './components/api';

export let userId;

Promise.all([getUserProfile(), getInitialCards()])
.then(([userData, cards]) => {
  profileName.textContent = userData.name;
  profileHobby.textContent = userData.about;
  profilePhoto.src = userData.avatar;
  userId = userData._id;
  renderCards(cards);
})

.catch((err) => {
  console.log(err);
});

/* Popup-edit event */
profileEditButton.addEventListener('click', () => {
    openPopup(popupEdit);
    popupName.value = profileName.textContent;
    popupDescription.value = profileHobby.textContent;
});


popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

/* Background */
popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      closePopup(event.currentTarget);
    }
  });
});

popupEditForm.addEventListener('submit', handlePopupFormSubmit);

profileAddButton.addEventListener('click', () => {
  openPopup(popupAdd);
});

popupAddForm.addEventListener('submit', handleItemFormSubmit);

avatarHover.addEventListener('click', () => {
  openPopup(avatarPopup);
});

popupAvatarForm.addEventListener('submit', handleAvatarFormSubmit);

const elementSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_deactiv',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'popup__input-error_activ',
}; 

enableValidation({
  elementSelectors}
);