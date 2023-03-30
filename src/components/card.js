import { openPopup, closePopup } from './modal';

import {
  imagePopup,
  cardTemplate,
  elements,
  popupImage,
  popupPlace,
} from './const';

import { deleteCard, likeCard, removeLike } from './api';
/* Cards */
export const createCard = (link, name, likes, ownerId, cardId) => {
    const card = cardTemplate.querySelector('.element').cloneNode(true);
    const cardTrashButton = card.querySelector('.element__trash');
    const cardImage = card.querySelector('.element__image');
    const cardTitle = card.querySelector('.element__title');
    const cardLikeButtoon = card.querySelector('.element__like-button');
    const cardLikeNumber = card.querySelector('.element__like-number');

  if (ownerId !== '91089aeb-9e00-4a3f-9cf9-1d0f7117fd38') {
    cardTrashButton.remove();
  }
  
    cardTrashButton.addEventListener('click', () => {
      card.remove();
      deleteCard(cardId);
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

    cardLikeNumber.textContent = likes.length;

  likes.forEach((item) => {
    if (item._id === '91089aeb-9e00-4a3f-9cf9-1d0f7117fd38') {
      cardLikeButtoon.classList.add('element__like-button_active');
    }
  });

  /* Like-button */
  cardLikeButtoon.addEventListener('click', () => {
    if (!cardLikeButtoon.classList.contains('element__like-button_active')) {
      cardLikeButtoon.classList.add('element__like-button_active');
      likeCard(cardId);
      cardLikeNumber.textContent++;
    } else {
      cardLikeButtoon.classList.remove('element__like-button_active');
      removeLike(cardId);
      cardLikeNumber.textContent--;
    }
  });
  return card;
  };
  
  export const renderCards = (item) => {
    item.forEach((card) => {
      elements.prepend(
        createCard(
          card.link,
          card.name,
          card.likes,
          card.owner._id,
          card._id)
      );
    });
  };