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

/* Buttons */
const openPopup = (item) => {
    item.classList.add('popup_opened');
};
const closePopup = (item) => {
    item.classList.remove('popup_opened');
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
  popupSave.addEventListener('click', handlePopupFormSubmit);

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
      popupImage.alt = 'Пейзаж';
      popupPlace.textContent = name;
      openPopup(imagePopup);
    });
  
    cardTitle.textContent = name;
  
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