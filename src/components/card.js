import { openPopup, closePopup } from './modal';
import {
    imagePopup,
    cardTemplate,
    elements,
    popupImage,
    popupPlace,
  } from './const';
import {initialCards,} from '../data/data'
/* Cards */
export const createCard = (link, name) => {
    const card = cardTemplate.querySelector('.element').cloneNode(true);
    const cardTrashButton = card.querySelector('.element__trash');
    const cardImage = card.querySelector('.element__image');
    const cardTitle = card.querySelector('.element__title');
    const cardLikeButtoon = card.querySelector('.element__like-button');
  
    cardTrashButton.addEventListener('click', () => {
      card.remove();
    });
  
    cardImage.src = link;
    cardImage.alt = name;
  
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
  
  export const renderCards = (item) => {
    item.forEach((card) => {
      elements.prepend(createCard(card.link, card.name));
    });
  };
  renderCards(initialCards);