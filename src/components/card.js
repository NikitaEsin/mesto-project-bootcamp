import { openPopup, closePopup } from './modal';

import {
  imagePopup,
  cardTemplate,
  elements,
  popupImage,
  popupPlace,
} from './const';

import { deleteCard, likeCard, removeLike } from './api';

import { userId } from '..';
/* Cards */
export const createCard = (link, name, likes, ownerId, cardId) => {
    const card = cardTemplate.querySelector('.element').cloneNode(true);
    const cardTrashButton = card.querySelector('.element__trash');
    const cardImage = card.querySelector('.element__image');
    const cardTitle = card.querySelector('.element__title');
    const cardLikeButtoon = card.querySelector('.element__like-button');
    const cardLikeNumber = card.querySelector('.element__like-number');

  if (ownerId !== userId) {
    cardTrashButton.remove();
  }
  
    cardTrashButton.addEventListener('click', () => {
      deleteCard(cardId)
      .then(() => {
        card.remove();
      })
      .catch((err) => {
        console.log(err);
      });
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
    if (item._id === userId) {
      cardLikeButtoon.classList.add('element__like-button_active');
    }
  });

  /* Like-button */
  cardLikeButtoon.addEventListener('click', () => {
    if (!cardLikeButtoon.classList.contains('element__like-button_active')) {
      likeCard(cardId)
        .then((res) => {
          cardLikeButtoon.classList.add('element__like-button_active');
          cardLikeNumber.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      removeLike(cardId)
        .then((res) => {
          cardLikeButtoon.classList.remove('element__like-button_active');
          cardLikeNumber.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
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