/* Open and Close popup */
export const openPopup = (item) => {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscape);
};
export const closePopup = (item) => {
    item.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscape);
};

/* ESC */
export const handleEscape = (evt) => {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
    }
  };