import "../pages/index.css";
import { createCard } from "../components/card.js";
import { openModal, closeModal, addListenerPopup } from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js"
import { getAllCards, getUserInfo, editUserInfo, createNewCard, removeCard, changeAvatar, likeCardDev, likeCardDevDel } from "./api.js";

//DOM узлы
const placesList = document.querySelector(".places__list");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupDeleteCard = document.querySelector(".popup__delete-card")

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const popupImage = document.querySelector(".popup__image");

const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const popupCaption = document.querySelector(".popup__caption");

const deleteCardForm = document.forms["delete-card"];
const avatarUpdateForm = document.forms["avatar-update"];
const profileForm = document.forms["edit-profile"];
const cardForm = document.forms["new-place"];

const linkAvatarInput = document.querySelector('.popup__input_type_link-avatar');
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const nameMesto = document.querySelector(".popup__input_type_card-name");
const linkInput = document.querySelector(".popup__input_type_url");

const profileImage = document.querySelector('.profile__image');
const popupTypeChangeAvatar = document.querySelector('.popup__avatar-update');

const obj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
let cardForDelete = {}

const onDeleteCard = (cardId, cardElement) => {
  cardForDelete = {
    id: cardId,
    cardElement
  }
  openModal(popupDeleteCard);
};

const handleDeleteCardSubmit = (evt) => {
  evt.preventDefault();
  if (!cardForDelete.cardElement) return;

  removeCard(cardForDelete.id)
  .then(() => {
    cardForDelete.cardElement.remove();
    closeModal(popupDeleteCard);
    cardForDelete = {};
  })
  .catch((err) => {alert(err)})
};
deleteCardForm.addEventListener("submit", handleDeleteCardSubmit);

const likeCard = (cardData, counter, item) => {
  const likeMethod = item.classList.contains("card__like-button_is-active") ? likeCardDevDel : likeCardDev;
  likeMethod(cardData._id) 
  .then((d) => {
    item.classList.toggle("card__like-button_is-active");
    counter.textContent = d.likes.length; 
  }) 
  .catch((err) => {alert(err)})
}

//функция обработки карточки с фоткой при клике
const handleImageClick = (cardData) => {
  openModal(popupTypeImage);
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
}

let userId
Promise.all([
  getUserInfo(),
  getAllCards()
])
.then(([userInfo, allCards]) => {
  profileTitle.textContent = userInfo.name;
  profileJob.textContent = userInfo.about;
  profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
  userId = userInfo._id;

  allCards.forEach((cardData) => {
    const card = createCard(cardData, onDeleteCard, likeCard, handleImageClick, userId);
    placesList.append(card);
  })
})
.catch((err) => {alert(err)})

//открытие окна редактирования аватарки профиля
profileImage.addEventListener('click' , () => {
  openModal(popupTypeChangeAvatar)
  clearValidation (avatarUpdateForm, obj)
})
//открытие окна для редактирования профиля
buttonEditProfile.addEventListener("click", () => {
  openModal(popupTypeEdit);
  clearValidation (profileForm, obj)
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
});
//открытие окна для добавления карточки
buttonAddCard.addEventListener("click", () => {
  openModal(popupTypeNewCard)
  clearValidation(cardForm, obj)
});

//улучшение UX
const renderLoading = (isLoading, buttonIsLoading) => {
  buttonIsLoading.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
}

//сабмит обновления аватарки
const handleUpdateAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  const buttonIsLoading = evt.target.querySelector('.popup__button')
  renderLoading(true, buttonIsLoading)

  changeAvatar (linkAvatarInput.value)
  .then((ava) => {
    profileImage.style.backgroundImage = `url(${ava.avatar})`;
    closeModal(popupTypeChangeAvatar)
  })
  .catch((err) => {alert(err)})
  .finally(() => {
    renderLoading(false, buttonIsLoading)
  })
}
avatarUpdateForm.addEventListener("submit", handleUpdateAvatarFormSubmit);

//редактирование имени и информации о себе
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  const buttonIsLoading = evt.target.querySelector('.popup__button')
  renderLoading(true, buttonIsLoading)

  editUserInfo(nameInput.value, jobInput.value)
  .then((newUserInfo) => {
    profileTitle.textContent = newUserInfo.name;
    profileJob.textContent = newUserInfo.about;
  })
  .catch((err) => {alert(err)})
  .finally(() => {
    renderLoading(false, buttonIsLoading)
  })
  closeModal(popupTypeEdit);
}
profileForm.addEventListener("submit", handleProfileFormSubmit);

//Добавление карточки
const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  const buttonIsLoading = evt.target.querySelector('.popup__button')
  renderLoading(true, buttonIsLoading)
  const newObjectCard = {
    name: nameMesto.value,
    link: linkInput.value,
  };
  
  createNewCard(newObjectCard)
  .then((newObjectCard) => {
    placesList.prepend(createCard(newObjectCard, onDeleteCard, likeCard, handleImageClick, userId));
    cardForm.reset();
    closeModal(popupTypeNewCard);
  })
  .catch((err) => {alert(err)})
  .finally(() => {
    renderLoading(false, buttonIsLoading)
  })
}
cardForm.addEventListener("submit", handleAddCardFormSubmit);

[popupTypeEdit, popupTypeNewCard, popupTypeImage, popupDeleteCard, popupTypeChangeAvatar].forEach(addListenerPopup);
enableValidation(obj);