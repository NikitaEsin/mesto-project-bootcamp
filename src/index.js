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
export const handlePopupFormSubmit = () => {
  popupButton.textContent = 'Сохранить...';
  changeProfile(popupName.value, popupDescription.value)
  .then((res) => {
    closePopup(popupEdit);
    profileName.textContent = res.name;
    profileHobby.textContent = res.about;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupButton.textContent = 'Сохранить';
  });
};
popupEditForm.addEventListener('submit', handlePopupFormSubmit);

/* Add link image */
export const handleItemFormSubmit = (evt) => {
  popupButton.textContent = 'Сохранить...';
  const newElement = {
    name: popupInputHeading.value,
    link: popupInputPicture.value,
  };

  addNewCard(newElement.name, newElement.link)
    .then((res) => {
      renderCards([res]);
    })
    .then(() => {
      closePopup(popupAdd);
      popupAddForm.reset();
      popupButton.classList.add('popup__button_deactiv');
      popupButton.disabled = true;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupButton.textContent = 'Сохранить';
    });

  renderCards([newElement]);
  popupInputHeading.value = '';
  popupInputPicture.value = '';
};

const handleAvatarFormSubmit = () => {
  avatarButton.textContent = 'Сохранить...';
  changeAvatar(avatarInput.value)
  .then(() => {
    profilePhoto.src = avatarInput.value;
    closePopup(avatarPopup);
  })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarButton.textContent = 'Сохранить';
    });
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

avatarHover.addEventListener('click', () => {
  openPopup(avatarPopup);
});

popupAvatarForm.addEventListener('submit', handleAvatarFormSubmit);