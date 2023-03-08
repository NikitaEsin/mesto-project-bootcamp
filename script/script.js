/* DOM */ 
const popupEdit = document.querySelector('#popup-edit');
const buttonCloseEdit = document.querySelector('#popup-edit-button');
const profileEditButton = document.querySelector('#profile-edit-button');
const popupAdd = document.querySelector('#popup-add');
const buttonCloseAdd = document.querySelector('#popup-add-button');
const profileAddButton = document.querySelector('#profile-add-button')
const elementLikeButton = document.querySelector('#element-like-button')

/* Buttons */
const openPopup = (item) => {
    item.classList.add('popup_opened')
}
const closePopup = (item) => {
    item.classList.remove('popup_opened')
}
const activLike = (item) => {
    item.classList.toggle('element__like-button_active')
}

/* Edit-button */
buttonCloseEdit.addEventListener('click', () => {
    closePopup(popupEdit);
})
profileEditButton.addEventListener('click', () => {
    openPopup(popupEdit);
})
/* Add-button */
buttonCloseAdd.addEventListener('click', () => {
    closePopup(popupAdd);
})
profileAddButton.addEventListener('click', () => {
    openPopup(popupAdd);
})

elementLikeButton.addEventListener('click', () => {
    activLike(elementLikeButton);
})