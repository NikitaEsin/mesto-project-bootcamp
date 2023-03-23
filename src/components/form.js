import { renderCards } from './cards';
import { closePopup } from './utils';
import {
    profileName,
    profileHobby,
    popupName,
    popupDescription,
    popupInputHeading,
    popupInputPicture,
    popupEditForm,
    popupEdit,
    popupAddForm,
    popupAdd,
  } from './const';
/* Popup-edit form */
const handlePopupFormSubmit = (evt) => {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileHobby.textContent = popupDescription.value
    closePopup(popupEdit);
  };

  popupEditForm.addEventListener('submit', handlePopupFormSubmit);


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