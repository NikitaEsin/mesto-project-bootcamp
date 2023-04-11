import { renderCards } from './card';

import { closePopup } from './modal';

import {
  changeProfile,
  addNewCard,
  getInitialCards,
  changeAvatar,
} from './api';

import {
  popupButton,
  popupName,
  popupDescription,
  popupEdit,
  profileName,
  profileHobby,
  popupSave,
  popupInputHeading,
  popupInputPicture,
  popupAdd,
  popupAddForm,
  avatarInput,
  avatarButton,
  profilePhoto,
  avatarPopup,
} from './const';

/* Popup-edit form */ // Person modal form
export const handlePopupFormSubmit = () => {
  popupSave.textContent = 'Сохранить...';
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
  
/* Add link image */ // Item modal form
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
};
  
// Avatar modal form
export const handleAvatarFormSubmit = () => {
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